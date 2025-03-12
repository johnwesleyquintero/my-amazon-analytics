# Supabase API Examples

## Basic Query Example
```javascript
import { supabase } from '../src/config/supabase';

// Fetch sales data
export const getSalesData = async () => {
  const { data, error } = await supabase
    .from('sales')
    .select('*');

  if (error) throw new Error(error.message);
  return data;
};
```

## Insert Record Example
```javascript
export const addInventoryItem = async (item) => {
  const { data, error } = await supabase
    .from('inventory')
    .insert([item]);

  if (error) throw new Error(error.message);
  return data;
};
```

## Realtime Subscription
```javascript
const setupRealtimeUpdates = () => {
  return supabase
    .channel('sales-channel')
    .on('postgres_changes', {
      event: '*',
      schema: 'public',
      table: 'sales'
    }, (payload) => {
      console.log('Change received:', payload);
    })
    .subscribe();
};
```

**Remember to configure your environment variables:**
```
NEXT_PUBLIC_SUPABASE_URL=your-supabase-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```