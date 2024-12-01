declare module 'turndown' {
    interface TurndownOptions {
        headingStyle?: 'setext' | 'atx';
        bulletListMarker?: '-' | '+' | '*';
        codeBlockStyle?: 'indented' | 'fenced';
        // Add other options as needed
    }

    class TurndownService {
        constructor(options?: TurndownOptions);
        turndown(html: string): string;
    }
    export default TurndownService;
}