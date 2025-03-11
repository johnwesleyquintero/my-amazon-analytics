import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useQuery } from "@tanstack/react-query";
import { Key, Plus, Trash } from "lucide-react";
import type { APIKey } from "@/types/api";

export function APIKeyManagement() {
  const [newKeyType, setNewKeyType] = useState("");
  const [newKeyValue, setNewKeyValue] = useState("");
  const { toast } = useToast();

  const { data: apiKeys, refetch } = useQuery({
    queryKey: ['api-keys'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('api_keys')
        .select('*');
      if (error) throw error;
      return data as APIKey[];
    },
  });

  const handleAddKey = async () => {
    try {
      const { error } = await supabase
        .from('api_keys')
        .insert([
          {
            key_type: newKeyType,
            key_value: newKeyValue,
            user_id: (await supabase.auth.getUser()).data.user?.id
          }
        ]);

      if (error) throw error;

      toast({
        title: "API Key added successfully",
        description: `New ${newKeyType} key has been added.`,
      });

      setNewKeyType("");
      setNewKeyValue("");
      refetch();
    } catch (error: any) {
      toast({
        title: "Error adding API key",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const handleDeleteKey = async (id: string) => {
    try {
      const { error } = await supabase
        .from('api_keys')
        .delete()
        .eq('id', id);

      if (error) throw error;

      toast({
        title: "API Key deleted successfully",
        description: "The API key has been removed.",
      });

      refetch();
    } catch (error: any) {
      toast({
        title: "Error deleting API key",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  return (
    <Card className="bg-white border-gray-200">
      <CardHeader>
        <CardTitle className="text-black text-2xl font-spotify flex items-center gap-2">
          <Key className="w-6 h-6" />
          API Key Management
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="flex gap-4 items-end">
            <div className="flex-1">
              <Select value={newKeyType} onValueChange={setNewKeyType}>
                <SelectTrigger className="bg-white border-gray-200 text-black">
                  <SelectValue placeholder="Select key type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="supabase">Supabase</SelectItem>
                  <SelectItem value="google_sheets">Google Sheets</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex-1">
              <Input
                type="password"
                placeholder="Enter API key"
                value={newKeyValue}
                onChange={(e) => setNewKeyValue(e.target.value)}
                className="bg-white border-gray-200 text-black"
              />
            </div>
            <Button
              onClick={handleAddKey}
              disabled={!newKeyType || !newKeyValue}
              className="bg-black hover:bg-gray-800 text-white"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Key
            </Button>
          </div>

          <div className="space-y-4">
            {apiKeys?.map((key) => (
              <div
                key={key.id}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
              >
                <div className="flex items-center gap-4">
                  <Key className="w-5 h-5 text-black" />
                  <div>
                    <p className="text-black font-medium">{key.key_type}</p>
                    <p className="text-sm text-gray-600">
                      Added on {new Date(key.created_at).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleDeleteKey(key.id)}
                  className="text-red-500 hover:text-red-600 hover:bg-red-50"
                >
                  <Trash className="w-4 h-4" />
                </Button>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}