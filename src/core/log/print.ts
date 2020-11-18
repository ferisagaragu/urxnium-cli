import path from 'path';
import { File } from '../io/file';
import 'colors';

export class Print {

  private file = new File();

  title(version: string, subTitle: string): void {
    const logoPath = path.resolve(__dirname, '../../assets/graphic/logo.txt');
    const logo = this.file.readFile(logoPath);
    console.log(logo.magenta);
    console.log(`version ${version}`.green.bold , `[${subTitle}]`.blue.bold);
  }

  success(text: string): void {
    console.log(
      '✓ '.green.bold +
      text
    );
  }

  warning(text: string): void {
    console.log(
      '⚠ '.yellow.bold +
      text
    );
  }

  error(text: string): void {
    console.log(
      '✘ '.red.bold +
      text
    );
  }

  information(text: string): void {
    console.log(
      'i '.cyan.bold +
      text
    );
  }

}
