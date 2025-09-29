
/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly REACT_APP_API_URL: string;
    // add other env vars here
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}
