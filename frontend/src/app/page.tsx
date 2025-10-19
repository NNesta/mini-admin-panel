import {
  decodeBufferResponse,
  // verifyEmailSignature,
  verifySHA384withRSA,
} from "@/lib/rsahelper";
import UserChart from "../components/UserChart";

const Index = async () => {
  const response = await fetch(`${process.env.API_URL}/users/export`);
  if (!response.ok) {
    throw new Error("Failed to fetch users");
  }
  const users = await decodeBufferResponse(response);
  const usersWithVerification = users.map((user) => {
    const isSignatureValid = verifySHA384withRSA(
      user.emailHash,
      user.signature
    );
    return {
      ...user,
      isSignatureValid,
    };
  });

  const validUsers = usersWithVerification.filter(
    (user) => user.isSignatureValid
  );
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
        <UserChart users={validUsers} />
      </div>
    </div>
  );
};
export default Index;
