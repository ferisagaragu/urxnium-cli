import { Command } from '../../core/interface/command';
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

export class MicroserviceMock extends Command {

  app = express();

  constructor() {
    super();

    this.app.set('port', 7000);
    this.app.set('json spaces', 2)
    this.app.use(morgan('dev'));
    this.app.use(cors({ origin: '*' }));
    this.app.use(express.urlencoded({ extended:false }));
    this.app.use(express.json());
  }

  initMicroserviceServer(): void {
    if (!this.file.exist('./urx-microservices-mock.json')) {
      this.print.information(
        `Please create the file 'urx-microservices-mock.json' with that structure
[
  {
    "type": "get | post | put | delete | patch",
    "path": "any-path",
    "status": 200,
    "response": { }
  }
]
        `
      );
      return;
    }

    const data = JSON.parse(this.file.readFile('./urx-microservices-mock.json'));

    data.forEach((service: any) => {
      console.log(`${service.type.toUpperCase().green} ${service.path}`)

      if (service.type === 'get') {
        this.app.get(service.path, (req: any, res: any) => {
          res.status(service.status).send(service.response);
        });
      }

      if (service.type === 'post') {
        this.app.post(service.path, (req: any, res: any) => {
          res.status(service.status).send(service.response);
        });
      }

      if (service.type === 'put') {
        this.app.put(service.path, (req: any, res: any) => {
          res.status(service.status).send(service.response);
        });
      }

      if (service.type === 'delete') {
        this.app.delete(service.path, (req: any, res: any) => {
          res.status(service.status).send(service.response);
        });
      }

      if (service.type === 'patch') {
        this.app.patch(service.path, (req: any, res: any) => {
          res.status(service.status).send(service.response);
        });
      }
    });

    this.app.listen(
      this.app.get('port'), () => {
        console.log(`Server listening on port ${'7000'.cyan}`);
      }
    );
  }

}
