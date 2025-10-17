import { Injectable, OnModuleInit } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import * as crypto from 'crypto';
import * as fs from 'fs';
import * as path from 'path';
import * as protobuf from 'protobufjs';

@Injectable()
export class UsersService implements OnModuleInit {
  private privateKey: string;
  private publicKey: string;
  private protoRoot: protobuf.Root;

  constructor(
    @InjectRepository(User)
    private userRepo: Repository<User>,
  ) {}

  async onModuleInit() {
    this.ensureKeys();
    const protoPath = path.join(__dirname, 'user.proto');
    this.protoRoot = await protobuf.load(protoPath);
  }
  private ensureKeys() {
    const keyDir = path.join(__dirname, '../../keys');
    const privPath = path.join(keyDir, 'private.pem');
    const pubPath = path.join(keyDir, 'public.pem');

    if (!fs.existsSync(keyDir)) fs.mkdirSync(keyDir);

    if (!fs.existsSync(privPath) || !fs.existsSync(pubPath)) {
      const { privateKey, publicKey } = crypto.generateKeyPairSync('rsa', {
        modulusLength: 2048,
        publicKeyEncoding: { type: 'pkcs1', format: 'pem' },
        privateKeyEncoding: { type: 'pkcs1', format: 'pem' },
      });
      fs.writeFileSync(privPath, privateKey);
      fs.writeFileSync(pubPath, publicKey);
    }

    this.privateKey = fs.readFileSync(privPath, 'utf-8');
    this.publicKey = fs.readFileSync(pubPath, 'utf-8');
  }
  async createUser(data: Partial<User>) {
    const hash = crypto.createHash('sha384').update(data.email).digest('hex');
    const signature = crypto.sign(
      'sha384',
      Buffer.from(hash, 'hex'),
      this.privateKey,
    );

    const user = this.userRepo.create({
      ...data,
      emailHash: hash,
      signature: signature.toString('base64'),
    });

    return await this.userRepo.save(user);
  }

  async getUsers() {
    return this.userRepo.find();
  }

  async getUser(id: string) {
    return this.userRepo.findOne({ where: { id } });
  }
  async updateUser(id: string, data: Partial<User>) {
    const user = await this.userRepo.findOne({ where: { id } });
    if (!user) return null;
    Object.assign(user, data);
    if (data.email) {
      const hash = crypto.createHash('sha384').update(data.email).digest('hex');
      const signature = crypto.sign(
        'sha384',
        Buffer.from(hash, 'hex'),
        this.privateKey,
      );
      user.emailHash = hash;
      user.signature = signature.toString('base64');
    }
    return this.userRepo.save(user);
  }

  async deleteUser(id: string) {
    return this.userRepo.delete(id);
  }
  async exportProtobuf(): Promise<Buffer> {
    const users = await this.getUsers();
    const UsersMsg = this.protoRoot.lookupType('Users');
    const payload = {
      users: users.map((u) => ({
        ...u,
        createdAt: u.createdAt.toISOString(),
        signature: Buffer.from(u.signature, 'base64'),
      })),
    };
    console.log(payload);
    const err = UsersMsg.verify(payload);
    if (err) throw new Error(err);
    const buffer = UsersMsg.encode(UsersMsg.create(payload)).finish();
    return Buffer.from(buffer);
  }

  getPublicKey() {
    return this.publicKey;
  }
}
