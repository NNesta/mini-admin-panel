import UsersTable from "@/components/UsersTable";
import { decodeBufferResponse } from "@/lib/rsahelper";
import React from "react";

const UsersPage = async () => {
  const response = await fetch(`${process.env.API_URL}/users/export`);
  if (!response.ok) {
    throw new Error("Failed to fetch users");
  }
  const users = await decodeBufferResponse(response);
  return <UsersTable usersList={users} />;
};

export default UsersPage;
