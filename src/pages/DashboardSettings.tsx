
import { Form } from "@/components/ui/form";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { useSettings } from "@/features/settings/use-settings";
import { DateRangeField } from "@/features/settings/components/DateRangeField";
import { CurrencyField } from "@/features/settings/components/CurrencyField";
import { NotificationFields } from "@/features/settings/components/NotificationFields";
import { ThemeField } from "@/features/settings/components/ThemeField";

const DashboardSettings = () => {
  const { form, onSubmit, isSubmitting } = useSettings();

  return (
    <div className="container mx-auto py-6">
      <Card>
        <CardHeader>
          <CardTitle>Dashboard Settings</CardTitle>
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
  );
};

export default DashboardSettings;
