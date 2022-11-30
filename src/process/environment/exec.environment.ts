import { Command } from '../../core/interface/command';
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

export class ExecEnvironment extends Command {

  app = express();

  constructor() {
    super();

    this.app.set('port', 9999);
    this.app.set('json spaces', 2)
    this.app.use(morgan('dev'));
    this.app.use(cors({ origin: '*' }));
    this.app.use(express.urlencoded({ extended:false }));
    this.app.use(express.json());
  }

  initExecEnvironmentServer(): void {
    this.app.get('/run/:process', (req: any, res: any) => {
      const process = JSON.parse(this.file.readFile('./urx-environment.json'))[req.params['process']];
      let out = '';

      process.steps.forEach((data: string) => {
        try {
          out += `=====PROCESS ${data}=====\n` + this.console.exe(`cd ${process.path} && ${data}`).toString();
        } catch (e) {
          res.status(500).send(e);
        }
      });

      res.status(200).send(out);
    });

    this.app.post('/run', (req: any, res: any) => {
      const process = req.body;
      let out = '';

      process.steps.forEach((data: string) => {
        try {
          out += `=====PROCESS ${data}=====\n` + this.console.exe(`cd ${process.path} && ${data}`).toString();
        } catch (e) {
          res.status(500).send(e);
        }
      });

      res.status(200).send(out);
    });

    this.app.listen(
      this.app.get('port'), () => {
        console.log(`Server listening on port ${'9999'.cyan}`);
        console.log(`call GET: curl "http://localhost:9999/run"`);
        console.log(
          `And generate on your environment a new file with that structure and this name:`
          + ' urx-environment.json'.magenta
        );
        console.log('\n\n' +
          '{\n'.green +
          '  "helper-boy-mobile": '.cyan + '{\n'.green +
          '    "path": '.cyan + '"C:\\\\TeamCity\\\\buildAgent\\\\work\\\\d7d46d30bee5a868\\\\android",\n' +
          '    "steps": '.cyan + '[\n'.green +
          '      "gradlew assembleDebug"\n' +
          '    ]\n'.green +
          '  }\n'.green +
          '}'.green
        );

        console.log(`\n\ncall POST: curl "http://localhost:9999/run"`);
        console.log('And send the body as urx-environment.json content');
      }
    );
  }

}
