#!/usr/bin/env node
import { CommanderSystem } from './core/system/commander.system';
import { AddServiceSpringBoot } from './process/spring-boot/add-service.spring-boot';
import { ProtectSpringBoot } from './process/spring-boot/protect.spring-boot';
import { AddDocumentationSpringBoot } from './process/spring-boot/add-documentation.spring-boot';
import { AuthMock } from './process/mock/auth.mock';
import { AndroidIonicBuild } from './process/build/android-ionic.build';
import { ExecEnvironment } from './process/environment/exec.environment';
import { ProtectMicroserviceSpringBoot } from './process/spring-boot/protect-microservice.spring-boot';
import { MicroserviceMock } from './process/mock/microservice.mock';

const command = new CommanderSystem();

//commands for spring boot kotlin with uranium-kotlin
command.execute('sbk add service', 'sbk add s').then(() => {
  new AddServiceSpringBoot().generateService();
});

command.execute('sbk add documentation', 'sbk add d').then(() => {
  new AddDocumentationSpringBoot().printDocumentation();
});

command.execute('sbk protect', 'sbk p').then(() => {
  new ProtectSpringBoot().protectProject();
});

command.execute('sbk protect --microservice', 'sbk p --m').then(() => {
  new ProtectMicroserviceSpringBoot().protectProject();
});
//=================================================================================

//commands for ionic capacitor android
command.execute('ica build', 'ica b').then(() => {
  new AndroidIonicBuild().buildAndroidApk();
});
//=================================================================================


//util functions
command.execute('mock auth', 'mock a').then(() => {
  new AuthMock().initAuthServer();
});

command.execute('mock microservices', 'mock m').then(() => {
  new MicroserviceMock().initMicroserviceServer();
});

command.execute('environment exec', 'e e').then(() => {
  new ExecEnvironment().initExecEnvironmentServer();
});
//=================================================================================

command.execute('help', 'h').then(() => {
  command.showHelp();
});

command.hasError();

/*
import { InitDoc } from './process/doc/init.doc';
import { AddSectionDoc } from './process/doc/add-section.doc';
import { AddDocumentDoc } from './process/doc/add-document.doc';
import { StartDoc } from './process/doc/start.doc';
import { AddCredentialDoc } from './process/doc/add-credential.doc';
 */

//java -jar sonar_quality.jar \"http://localhost:9000\" \"festus-invitation\" \"f9a0ee4fc10a30770c82314092c4b03d3e871ba2\" \"src/assets/quantity\" \"src/app/core/data\"


/*
command.execute('doc init').then(() => {
  new InitDoc().init();
});

command.execute('doc start').then(() => {
  new StartDoc().start();
});

command.execute('doc dist').then(() => {
  new StartDoc().dist();
});

command.execute('doc publish').then(() => {
  new StartDoc().publish();
});

command.execute('doc add section', 'doc add s').then(() => {
  new AddSectionDoc().addSection();
});

command.execute('doc add document', 'doc add d').then(() => {
  new AddDocumentDoc().addDocument();
});

command.execute('doc add credential', 'doc add c').then(() => {
  new AddCredentialDoc().addCredential();
});
*/


/*
const system = new System();
const print = new Print();

if (system.getParameters().length > 0) {

  switch(system.getParameters()[0]) {
    case 'start':
      const base = system.getParameters()[1]?.replace('--base=', '').replace('--out=', '');
      const out = system.getParameters()[2]?.replace('--out=', '').replace('--base=', '');

      const transcompiler = new Transcompiler();
      transcompiler.compileWatch(
        path.resolve(base ? base : 'src'),
        path.resolve(out ? out : 'dist')
      );
    break;

    case 'doc':
      switch (system.getParameters()[1]) {
        case 'sad':
          new InitDoc().init();
        break;

        case 'start':
          if (system.getParameters().length > 2) {
            new StartDoc().start(
              Number.parseInt(
                system.getParameters()[2]
                  .replace('--port=', '')
              )
            );
          } else {
            new StartDoc().start();
          }
        break;

        case 'dist':
          new StartDoc().dist();
        break;

        case 'add':
          if (system.getParameters().length > 2) {
            const param = system.getParameters()[2];

            switch (param) {
              case 'section':
              case 's':
                new AddSectionDoc().addSection();
              break;

              case 'document':
              case 'd':
                new AddDocumentDoc().addDocument();
              break;

              case 'credential':
              case 'c':
                new AddCredentialDoc().addCredential();
              break;

              default:
                print.error('command was not fount');
            }
          } else {
            print.error('command was not fount');
          }
        break;

        default:
          print.error('command was not fount');
      }
    break;



    /*case 'jar-server':
      const file = new File();
      const registry = JSON.parse(file.readFile(path.resolve('./registry.json')));

      chokidar.watch(path.resolve('./server')).on('change', (pathName) => {
        runJars(registry, pathName);
      }).on('add', (pathName) => {
        runJars(registry, pathName);
      });
    break;*/
 // }

//}

/*const runJars = (registry: any, pathName: string) => {
  (async () => {
    await delay(5000);
    if(registry[path.basename(pathName)]) {
      console.log('init' + ` ${path.basename(pathName)}`.cyan);

      exec(`cd server && ${registry[path.basename(pathName)].command}`, (error, stdout, stderr) => {

        if (error) {
          console.log(`${ path.basename(pathName) } stop process`.red);
          return;
        }

        if (stderr) {
          console.log(`stdout: ${ stdout }`);
          return;
        }

        console.log(`stderr: ${ stderr }`);
      });
    }
  })();
}*/
