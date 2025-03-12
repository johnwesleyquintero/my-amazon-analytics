
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Settings, Lock, Mail, User, Building, Calendar } from "lucide-react";

// Define interface for Profile including is_suspended
interface Profile {
  id: string;
  user_id?: string; // Optional for compatibility
  email: string;
  first_name: string;
  last_name: string;
  avatar_url: string;
  company_name: string;
  created_at: string;
  updated_at: string;
  is_suspended: boolean;
}

export function UserManagement() {
  const [users, setUsers] = useState<Profile[]>([]);
  const [selectedUser, setSelectedUser] = useState<Profile | null>(null);
  const { toast } = useToast();

  const fetchUsers = async () => {
    try {
      const { data, error } = await supabase.from("profiles").select("*");
      if (error) throw error;
      
      // Cast the data to match the Profile interface
      const typedData = data.map(user => ({
        ...user,
        id: user.id,
        is_suspended: user.is_suspended || false
      })) as Profile[];
      
      setUsers(typedData);
    } catch (error) {
      console.error("Error fetching users:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to load users. Please try again later.",
      });
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleSuspendUser = async (userId: string, isSuspended: boolean) => {
    try {
      const { error } = await supabase
        .from("profiles")
        .update({ is_suspended: isSuspended })
        .eq("id", userId);

      if (error) throw error;

      setUsers(
        users.map((user) =>
          user.id === userId ? { ...user, is_suspended: isSuspended } : user
        )
      );

      toast({
        title: `User ${isSuspended ? "suspended" : "unsuspended"}`,
        description: `The user has been ${isSuspended ? "suspended" : "unsuspended"} successfully.`,
      });
    } catch (error) {
      console.error("Error updating user status:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to update user status. Please try again.",
      });
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Settings className="h-5 w-5" />
            <span>User Management</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b border-gray-200 dark:border-gray-700">
                  <th className="text-left py-4 px-4 font-medium text-gray-600 dark:text-gray-300">User</th>
                  <th className="text-left py-4 px-4 font-medium text-gray-600 dark:text-gray-300">Email</th>
                  <th className="text-left py-4 px-4 font-medium text-gray-600 dark:text-gray-300">Company</th>
                  <th className="text-left py-4 px-4 font-medium text-gray-600 dark:text-gray-300">Status</th>
                  <th className="text-right py-4 px-4 font-medium text-gray-600 dark:text-gray-300">Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id} className="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/50">
                    <td className="py-4 px-4">
                      <div className="flex items-center space-x-3">
                        <Avatar>
                          <AvatarImage src={user.avatar_url} alt={`${user.first_name} ${user.last_name}`} />
                          <AvatarFallback>{`${user.first_name.charAt(0)}${user.last_name.charAt(0)}`}</AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium text-gray-800 dark:text-gray-100">{`${user.first_name} ${user.last_name}`}</div>
                          <div className="text-sm text-gray-500 dark:text-gray-400">
                            Joined {new Date(user.created_at).toLocaleDateString()}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-gray-800 dark:text-gray-100">{user.email}</td>
                    <td className="py-4 px-4 text-gray-800 dark:text-gray-100">{user.company_name || "—"}</td>
                    <td className="py-4 px-4">
                      {user.is_suspended ? (
                        <Badge variant="destructive">Suspended</Badge>
                      ) : (
                        <Badge variant="outline" className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100">
                          Active
                        </Badge>
                      )}
                    </td>
                    <td className="py-4 px-4 text-right">
                      <div className="flex items-center justify-end space-x-2">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => setSelectedUser(user)}
                            >
                              View
                            </Button>
                          </DialogTrigger>
                          <DialogContent>
                            {selectedUser && (
                              <>
                                <DialogHeader>
                                  <DialogTitle>User Details</DialogTitle>
                                  <DialogDescription>View and manage user information</DialogDescription>
                                </DialogHeader>
                                <div className="space-y-4 py-4">
                                  <div className="flex justify-center">
                                    <Avatar className="h-24 w-24">
                                      <AvatarImage src={selectedUser.avatar_url} alt={`${selectedUser.first_name} ${selectedUser.last_name}`} />
                                      <AvatarFallback className="text-2xl">{`${selectedUser.first_name.charAt(0)}${selectedUser.last_name.charAt(0)}`}</AvatarFallback>
                                    </Avatar>
                                  </div>
                                  <div className="grid grid-cols-1 gap-4">
                                    <div className="space-y-2">
                                      <Label htmlFor="name">Name</Label>
                                      <div className="flex items-center border rounded-md p-2">
                                        <User className="h-4 w-4 mr-2 text-gray-400" />
                                        <div id="name">{`${selectedUser.first_name} ${selectedUser.last_name}`}</div>
                                      </div>
                                    </div>
                                    <div className="space-y-2">
                                      <Label htmlFor="email">Email</Label>
                                      <div className="flex items-center border rounded-md p-2">
                                        <Mail className="h-4 w-4 mr-2 text-gray-400" />
                                        <div id="email">{selectedUser.email}</div>
                                      </div>
                                    </div>
                                    <div className="space-y-2">
                                      <Label htmlFor="company">Company</Label>
                                      <div className="flex items-center border rounded-md p-2">
                                        <Building className="h-4 w-4 mr-2 text-gray-400" />
                                        <div id="company">{selectedUser.company_name || "—"}</div>
                                      </div>
                                    </div>
                                    <div className="space-y-2">
                                      <Label htmlFor="created">Account Created</Label>
                                      <div className="flex items-center border rounded-md p-2">
                                        <Calendar className="h-4 w-4 mr-2 text-gray-400" />
                                        <div id="created">{new Date(selectedUser.created_at).toLocaleString()}</div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <DialogFooter>
                                  <Button
                                    variant={selectedUser.is_suspended ? "default" : "destructive"}
                                    onClick={() => {
                                      handleSuspendUser(selectedUser.id, !selectedUser.is_suspended);
                                      setSelectedUser(null);
                                    }}
                                  >
                                    {selectedUser.is_suspended ? "Unsuspend User" : "Suspend User"}
                                  </Button>
                                </DialogFooter>
                              </>
                            )}
                          </DialogContent>
                        </Dialog>
                        <Button
                          variant={user.is_suspended ? "default" : "destructive"}
                          size="sm"
                          onClick={() => handleSuspendUser(user.id, !user.is_suspended)}
                        >
                          {user.is_suspended ? "Unsuspend" : "Suspend"}
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
