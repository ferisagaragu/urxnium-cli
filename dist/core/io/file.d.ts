export declare class File {
    readFile(path: string): string;
    readFiles(dir: string): Array<string>;
    readFolder(dir: string): Array<string>;
    writeFile(file: string, data: string): void;
    clearFolder(dir: string): void;
    exist(path: string): boolean;
    watch(dir: string, onChange: Function, onAdd: Function, onUnLink: Function): void;
    private includesInPath;
    private readFilesRecursive;
    private readFolderRecursive;
}
