import fs, { readFileSync, writeFileSync, existsSync } from 'fs';
import { removeSync } from 'fs-extra';
import path from 'path';
import mkdirp from 'mkdirp';
import chokidar from 'chokidar';

export class File {

  readFile(path: string): string {
    return readFileSync(path).toString();
  }

  copyFile(origin: string, destiny: string): void {
    return fs.copyFileSync(origin, destiny);
  }

  readFiles(dir: string): Array<string> {
    return this.readFilesRecursive(dir, []);
  }

  readFolder(dir: string): Array<string> {
    return this.readFolderRecursive(dir, []);
  }

  writeFile(file: string, data: string): void {
    try {
      mkdirp.sync(path.dirname(file));
      writeFileSync(file, data);
    } catch (e) {
      console.error(e.toString())
    }
  }

  writeFolder(file: string): void {
    mkdirp.sync(path.dirname(file));
  }

  clearFolder(dir: string) {
    const files = this.readFiles(dir);
    const folders = this.readFolder(dir);

    files.forEach(file => {
      if ((!file.includes('package.json')) && (!file.includes('node_modules'))) {
        removeSync(file);
      }
    });

    folders.forEach(folder => {
      if ((!folder.includes('package.json')) && (!folder.includes('node_modules'))) {
        removeSync(folder);
      }
    })
  }

  exist(path: string): boolean {
    return existsSync(path);
  }

  watch(
    dir: string,
    onChange: Function,
    onAdd: Function,
    onUnLink: Function
  ): void {
    chokidar.watch(dir).on('change', (path) => {
      onChange(path);
    }).on('add', (resp) => {
      if (!this.includesInPath(resp, dir)) {
        onAdd(resp);
      }
    }).on('unlink', (resp) => {
      onUnLink(resp);
    });
  }

  private includesInPath(resp: string, dir: string) {
    let out = false;

    this.readFiles(dir).forEach(item => {
      out = out || item.includes(resp);
    });
    return out;
  }

  private readFilesRecursive(dir: string, out: Array<string>): Array<string> {
    const folder = fs.readdirSync(dir);

    folder.forEach(subFolder => {
      const folderPath = path.resolve(`${dir}/${subFolder}`);
      const isDirectory = fs.statSync(folderPath).isDirectory();

      if (isDirectory) {
        this.readFilesRecursive(path.resolve(folderPath), out);
      } else {
        out.push(folderPath);
      }
    });

    return out;
  }

  private readFolderRecursive(dir: string, out: Array<string>): Array<string> {
    const folder = fs.readdirSync(dir);

    folder.forEach(subFolder => {
      const folderPath = path.resolve(`${dir}/${subFolder}`);
      const isDirectory = fs.statSync(folderPath).isDirectory();

      if (isDirectory) {
        this.readFolderRecursive(path.resolve(folderPath), out);
        out.push(folderPath);
      }
    });

    return out;
  }

}
