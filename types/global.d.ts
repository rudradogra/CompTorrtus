// Global type declarations
declare global {
  interface Window {
    fbq: (command: string, eventName: string, parameters?: any) => void;
    _fbq: any;
  }
}

export {};