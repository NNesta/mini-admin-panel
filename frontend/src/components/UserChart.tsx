import { Users, TrendingUp } from "lucide-react";
import { Card } from "./ui/card";
import { Chart } from "./Chart";
import { getUserStats } from "../lib/helper";
import { User } from "../lib/types";
import UserStats from "./UserStats";

const UserChart = ({ users }: { users: User[] }) => {
  const {
    daily: chartData,
    totalUsers,
    today: todayUsers,
    yesterday: yesterdayUsers,
    trend,
  } = getUserStats(users);
  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="p-6 bg-card border-border transition-all duration-300 hover:shadow-[var(--shadow-card)]">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">
                Total Users
              </p>
              <h3 className="mt-2 text-3xl font-bold text-foreground">
                {totalUsers}
              </h3>
            </div>
            <div className="rounded-full bg-primary/10 p-3">
              <Users className="h-6 w-6 text-primary" />
            </div>
          </div>
        </Card>
        <UserStats label="Today" value={todayUsers} />
        <UserStats label="Yesterday" value={yesterdayUsers} />

        <Card className="p-6 bg-card border-border transition-all duration-300 hover:shadow-[var(--shadow-card)]">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">
                Growth
              </p>
              <h3 className="mt-2 text-3xl font-bold text-foreground">
                {Number(trend) >= 0 ? "+" : ""}
                {trend}%
              </h3>
            </div>
            <div
              className={`rounded-full p-3 ${
                Number(trend) >= 0 ? "bg-green-500/10" : "bg-red-500/10"
              }`}
            >
              <TrendingUp
                className={`h-6 w-6 ${
                  Number(trend) >= 0 ? "text-green-500" : "text-red-500"
                }`}
              />
            </div>
          </div>
        </Card>
      </div>
      <Card className="p-6 bg-card border-border transition-all duration-300 hover:shadow-[var(--shadow-card)]">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-foreground">
            User Registrations
          </h2>
          <p className="text-sm text-muted-foreground mt-1">Last 7 days</p>
        </div>

        <Chart chartData={chartData} />
      </Card>
    </div>
  );
};

export default UserChart;
