
import { Form } from "@/components/ui/form";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2, KeyRound } from "lucide-react";
import { useSettings } from "@/features/settings/use-settings";
import { DateRangeField } from "@/features/settings/components/DateRangeField";
import { CurrencyField } from "@/features/settings/components/CurrencyField";
import { NotificationFields } from "@/features/settings/components/NotificationFields";
import { ThemeField } from "@/features/settings/components/ThemeField";
import { Link } from "react-router-dom";

const DashboardSettings = () => {
  const { form, onSubmit, isSubmitting } = useSettings();

  return (
    <div className="container mx-auto py-6">
      <h1 className="text-2xl font-bold mb-6">Dashboard Settings</h1>
      
      <div className="grid grid-cols-1 gap-6 mb-6">
        <Card>
          <CardHeader>
            <CardTitle>General Settings</CardTitle>
            <CardDescription>
              Customize your dashboard experience and notification preferences
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <DateRangeField form={form} />
                <CurrencyField form={form} />
                <NotificationFields form={form} />
                <ThemeField form={form} />
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting && (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  )}
                  Save Settings
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="hover:shadow-md transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center">
              <KeyRound className="w-5 h-5 mr-2" />
              API Keys Management
            </CardTitle>
            <CardDescription>
              Manage API keys for Amazon, Google Workspace and other integrations
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Link to="/api-keys">
              <Button variant="outline" className="w-full">
                Manage API Keys
              </Button>
            </Link>
          </CardContent>
        </Card>
        
        <Card className="hover:shadow-md transition-shadow">
          <CardHeader>
            <CardTitle>Google Workspace Integration</CardTitle>
            <CardDescription>
              Configure integration with Google Sheets and other Google services
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Link to="/dashboard">
              <Button variant="outline" className="w-full">
                Configure Google Workspace
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DashboardSettings;
