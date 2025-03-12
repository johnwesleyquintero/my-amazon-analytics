
import { FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { UseFormReturn } from "react-hook-form";
import { SettingsFormValues } from "../schema";

export function DateRangeField({ form }: { form: UseFormReturn<SettingsFormValues> }) {
  return (
    <FormField
      control={form.control}
      name="default_date_range"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Default Date Range</FormLabel>
          <Select onValueChange={field.onChange} defaultValue={field.value}>
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder="Select default date range" />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              <SelectItem value="1d">Last 24 hours</SelectItem>
              <SelectItem value="7d">Last 7 days</SelectItem>
              <SelectItem value="30d">Last 30 days</SelectItem>
              <SelectItem value="90d">Last 90 days</SelectItem>
            </SelectContent>
          </Select>
          <FormDescription>
            This will be the default time period shown in your dashboard
          </FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
