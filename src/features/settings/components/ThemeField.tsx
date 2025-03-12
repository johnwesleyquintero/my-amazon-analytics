
import { FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { UseFormReturn } from "react-hook-form";
import { SettingsFormValues } from "../schema";
import { SunIcon, MoonIcon, LaptopIcon } from "lucide-react";

export function ThemeField({ form }: { form: UseFormReturn<SettingsFormValues> }) {
  return (
    <FormField
      control={form.control}
      name="theme"
      render={({ field }) => (
        <FormItem>
          <FormLabel className="text-gray-700 font-medium">Theme Preference</FormLabel>
          <Select onValueChange={field.onChange} defaultValue={field.value}>
            <FormControl>
              <SelectTrigger className="border-gray-300 focus:border-shakespeare focus:ring-shakespeare">
                <SelectValue placeholder="Select theme" />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              <SelectItem value="light" className="flex items-center">
                <div className="flex items-center">
                  <SunIcon className="h-4 w-4 mr-2 text-burnt-sienna" />
                  <span>Light</span>
                </div>
              </SelectItem>
              <SelectItem value="dark" className="flex items-center">
                <div className="flex items-center">
                  <MoonIcon className="h-4 w-4 mr-2 text-butterfly-bush" />
                  <span>Dark</span>
                </div>
              </SelectItem>
              <SelectItem value="system" className="flex items-center">
                <div className="flex items-center">
                  <LaptopIcon className="h-4 w-4 mr-2 text-shakespeare" />
                  <span>System</span>
                </div>
              </SelectItem>
            </SelectContent>
          </Select>
          <FormDescription className="text-gray-500">
            Choose your preferred color theme for the dashboard
          </FormDescription>
          <FormMessage className="text-burnt-sienna" />
        </FormItem>
      )}
    />
  );
}
