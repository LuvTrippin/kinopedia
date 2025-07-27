/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_API_BASE_URL: string;
    readonly VITE_TMDB_API_KEY: string;
    readonly VITE_TMDB_IMAGE_BASE_URL: string;
    readonly VITE_APPWRITE_PROJECT_ID: string;
    readonly VITE_APPWRITE_ENDPOINT: string;
    readonly VITE_APPWRITE_DATABASE_ID: string;
    readonly VITE_APPWRITE_COLLECTION_ID: string;
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}