# Prompt: Create Context Provider

> Reusable prompt for creating a React Context provider with shared state.

## Variables

- `{ContextName}` — PascalCase (e.g., `Theme`, `Auth`, `Likes`)
- `{Description}` — What state this context manages

## Instructions

### 1. Context File

Create `src/contexts/{ContextName}Context.tsx`:

```tsx
import { createContext, useContext, useReducer, type ReactNode } from 'react';

// ──── Types ────
interface {ContextName}State {
  // Define state shape
}

type {ContextName}Action =
  | { type: 'SET_VALUE'; payload: string }
  | { type: 'RESET' };

interface {ContextName}ContextValue extends {ContextName}State {
  // Expose actions as functions
  dispatch: React.Dispatch<{ContextName}Action>;
}

// ──── Context ────
const {ContextName}Context = createContext<{ContextName}ContextValue | undefined>(undefined);

// ──── Reducer ────
const {ContextName}Reducer = (state: {ContextName}State, action: {ContextName}Action): {ContextName}State => {
  switch (action.type) {
    case 'SET_VALUE':
      return { ...state /* update */ };
    case 'RESET':
      return initialState;
    default:
      return state;
  }
};

const initialState: {ContextName}State = {
  // Initial values
};

// ──── Provider ────
interface {ContextName}ProviderProps {
  children: ReactNode;
}

export const {ContextName}Provider = ({ children }: {ContextName}ProviderProps) => {
  const [state, dispatch] = useReducer({ContextName}Reducer, initialState);

  return (
    <{ContextName}Context.Provider value={{ ...state, dispatch }}>
      {children}
    </{ContextName}Context.Provider>
  );
};

// ──── Consumer Hook ────
export const use{ContextName} = (): {ContextName}ContextValue => {
  const context = useContext({ContextName}Context);
  if (!context) {
    throw new Error('use{ContextName} must be used within a {ContextName}Provider');
  }
  return context;
};
```

### 2. Checklist

- [ ] `createContext` initialised with `undefined` (forces provider usage)
- [ ] Consumer hook throws descriptive error if used outside provider
- [ ] `useReducer` used for complex state (> 2 values)
- [ ] Provider accepts `children: ReactNode`
- [ ] All types exported for external use
- [ ] Added to `src/contexts/index.tsx` barrel export
- [ ] Provider wrapped in `App.tsx` or `main.tsx`
- [ ] Test file created in `src/__tests__/contexts/`

### 3. Integration

Wrap the app in `src/main.tsx` or `src/App.tsx`:

```tsx
<{ContextName}Provider>
  <App />
</{ContextName}Provider>
```

### 4. Quality Gates

```bash
npx tsc --noEmit && npx eslint . && npx prettier --check .
```
