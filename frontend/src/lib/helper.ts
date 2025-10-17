import path from 'path';
import protobuf from 'protobufjs';
import { ChartData, User } from './types';
import { format } from 'date-fns';

export async function fetchAndDecodeUsers() {
  // Fetch the protobuf buffer
  const data = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/export`);
  // const data = await res.json();
  console.log({ data });
  if (!data.ok) {
    throw new Error('Failed to fetch users');
  }
  const arrayBuffer = await data.arrayBuffer();
  const buffer = new Uint8Array(arrayBuffer);

  // Load proto file
  const protoPath = path.join(process.cwd(), 'src/lib/users.proto');
  const root = await protobuf.load(protoPath);
  const UsersMsg = root.lookupType('user.Users');

  // Decode buffer
  const decoded = UsersMsg.decode(buffer);

  // Convert to plain JS object
  const object = UsersMsg.toObject(decoded, {
    bytes: String, // convert bytes (signature) to base64
  });

  console.log('Decoded users:', object);
  return object.users;
}

export const getUserStats = (users: User[]) => {
  const today = new Date();
  const result: ChartData[] = [];
  for (let i = 6; i >= 0; i--) {
    const d = new Date();
    d.setDate(today.getDate() - i);
    const formatted = format(d, 'dd-MM-yyyy');
    result.push({ date: formatted, totalUsers: 0 });
  }

  // Count users per date
  users.forEach((user) => {
    const formatted = format(user.createdAt, 'dd-MM-yyyy');
    const entry = result.find((r) => r.date === formatted);
    if (entry) entry.totalUsers++;
  });

  // Calculate totals
  const totalUsers = result.reduce((sum, r) => sum + r.totalUsers, 0);
  const todayStr = format(today, 'dd-MM-yyyy');
  const yesterdayStr = format(today.setDate(today.getDate() - 1), 'dd-MM-yyyy');

  const todayCount = result.find((r) => r.date === todayStr)?.totalUsers || 0;
  const yesterdayCount =
    result.find((r) => r.date === yesterdayStr)?.totalUsers || 0;

  // Determine trend
  let trend = 'steady';
  if (todayCount > yesterdayCount) trend = 'increasing';
  else if (todayCount < yesterdayCount) trend = 'decreasing';

  return {
    daily: result,
    totalUsers,
    today: todayCount,
    yesterday: yesterdayCount,
    trend,
  };
};
