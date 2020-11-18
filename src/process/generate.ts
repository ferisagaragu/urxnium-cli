import { File } from "../core/io/file";
import { Print } from "../core/log/print";
import { System } from "../core/system/system";

export class Generate {

  private file = new File();
  private print = new Print();
  private system = new System();
  private projectType: string;

  constructor() {
    this.projectType = this.system.getProjectType();
  }

  start() {
    const packageJSON = this.system.getPackageJSON();
    this.print.title(packageJSON.version, this.projectType);
  }

}