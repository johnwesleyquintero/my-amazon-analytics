
import { FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { UseFormReturn } from "react-hook-form";
import { SettingsFormValues } from "../schema";

export function CurrencyField({ form }: { form: UseFormReturn<SettingsFormValues> }) {
  return (
    <FormField
      control={form.control}
      name="default_currency"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Default Currency</FormLabel>
          <Select onValueChange={field.onChange} defaultValue={field.value}>
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder="Select default currency" />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              <SelectItem value="USD">USD ($)</SelectItem>
              <SelectItem value="EUR">EUR (€)</SelectItem>
              <SelectItem value="GBP">GBP (£)</SelectItem>
            </SelectContent>
          </Select>
          <FormDescription>
            Currency used to display monetary values
          </FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
