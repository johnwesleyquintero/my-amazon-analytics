
# TypeScript Standards

This document outlines the TypeScript standards used in this project.

## Type Definitions

### Use Explicit Return Types

```typescript
// ✅ Good
function calculateTotal(items: CartItem[]): number { ... }

// ❌ Avoid
function calculateTotal(items: CartItem[]) { ... }
```

### Prefer Interfaces for Objects

Use interfaces for object types, especially for public APIs and component props:

```typescript
// ✅ Good
interface UserProfile {
  id: string;
  name: string;
  email: string;
}

// ❌ Avoid
type UserProfile = {
  id: string;
  name: string;
  email: string;
};
```

### Use Type for Unions, Intersections, and Utility Types

```typescript
// ✅ Good
type Status = 'idle' | 'loading' | 'success' | 'error';
type UserWithSettings = User & UserSettings;
type PartialUser = Partial<User>;
```

### Avoid `any`

Use specific types or `unknown` instead of `any`:

```typescript
// ✅ Good
function parseData(input: unknown): ParsedData { ... }

// ❌ Avoid
function parseData(input: any): any { ... }
```

## React Component Types

### Functional Components

```typescript
import { FC, ReactNode } from 'react';

interface ButtonProps {
  children: ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary';
  disabled?: boolean;
}

export const Button: FC<ButtonProps> = ({
  children,
  onClick,
  variant = 'primary',
  disabled = false
}) => {
  // Component implementation
};
```

### Props with Children

```typescript
interface LayoutProps {
  children: ReactNode;
  sidebar?: ReactNode;
}
```

### Event Handlers

```typescript
// DOM event handlers
const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => { ... };
const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => { ... };

// Custom event handlers
interface SelectOptionEvent {
  value: string;
  label: string;
}

const handleSelectOption = (event: SelectOptionEvent) => { ... };
```

## API and State Management

### API Responses

```typescript
interface ApiResponse<T> {
  data: T | null;
  error: string | null;
  status: number;
}

interface PaginatedResponse<T> extends ApiResponse<T[]> {
  pagination: {
    total: number;
    page: number;
    limit: number;
  };
}
```

### State Management

```typescript
interface UserState {
  user: User | null;
  isLoading: boolean;
  error: string | null;
}

type UserAction = 
  | { type: 'FETCH_USER_REQUEST' }
  | { type: 'FETCH_USER_SUCCESS', payload: User }
  | { type: 'FETCH_USER_FAILURE', payload: string }
  | { type: 'CLEAR_USER' };
```

## Type Guards

```typescript
function isUserResponse(obj: unknown): obj is UserResponse {
  return (
    typeof obj === 'object' && 
    obj !== null && 
    'id' in obj && 
    'name' in obj
  );
}

// Usage
if (isUserResponse(response)) {
  // TypeScript knows response is UserResponse
  console.log(response.id);
}
```

## Utility Types

Make use of TypeScript's built-in utility types:

```typescript
// Make all properties optional
type PartialUser = Partial<User>;

// Make all properties required
type RequiredUser = Required<User>;

// Pick specific properties
type UserCredentials = Pick<User, 'email' | 'password'>;

// Omit specific properties
type PublicUser = Omit<User, 'password' | 'securityQuestion'>;

// Extract from union type
type ExtractedId = Extract<'id' | 'name', 'id'>;

// Record for dictionaries
type UserDictionary = Record<string, User>;
```

## Type Import/Export

```typescript
// types.ts
export interface User { ... }
export type UserRole = 'admin' | 'user';

// component.tsx
import type { User, UserRole } from './types';
```

## Code Organization

- Group related types in dedicated type files
- Co-locate component props with component definitions
- Use barrel files (index.ts) to export types from directories
