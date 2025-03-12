import { useEffect, useState } from "react";
import { Profile } from "@/types/api";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Loader2, UserX, RefreshCw } from "lucide-react";

export function UserManagement() {
  const [users, setUsers] = useState<Profile[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("profiles")
        .select("*");
      
      if (error) throw error;
      
      // Cast the data to match the Profile interface
      const typedData = data.map(user => ({
        ...user,
        user_id: user.user_id || user.id // Use user_id if available, otherwise use id
      })) as Profile[];
      
      setUsers(typedData);
    } catch (error) {
      console.error("Error fetching users:", error);
      toast({
        title: "Error",
        description: "Could not fetch users",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const suspendUser = async (userId: string) => {
    try {
      const { error } = await supabase
        .from("profiles")
        .update({ is_suspended: true })
        .eq("user_id", userId);

      if (error) throw error;

      setUsers(users.map(user =>
        user.user_id === userId ? { ...user, is_suspended: true } : user
      ));

      toast({
        title: "User Suspended",
        description: "User has been successfully suspended.",
      });
    } catch (error) {
      console.error("Error suspending user:", error);
      toast({
        title: "Error",
        description: "Could not suspend user",
        variant: "destructive",
      });
    }
  };

  return (
    <Card className="shadow-md border-shakespeare/20">
      <CardHeader>
        <CardTitle className="text-lg font-semibold flex items-center">
          <Settings className="mr-2 h-4 w-4" /> User Management
        </CardTitle>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="flex justify-center">
            <Loader2 className="h-6 w-6 animate-spin" />
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Avatar</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.user_id}>
                  <TableCell>
                    <Avatar>
                      <AvatarImage src={user.avatar_url} />
                      <AvatarFallback>{user.first_name?.[0]}{user.last_name?.[0]}</AvatarFallback>
                    </Avatar>
                  </TableCell>
                  <TableCell>{user.first_name} {user.last_name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>
                    {user.is_suspended ? (
                      <Badge variant="destructive">Suspended</Badge>
                    ) : (
                      <Badge variant="secondary">Active</Badge>
                    )}
                  </TableCell>
                  <TableCell className="text-right">
                    {!user.is_suspended && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => suspendUser(user.user_id)}
                      >
                        <UserX className="mr-2 h-4 w-4" />
                        Suspend
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  );
}
