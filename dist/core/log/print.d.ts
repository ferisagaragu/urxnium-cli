import 'colors';
export declare class Print {
    private file;
    title(version: string, subTitle: string): void;
    success(text: string): void;
    warning(text: string): void;
    error(text: string): void;
    information(text: string): void;
    convertCommand(text: string): string;
    formatText(help: Array<any>): Array<any>;
    private convertText;
    private setColor;
    private generateSpaces;
}
