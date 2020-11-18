import { File } from "../io/file";
import typescript, { ScriptTarget, ModuleKind, JsxEmit } from 'typescript';
import path from 'path';
import { Print } from '../log/print';
import chokidar from 'chokidar';

export class Transcompiler {

  private file = new File();
  private print = new Print();

  compile(base: string, out: string): void {
    const listFiles = this.file.readFiles(base);
    let error = false;

    this.file.clearFolder(out);
    console.log(`Out folder was cleaned`.gray);

    listFiles.forEach(file => {
      try { 
        this.transform(file, base, out);
      } catch (e) {
        error = true;
      }
    });

    if (error) {
      console.log('Not compiled'.red);
    } else {
      console.log('Compiled successfully'.green);
    }
  }

  compileWatch(base: string, out: string): void {
    const files = this.file.readFiles(base);
    let i = 1;
    let showMessage = false;

    chokidar.watch(base).on('change', (path) => { 
      try { 
        this.transform(path, base, out);
        console.log('Compiled successfully'.green);
        console.log(`Watch for changes in { ${base} }...`.gray);
      } catch (e) {
        console.log('Not compiled'.red);
      }
    }).on('add', (path, stats) => {
      try { 
        this.transform(path, base, out);

        if (showMessage) {
          console.log('Compiled successfully'.green);
          console.log(`Watch for changes in { ${base} }...`.gray);
        }
      } catch (e) {
        console.log('Not compiled'.red);
      }

      if (i === files.length) {
        console.log('Compiled successfully'.green);
        console.log(`Watch for changes in { ${base} }...`.gray);
        showMessage = true;
      }

      i++;
    }).on('unlink', () => {
      this.compile(base, out);
      console.log(`Watch for changes in { ${base} }...`.gray);
    });
  }
 
  transform(source: string, baseDir: string, distDir: string): void {
    if (source.includes('.ts')) {
      this.transformTypeScript(source.toString(), baseDir, distDir);
    } else {
      const data = this.file.readFile(source);
      this.file.writeFile(source.replace(baseDir, distDir), data);
      console.log('File { ' + path.basename(source).magenta.bold + ' }' + ' was copied success'.green);
    }
  }


  //TypeScript
  private transformTypeScript(source: string, baseDir: string, distDir: string): void {
    try {
      const fileData = this.file.readFile(source);
      const configTs = {
        target: ScriptTarget.ES2016,
        module: ModuleKind.CommonJS,
        lib: [ 'dom', 'es6' ],
        jsx: JsxEmit.React,
        declaration: true,
        removeComments: true,
        strict: true,
        esModuleInterop: true
      };
  
      const file = typescript.transpile(fileData, configTs);
      this.file.writeFile(source.replace(baseDir, distDir).replace('.tsx', '.ts').replace('.ts', '.js'), file);
      console.log('File { ' + path.basename(source).yellow.bold + ' }' + ' was compiled success'.green);

      const fileType = this.transformTypeScriptD(source, configTs);
      this.file.writeFile(source.replace(baseDir, distDir).replace('.tsx', '.ts').replace('.ts', '.d.ts'), fileType);
      console.log('File { ' + path.basename(source.replace('.ts', '.d.ts')).cyan.bold + ' }' + ' was created success'.green);

    } catch (e) {
      this.print.error('Error to compile typescript');
      throw e;
    }
  }

  private transformTypeScriptD(filePath: string, options: typescript.CompilerOptions): string {
    const fileNames = [ filePath ];
    
    const createdFiles: any = {}
    const host = typescript.createCompilerHost(options);
    host.writeFile = (fileName: string, contents: string) => createdFiles[path.basename(fileName)] = contents;
    
    const program = typescript.createProgram(fileNames, options, host);
    program.emit();
    return createdFiles[path.basename(filePath.replace('.ts', '.d.ts'))];
  }

}