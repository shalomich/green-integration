import {
  createContext, type FC, type PropsWithChildren, useContext, useMemo, useState,
} from 'react';

type NewChatContextValue = Readonly<{

  /** Phone number digits of the chat that is not created yet, if any. */
  newChatPhone: string | null;

  /** Set phone number digits of the chat that is not created yet. */
  setNewChatPhone: (phone: string | null) => void;
}>;

const NewChatContext = createContext<NewChatContextValue | null>(null);

/** Keeps the phone number of the chat opened by `/chat/new`. */
export const NewChatProvider: FC<PropsWithChildren> = ({ children }) => {
  const [newChatPhone, setNewChatPhone] = useState<string | null>(null);
  const value = useMemo(() => ({ newChatPhone, setNewChatPhone }), [newChatPhone]);

  return <NewChatContext.Provider value={value}>{children}</NewChatContext.Provider>;
};

/** Get the new chat context. */
export function useNewChat(): NewChatContextValue {
  const context = useContext(NewChatContext);
  if (context == null) {
    throw new Error('useNewChat must be used within NewChatProvider');
  }
  return context;
}
