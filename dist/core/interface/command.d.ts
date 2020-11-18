import { File } from '../io/file';
import { Print } from '../log/print';
import { TargzIo } from '../io/targz.io';
interface Inquirer {
    prompt: Function;
}
export declare class Command {
    file: File;
    print: Print;
    tarzgIo: TargzIo;
    inquirer: Inquirer;
    constructor();
    openBrowser(host: string): void;
}
export {};
