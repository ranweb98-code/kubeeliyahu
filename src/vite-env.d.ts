/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** Optional full URL if the contact API is hosted elsewhere while the UI is on another domain */
  readonly VITE_CONTACT_API_URL?: string;
}
