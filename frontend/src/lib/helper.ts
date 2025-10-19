import { ChartData, User } from "./types";
import { format } from "date-fns";

export const getUserStats = (users: User[]) => {
  const today = new Date();
  const result: ChartData[] = [];
  for (let i = 6; i >= 0; i--) {
    const d = new Date();
    d.setDate(today.getDate() - i);
    const formatted = format(d, "dd-MM-yyyy");
    result.push({ date: formatted, totalUsers: 0 });
  }

  // Count users per date
  users?.forEach((user) => {
    const formatted = format(user.createdAt, "dd-MM-yyyy");
    const entry = result.find((r) => r.date === formatted);
    if (entry) entry.totalUsers++;
  });

  const totalUsers = result.reduce((sum, r) => sum + r.totalUsers, 0);
  const todayStr = format(today, "dd-MM-yyyy");
  const yesterdayStr = format(today.setDate(today.getDate() - 1), "dd-MM-yyyy");

  const todayCount = result.find((r) => r.date === todayStr)?.totalUsers || 0;
  const yesterdayCount =
    result.find((r) => r.date === yesterdayStr)?.totalUsers || 0;
  const trend = (
    ((todayCount - yesterdayCount) * 100) /
    yesterdayCount
  ).toFixed(2);

  return {
    daily: result,
    totalUsers,
    today: todayCount,
    yesterday: yesterdayCount,
    trend,
  };
};
