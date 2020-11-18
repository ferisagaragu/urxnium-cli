import { Command } from '../../core/interface/command';
export declare class StartDoc extends Command {
    private docShared;
    constructor();
    start(port?: number): void;
    dist(): void;
    private decompressApplication;
    private watch;
    private compileJson;
    private setUrxdoc;
    private compileSrc;
    private getJsonFile;
}
