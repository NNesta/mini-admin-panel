import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { User } from "@/lib/types";
import { Button } from "./ui/button";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

function DeleteUserConfirmation({
  deleteUser,
  setDeleteUser,
}: {
  deleteUser: User | null;
  setDeleteUser: (user: User | null) => void;
}) {
  const router = useRouter();
  const handleDelete = async () => {
    if (!deleteUser) return;
    try {
      const response = await fetch(`/api/users`, {
        method: "DELETE",
        body: JSON.stringify({ id: deleteUser.id }),
      });
      if (!response.ok) {
        toast.error("Failed to delete user");
      }
      router.refresh();
      toast.success("User deleted", {
        description: `${deleteUser.email} has been deleted.`,
      });
      setDeleteUser(null);
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete user", {
        description: "Please try again later.",
      });
    }
  };
  return (
    <Dialog open={!!deleteUser} onOpenChange={() => setDeleteUser(null)}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete User</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete {deleteUser?.email}? This action
            cannot be undone.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline" onClick={() => setDeleteUser(null)}>
            Cancel
          </Button>
          <Button variant="destructive" onClick={handleDelete}>
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default DeleteUserConfirmation;
