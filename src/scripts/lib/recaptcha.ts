export interface Recaptcha {
    ready: (callback: () => any) => any;
    execute: (key: string, options: { action: string }) => Promise<string>;
}