export const userCredentialsKeys = {
  all: ['userCredentials'] as const,
  current: () => [...userCredentialsKeys.all, 'current'] as const,
} as const;
