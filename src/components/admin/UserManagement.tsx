
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useQuery } from "@tanstack/react-query";
import { Users, Settings } from "lucide-react";

interface Profile {
  id: string;
  company_name: string | null;
  created_at: string;
  updated_at: string | null;
  avatar_url: string | null;
  email: string;
  first_name: string;
  last_name: string;
  is_suspended: boolean;
}

export function UserManagement() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const { toast } = useToast();

  const { data: profiles, isLoading, refetch } = useQuery({
    queryKey: ['admin-profiles'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('profiles')
        .select('*');

      if (error) {
        console.error('User query error:', error);
        throw new Error('Failed to fetch users');
      }
      return data as Profile[];
    },
  });

  // Filter profiles based on search and status
  const filteredProfiles = profiles?.filter(profile => {
    const matchesSearch = 
      (profile.company_name?.toLowerCase().includes(searchQuery.toLowerCase()) || 
      profile.email?.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesStatus = statusFilter === "all" || 
                         (statusFilter === "active" && !profile.is_suspended) ||
                         (statusFilter === "suspended" && profile.is_suspended);
    
    return matchesSearch && matchesStatus;
  });

  const handleDeleteUser = async (userId: string) => {
    try {
      const { error } = await supabase
        .from('profiles')
        .delete()
        .eq('id', userId);
      
      if (error) throw error;
      
      toast({
        title: "User deleted successfully",
        description: "The user has been removed from the system.",
      });
      
      refetch();
    } catch (error: any) {
      toast({
        title: "Error deleting user",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const handleToggleSuspension = async (userId: string, isSuspended: boolean) => {
    try {
      const { error } = await supabase
        .from('profiles')
        .update({ is_suspended: !isSuspended })
        .eq('id', userId);
      
      if (error) throw error;
      
      toast({
        title: isSuspended ? "User activated" : "User suspended",
        description: isSuspended 
          ? "The user has been reactivated." 
          : "The user has been suspended.",
      });
      
      refetch();
    } catch (error: any) {
      toast({
        title: "Action failed",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  return (
    <Card className="border-gray-200">
      <CardHeader>
        <CardTitle className="text-2xl flex items-center gap-2">
          <Users className="w-6 h-6" />
          User Management
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex gap-4 mb-6">
          <Input
            placeholder="Search users..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="border-gray-200"
          />
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[180px] border-gray-200">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Users</SelectItem>
              <SelectItem value="active">Active Users</SelectItem>
              <SelectItem value="suspended">Suspended Users</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-semibold">Company</th>
                <th className="text-left py-3 px-4 font-semibold">Email</th>
                <th className="text-left py-3 px-4 font-semibold">Status</th>
                <th className="text-left py-3 px-4 font-semibold">Joined</th>
                <th className="text-left py-3 px-4 font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <tr>
                  <td colSpan={5} className="text-center py-4 text-gray-600">Loading users...</td>
                </tr>
              ) : filteredProfiles?.length === 0 ? (
                <tr>
                  <td colSpan={5} className="text-center py-4 text-gray-600">No users found</td>
                </tr>
              ) : filteredProfiles?.map((profile) => (
                <tr key={profile.id} className="border-b border-gray-100">
                  <td className="py-3 px-4">{profile.company_name || 'N/A'}</td>
                  <td className="py-3 px-4">{profile.email}</td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-1 rounded-full text-xs ${profile.is_suspended ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'}`}>
                      {profile.is_suspended ? 'Suspended' : 'Active'}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-gray-600">
                    {new Date(profile.created_at).toLocaleDateString()}
                  </td>
                  <td className="py-3 px-4 flex gap-2">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className={profile.is_suspended ? "text-green-600 hover:text-green-700" : "text-amber-600 hover:text-amber-700"}
                      onClick={() => handleToggleSuspension(profile.id, !!profile.is_suspended)}
                    >
                      {profile.is_suspended ? 'Activate' : 'Suspend'}
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="text-red-600 hover:text-red-700"
                      onClick={() => handleDeleteUser(profile.id)}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
}
