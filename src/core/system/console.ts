import { execSync } from 'child_process';

export class Console {

  exe(command: string): Buffer {
    return execSync(command);
  }

}