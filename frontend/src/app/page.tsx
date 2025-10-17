import UserChart from '../components/UserChart';
import { fetchAndDecodeUsers } from '../lib/helper';
import { User } from '../lib/types';

// const fetchUsers = async (): Promise<User[]> => {
//   const response = await fetch(
//     `${process.env.NEXT_PUBLIC_API_URL}/users/export`
//   );
//   if (!response.ok) {
//     throw new Error('Failed to fetch users');
//   }
//   const data = await response.json();
//   console.log({ data });
//   return data;
// };

const Index = async () => {
  let users: User[] = [];
  try {
    users = await fetchAndDecodeUsers();
    console.log({ users });
  } catch (error) {
    console.error(error);
  }
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto p-8">
        <header className="mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-[hsl(var(--primary))] to-[hsl(var(--primary-glow))] bg-clip-text text-transparent">
            Analytics Dashboard
          </h1>
          <p className="text-muted-foreground mt-2">
            Track your user growth and engagement
          </p>
        </header>
        {/* <div className="space-y-6">
            <div className="grid gap-4 md:grid-cols-3">
              <Skeleton className="h-32 rounded-lg" />
              <Skeleton className="h-32 rounded-lg" />
              <Skeleton className="h-32 rounded-lg" />
            </div>
            <Skeleton className="h-[450px] rounded-lg" />
          </div> */}
        <UserChart users={users} />
      </div>
    </div>
  );
};
export default Index;
