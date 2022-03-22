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
      this.convertText(text)
    );
  }

  warning(text: string): void {
    console.log(
      '⚠ '.yellow.bold +
      this.convertText(text)
    );
  }

  error(text: string): void {
    console.log(
      '✘ '.red.bold +
      this.convertText(text)
    );
  }

  information(text: string): void {
    console.log(
      'i '.cyan.bold +
      this.convertText(text)
    );
  }

  convertCommand(text: string): string {
    let out = '';
    let color = 0;

    for (let i = 0; i < text.length; i++) {
      if (text.charAt(i) === ' ') {
        color++;
      }

      out += this.setColor(text.charAt(i), color);
    }

    return out;
  }

  formatText(help: Array<any>): Array<any> {
    const commands: Array<string> = [];
    let length = 0;

    help.forEach(item => {
      if (item.shortRegex) {
        if (length < item.shortRegex.length) {
          length = item.shortRegex.length;
        }
      }

      if (length < item.regex.length) {
        length = item.regex.length;
      }
    });

    return help.map(item => ({
      regex: item.regex + this.generateSpaces(
        length - item.regex.length
      ),
      shortRegex: item.shortRegex ? item.shortRegex +
        this.generateSpaces(
          length - item.shortRegex.length
        ) : null
    }));
  }

  private convertText(text: string): string {
    let out = '';
    let command = false;
    let ref = false;

    for (let i = 0; i < text.length; i++) {
      if (text.charAt(i) === '[') {
        command = true;
      }

      if (text.charAt(i) === '{') {
        ref = true;
      }

      if (command) {
        out += `${text.charAt(i)}`.cyan.bold;
      } else if (ref) {
        out += `${text.charAt(i)}`.blue.bold;
      } else {
        out += `${text.charAt(i)}`.reset;
      }

      if (text.charAt(i) === '}') {
        ref = false;
      }

      if (text.charAt(i) === ']') {
        command = false;
      }
    }

    return out;
  }

  private setColor(letter: string, color: number): any {
    switch (color) {
      case 0: return letter.yellow.bold;
      case 1: return letter.blue.bold;
      case 2: return letter.green.bold;
      case 3: return letter.gray.bold;
      case 4: return letter.magenta.bold;
      case 5: return letter.cyan.bold;
    }

    return letter;
  }

  private generateSpaces(spaceNumber: number): string {
    let out = '';

    for (let i = 0; i < spaceNumber; i++) {
      out += ' ';
    }

    return out + '   ';
  }

}
