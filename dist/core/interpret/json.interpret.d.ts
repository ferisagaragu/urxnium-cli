export declare class JsonInterpret {
    private file;
    private print;
    private process;
    constructor();
    convert(): void;
    createJsonOut(): any;
    readJson(jsonPath: string): any;
    isFilePath(path: string): boolean;
    startServer(): void;
}
