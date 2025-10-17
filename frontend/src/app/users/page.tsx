'use client';
import { useState } from 'react';
import {
  Pencil,
  Trash2,
  Mail,
  Shield,
  CheckCircle,
  XCircle,
} from 'lucide-react';
import { format } from 'date-fns';
import { toast } from 'sonner';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/src/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/src/components/ui/table';
import { Button } from '@/src/components/ui/button';
import { Input } from '@/src/components/ui/input';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/src/components/ui/dialog';
import { Label } from '@/src/components/ui/label';

interface User {
  id: string;
  email: string;
  createdAt: string;
  role: string;
  status: string;
}

const sampleUsers: User[] = [
  {
    id: '78baa771-f0f7-4aa9-b1a2-da04040d8ecb',
    email: 'john@example.com',
    role: 'admin',
    status: 'active',
    createdAt: '2025-10-15T17:36:15.000Z',
  },
  {
    id: '1a5e8ef9-a98e-4b8c-accd-4d247a6e378c',
    email: 'nest@example.com',
    role: 'admin',
    status: 'active',
    createdAt: '2025-10-15T17:58:30.000Z',
  },
  {
    id: '2b6f9d4a-b79c-5c9d-bcde-5e358b7f489d',
    email: 'sarah@example.com',
    role: 'user',
    status: 'active',
    createdAt: '2025-10-14T10:22:45.000Z',
  },
  {
    id: '3c7g0e5b-c80d-6d0e-cdef-6f469c8g500e',
    email: 'mike@example.com',
    role: 'user',
    status: 'active',
    createdAt: '2025-10-13T14:15:30.000Z',
  },
  {
    id: '4d8h1f6c-d91e-7e1f-def0-7g570d9h611f',
    email: 'emma@example.com',
    role: 'user',
    status: 'inactive',
    createdAt: '2025-10-12T09:45:20.000Z',
  },
  {
    id: '5e9i2g7d-e02f-8f2g-efg1-8h681e0i722g',
    email: 'alex@example.com',
    role: 'user',
    status: 'active',
    createdAt: '2025-10-11T16:30:10.000Z',
  },
  {
    id: '6f0j3h8e-f13g-9g3h-fgh2-9i792f1j833h',
    email: 'olivia@example.com',
    role: 'user',
    status: 'active',
    createdAt: '2025-10-10T11:20:55.000Z',
  },
];

export default function Users() {
  const [users, setUsers] = useState<User[]>(sampleUsers);

  const [editUser, setEditUser] = useState<User | null>(null);
  const [deleteUser, setDeleteUser] = useState<User | null>(null);

  const handleEdit = (user: User) => {
    setEditUser(user);
  };

  const handleSaveEdit = async () => {
    if (!editUser) return;

    setUsers(users.map((u) => (u.id === editUser.id ? editUser : u)));
    toast.info('User updated', {
      description: `${editUser.email} has been updated successfully.`,
    });
    setEditUser(null);
  };

  const handleDelete = async () => {
    if (!deleteUser) return;

    setUsers(users.filter((u) => u.id !== deleteUser.id));
    toast.info('User deleted', {
      description: `${deleteUser.email} has been deleted.`,
    });
    setDeleteUser(null);
  };

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>All Users</CardTitle>
          <CardDescription>
            Manage and view all registered users
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Email</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Created</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users?.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Mail className="h-4 w-4 text-muted-foreground" />
                      {user.email}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Shield className="h-4 w-4 text-primary" />
                      <span className="capitalize">{user.role}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {user.status === 'active' ? (
                        <>
                          <CheckCircle className="h-4 w-4 text-green-500" />
                          <span className="text-green-500">Active</span>
                        </>
                      ) : (
                        <>
                          <XCircle className="h-4 w-4 text-muted-foreground" />
                          <span className="text-muted-foreground">
                            Inactive
                          </span>
                        </>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    {format(new Date(user.createdAt), 'MMM dd, yyyy')}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleEdit(user)}
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setDeleteUser(user)}
                      >
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Edit Dialog */}
      <Dialog open={!!editUser} onOpenChange={() => setEditUser(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit User</DialogTitle>
            <DialogDescription>Update user information</DialogDescription>
          </DialogHeader>
          {editUser && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  value={editUser.email}
                  onChange={(e) =>
                    setEditUser({ ...editUser, email: e.target.value })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="role">Role</Label>
                <Input
                  id="role"
                  value={editUser.role}
                  onChange={(e) =>
                    setEditUser({ ...editUser, role: e.target.value })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="status">Status</Label>
                <Input
                  id="status"
                  value={editUser.status}
                  onChange={(e) =>
                    setEditUser({ ...editUser, status: e.target.value })
                  }
                />
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditUser(null)}>
              Cancel
            </Button>
            <Button onClick={handleSaveEdit}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Dialog */}
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
    </>
  );
}
