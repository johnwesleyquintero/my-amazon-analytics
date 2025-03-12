
import { FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { UseFormReturn } from "react-hook-form";
import { SettingsFormValues } from "../schema";
import { SunIcon, MoonIcon, LaptopIcon } from "lucide-react";
import { useEffect } from "react";

export function ThemeField({ form }: { form: UseFormReturn<SettingsFormValues> }) {
  // Apply theme when the component mounts and when theme changes
  useEffect(() => {
    const theme = form.watch("theme");
    applyTheme(theme);
  }, [form.watch("theme")]);

  // Function to apply theme
  const applyTheme = (theme: string) => {
    const root = window.document.documentElement;
    root.classList.remove("light", "dark");
    
    if (theme === "system") {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
      root.classList.add(systemTheme);
    } else {
      root.classList.add(theme);
    }
  };

  return (
    <FormField
      control={form.control}
      name="theme"
      render={({ field }) => (
        <FormItem>
          <FormLabel className="text-gray-700 dark:text-gray-300 font-medium">Theme Preference</FormLabel>
          <Select 
            onValueChange={(value) => {
              field.onChange(value);
              applyTheme(value);
            }} 
            defaultValue={field.value}
          >
            <FormControl>
              <SelectTrigger className="border-gray-300 dark:border-gray-600 focus:border-shakespeare focus:ring-shakespeare dark:bg-gray-800 dark:text-gray-200">
                <SelectValue placeholder="Select theme" />
              </SelectTrigger>
            </FormControl>
            <SelectContent className="dark:bg-gray-800">
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
          <FormDescription className="text-gray-500 dark:text-gray-400">
            Choose your preferred color theme for the dashboard
          </FormDescription>
          <FormMessage className="text-burnt-sienna" />
        </FormItem>
      )}
    />
  );
}
