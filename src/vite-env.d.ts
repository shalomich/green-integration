// We have to use 'interface' here because 'type' doesn't support declaration merging.
// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
interface ImportMeta {

  /** Contains application environment data. */
  readonly env: ImportMetaEnv;
}

type ImportMetaEnv = Readonly<{

  /** Api base url. */
  VITE_API_URL: string;

  // more env variables here...
}>;
