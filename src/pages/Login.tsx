
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    if (!email || !password) {
      toast.error("Please fill in all fields");
      setIsLoading(false);
      return;
    }
    
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password: password.trim(),
      });

      if (error) {
        if (error.message === "Invalid login credentials") {
          toast.error("Email or password is incorrect");
        } else if (error.message.includes("Email not confirmed")) {
          toast.error("Please verify your email before logging in");
        } else {
          toast.error(error.message);
        }
        setIsLoading(false);
        return;
      }

      if (data.user) {
        const isAdmin = data.user.email === "johnwesleyquintero@gmail.com";
        toast.success("Successfully logged in!");
        navigate(isAdmin ? "/admin" : "/dashboard");
      }
    } catch (error: any) {
      console.error("Login error:", error);
      toast.error("An unexpected error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-white to-catskill-white p-4">
      <Card className="w-full max-w-md p-8 bg-white shadow-lg border-0">
        <div className="flex justify-center mb-6">
          <div className="flex items-center space-x-2">
            <div className="flex">
              <div className="h-6 w-2 bg-burnt-sienna rounded-sm"></div>
              <div className="h-6 w-2 bg-shakespeare rounded-sm ml-0.5"></div>
              <div className="h-6 w-2 bg-gold rounded-sm ml-0.5"></div>
            </div>
            <div className="text-2xl font-bold font-manrope text-gray-900">
              My Amazon Guy
            </div>
          </div>
        </div>
        
        <h1 className="text-2xl font-bold text-gray-900 mb-6 text-center font-manrope">Login</h1>
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <Input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border-gray-300 focus:border-shakespeare focus:ring-shakespeare"
              disabled={isLoading}
              required
            />
          </div>
          <div>
            <Input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border-gray-300 focus:border-shakespeare focus:ring-shakespeare"
              disabled={isLoading}
              required
            />
          </div>
          <Button 
            type="submit" 
            className="w-full bg-burnt-sienna hover:bg-burnt-sienna/90 text-white" 
            disabled={isLoading}
          >
            {isLoading ? "Logging in..." : "Login"}
          </Button>
          <p className="text-center text-sm text-gray-600 font-roboto">
            Don't have an account?{" "}
            <Link to="/register" className="text-shakespeare hover:underline font-medium">
              Register
            </Link>
          </p>
        </form>
      </Card>
    </div>
  );
};

export default Login;
