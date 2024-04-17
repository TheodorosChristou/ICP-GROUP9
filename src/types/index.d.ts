export{}

declare global {
    interface Window {
        workbox: typeof import('workbox-window');
    }
}