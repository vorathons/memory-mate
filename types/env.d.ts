// types/env.d.ts
interface ImportMetaEnv {
  readonly VITE_API_KEY: string;
  readonly VORATHON_API_KEY: string;
  readonly [key: string]: string | undefined;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
