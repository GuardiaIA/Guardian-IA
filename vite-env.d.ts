// FIX: Removed the reference to "vite/client" to resolve the "Cannot find type definition file" error.
// The project does not appear to use Vite-specific client features (like import.meta.env) that require these typings.

// Augment the NodeJS.ProcessEnv interface to include API_KEY.
// This avoids redeclaring the 'process' variable, which can conflict
// with global types provided by @types/node.
declare namespace NodeJS {
  interface ProcessEnv {
    API_KEY: string
  }
}
