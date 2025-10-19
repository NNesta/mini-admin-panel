import crypto from "crypto";

import path from "path";
import protobuf from "protobufjs";
import { User } from "./types";
import fs from "fs";

export const decodeBufferResponse = async (data: Response) => {
  const arrayBuffer = await data.arrayBuffer();
  const buffer = new Uint8Array(arrayBuffer);
  const protoPath = path.join(process.cwd(), "src/lib/users.proto");
  const root = await protobuf.load(protoPath);
  const UsersMsg = root.lookupType("user.Users");
  const decoded = UsersMsg.decode(buffer);
  const { users } = await UsersMsg.toObject(decoded, {
    bytes: String,
  });
  return users as User[];
};

export function verifySHA384withRSA(
  hashedHex: string,
  signatureBase64: string
) {
  const publicKeyPem = fs.readFileSync("./keys/public.pem", "utf8");
  const hashBuffer = Buffer.from(hashedHex, "hex");
  const signatureBuffer = Buffer.from(signatureBase64, "base64");
  const isValid = crypto.verify(
    "sha384",
    hashBuffer,
    {
      key: publicKeyPem,
      padding: crypto.constants.RSA_PKCS1_PADDING,
    },
    signatureBuffer
  );

  return isValid;
}
