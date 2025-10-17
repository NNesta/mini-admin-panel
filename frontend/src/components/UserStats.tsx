import { Card } from './ui/card';
import { TrendingUp } from 'lucide-react';
import React from 'react';

const UserStats = ({ label, value }: { label: string; value: number }) => {
  return (
    <Card className="p-6 bg-card border-border transition-all duration-300 hover:shadow-[var(--shadow-card)]">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-muted-foreground">{label}</p>
          <h3 className="mt-2 text-3xl font-bold text-foreground">{value}</h3>
        </div>
        <div className="rounded-full bg-accent/10 p-3">
          <TrendingUp className="h-6 w-6 text-accent" />
        </div>
      </div>
    </Card>
  );
};

export default UserStats;
