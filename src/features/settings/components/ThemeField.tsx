
import { FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { UseFormReturn } from "react-hook-form";
import { SettingsFormValues } from "../schema";

export function ThemeField({ form }: { form: UseFormReturn<SettingsFormValues> }) {
  return (
    <FormField
      control={form.control}
      name="theme"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Theme Preference</FormLabel>
          <Select onValueChange={field.onChange} defaultValue={field.value}>
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder="Select theme" />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              <SelectItem value="light">Light</SelectItem>
              <SelectItem value="dark">Dark</SelectItem>
              <SelectItem value="system">System</SelectItem>
            </SelectContent>
          </Select>
          <FormDescription>
            Choose your preferred color theme
          </FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
