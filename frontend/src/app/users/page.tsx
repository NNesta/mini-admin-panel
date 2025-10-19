import UsersTable from "@/components/UsersTable";
import { decodeBufferResponse, verifySHA384withRSA } from "@/lib/rsahelper";
import React from "react";

const UsersPage = async () => {
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
  return <UsersTable usersList={validUsers} />;
};

export default UsersPage;
