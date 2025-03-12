
import * as z from 'zod';

export const settingsFormSchema = z.object({
  default_date_range: z.enum(['1d', '7d', '30d', '90d']),
  default_currency: z.enum(['USD', 'EUR', 'GBP']),
  notification_preferences: z.object({
    email: z.boolean(),
    in_app: z.boolean(),
  }),
  theme: z.enum(['light', 'dark', 'system']),
});

export type SettingsFormValues = z.infer<typeof settingsFormSchema>;

export const defaultValues: Partial<SettingsFormValues> = {
  default_date_range: '7d',
  default_currency: 'USD',
  notification_preferences: {
    email: true,
    in_app: true,
  },
  theme: 'system',
};
