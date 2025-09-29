/// <reference types="vite/client" />

// FIX: Augment the NodeJS.ProcessEnv interface to include API_KEY.
// This avoids redeclaring the 'process' variable, which can conflict
// with global types provided by @types/node, resolving the "Cannot
// redeclare block-scoped variable" error. This should also resolve
// the issue with vite/client types not being found.
declare namespace NodeJS {
  interface ProcessEnv {
    API_KEY: string
  }
}
