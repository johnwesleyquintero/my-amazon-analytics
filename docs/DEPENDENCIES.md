
# Dependency Management

This document outlines our approach to dependency management and our key dependencies.

## Core Dependencies

### Frontend Framework
- **React**: Our primary UI library
- **React DOM**: React rendering for web
- **React Router DOM**: For application routing

### State Management
- **@tanstack/react-query**: For server state management and data fetching
- **Context API**: For global application state

### UI Components
- **@radix-ui**: Accessible UI primitives
- **Tailwind CSS**: Utility-first CSS framework
- **shadcn/ui**: Components built on Radix UI and Tailwind
- **Lucide React**: Icon library

### Backend Integration
- **@supabase/supabase-js**: Supabase client for auth and database

### Data Visualization
- **Recharts**: For charts and graphs

### Form Handling
- **React Hook Form**: Form state management
- **Zod**: Schema validation

### Testing
- **Vitest**: Test runner
- **@testing-library/react**: Component testing
- **@testing-library/user-event**: User event simulation
- **@testing-library/jest-dom**: DOM testing utilities

## Dependency Selection Criteria

When evaluating new dependencies, we consider:

1. **Bundle Size**: Impact on application load time
2. **Maintenance Status**: Active development and community support
3. **TypeScript Support**: Strong typing and integration
4. **Accessibility**: WCAG compliance
5. **Performance**: Runtime performance impact
6. **License**: Compatible with our project
7. **Security**: No known vulnerabilities

## Version Pinning

We pin dependencies to exact versions to ensure consistent builds.
Major version upgrades require thorough testing and approval.

## Dependency Auditing

- Regular security audits via `npm audit`
- Continuous monitoring through GitHub security alerts
- Scheduled dependency updates

## Bundle Analysis

We regularly analyze our bundle size and chunk distribution to:
- Identify large dependencies
- Implement code splitting
- Remove unused dependencies
- Optimize lazy loading

## Performance Monitoring

We monitor the impact of dependencies on:
- Initial load time
- Time to interactive
- Runtime performance
- Memory usage
