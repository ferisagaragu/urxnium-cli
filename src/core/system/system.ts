import { File } from '../io/file';
import path from 'path';

export class System {

  private file = new File();

  getParameters(): Array<string> {
    const params: Array<string> = process.argv;
    const paramsOut: Array<string> = [];
  
    if (params.length > 2) {
      params.forEach((param: string, index: number) => {
        if (index > 1) {
          paramsOut.push(param);
        }
      });
    } 
  
    return paramsOut;
  }

  getProjectType() {
    try {
      const packageJSON = 
        JSON.parse(this.file.readFile('package.json'));
      
      if (packageJSON.urxnium) {
        return packageJSON.urxnium;
      }
    } catch(e) {
      return 'default';
    }

    return 'default';
  }

  getPackageJSON(): any {
    const packageJSON = path.resolve(__dirname, '../../../package.json');
    const data = this.file.readFile(packageJSON);
    return JSON.parse(data);
  }

}