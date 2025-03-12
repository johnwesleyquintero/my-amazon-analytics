
import { Form } from "@/components/ui/form";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2, KeyRound, Settings, BarChart4, Link2 } from "lucide-react";
import { useSettings } from "@/features/settings/use-settings";
import { DateRangeField } from "@/features/settings/components/DateRangeField";
import { CurrencyField } from "@/features/settings/components/CurrencyField";
import { NotificationFields } from "@/features/settings/components/NotificationFields";
import { ThemeField } from "@/features/settings/components/ThemeField";
import { Link } from "react-router-dom";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";

const DashboardSettings = () => {
  const { form, onSubmit, isSubmitting } = useSettings();

  return (
    <DashboardLayout>
      <div className="container mx-auto py-6">
        <h1 className="text-3xl font-bold mb-2 font-manrope text-gray-900">Dashboard Settings</h1>
        <p className="text-gray-600 mb-6 font-roboto">Customize your analytics experience and manage integrations</p>
        
        <div className="grid grid-cols-1 gap-6 mb-8">
          <Card className="border-shakespeare/20 hover:border-shakespeare/50 transition-colors">
            <CardHeader className="bg-gradient-to-r from-catskill-white to-white border-b">
              <CardTitle className="flex items-center text-gray-800">
                <Settings className="w-5 h-5 mr-2 text-burnt-sienna" />
                General Settings
              </CardTitle>
              <CardDescription className="text-gray-600">
                Customize your dashboard experience and notification preferences
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                  <DateRangeField form={form} />
                  <CurrencyField form={form} />
                  <NotificationFields form={form} />
                  <ThemeField form={form} />
                  <Button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="bg-burnt-sienna hover:bg-burnt-sienna/90 text-white"
                  >
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
          <Card className="border-shakespeare/20 hover:border-shakespeare/40 transition-all duration-300">
            <CardHeader className="bg-gradient-to-r from-catskill-white to-white border-b">
              <CardTitle className="flex items-center text-gray-800">
                <KeyRound className="w-5 h-5 mr-2 text-shakespeare" />
                API Keys Management
              </CardTitle>
              <CardDescription className="text-gray-600">
                Manage API keys for Amazon, Google Workspace and other integrations
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <Link to="/api-keys">
                <Button 
                  variant="outline" 
                  className="w-full border-shakespeare/30 hover:border-shakespeare text-shakespeare hover:text-shakespeare/90 hover:bg-shakespeare/5"
                >
                  Manage API Keys
                </Button>
              </Link>
            </CardContent>
          </Card>
          
          <Card className="border-shakespeare/20 hover:border-shakespeare/40 transition-all duration-300">
            <CardHeader className="bg-gradient-to-r from-catskill-white to-white border-b">
              <CardTitle className="flex items-center text-gray-800">
                <BarChart4 className="w-5 h-5 mr-2 text-gold" />
                Google Workspace Integration
              </CardTitle>
              <CardDescription className="text-gray-600">
                Configure integration with Google Sheets and other Google services
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <Link to="/dashboard">
                <Button 
                  variant="outline" 
                  className="w-full border-gold/30 hover:border-gold text-gray-700 hover:text-gray-900 hover:bg-gold/5"
                >
                  Configure Google Workspace
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default DashboardSettings;
