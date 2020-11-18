import { File } from '../io/file';
import { Print } from '../log/print';
import { TargzIo } from '../io/targz.io';
export declare class Command {
    file: File;
    print: Print;
    tarzgIo: TargzIo;
    constructor();
}
