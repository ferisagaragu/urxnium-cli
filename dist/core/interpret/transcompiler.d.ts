export declare class Transcompiler {
    private file;
    private print;
    compile(base: string, out: string): void;
    compileWatch(base: string, out: string): void;
    transform(source: string, baseDir: string, distDir: string): void;
    private transformTypeScript;
    private transformTypeScriptD;
}
