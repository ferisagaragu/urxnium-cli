import { Command } from '../../core/interface/command';
import { SpringBootShared } from './shared/spring-boot.shared';
import { BASE_DIR, BASE_DIR_RESOURCES } from './const/spring-boot.const';
import {
  beanConfigSpringBootMicroservice,
  dependencyTip, iAuthProxySpringBootMicroservice,
  springBootConfigProperties,
  springBootConfigPropertiesDev,
  webSecurityConfigSpringBootMicroservice
} from '../../assets/data/spring-boot.data';

export class ProtectMicroserviceSpringBoot extends Command {

  private springBootShared: SpringBootShared;

  constructor() {
    super();

    this.springBootShared = new SpringBootShared();
  }

  protectProject(): void {
    this.inquirer.prompt([
      {
        name: 'confirmResp',
        type: 'confirm',
        message: 'you are about to put security in your project do you want to continue?',
      }
    ]).then((resp: any) => {
      if (resp.confirmResp && this.springBootShared.getRootFolder()) {

        const propertiesPath = `${BASE_DIR_RESOURCES}/application.properties`;
        const propertiesPathDev = `${BASE_DIR_RESOURCES}/application-dev.properties`;
        const webSecurityConfig = `${this.getAbsolutePath()}/security/WebSecurityConfig.kt`;
        const beanConfig = `${this.getAbsolutePath()}/config/BeanConfig.kt`;
        const iAuthProxy = `${this.getAbsolutePath()}/security/IAuthProxy.kt`;

        if (!this.file.readFile(propertiesPath).includes('app.auth.jwt-secret')) {
          this.file.writeFile(
            propertiesPath,
            springBootConfigProperties()
          );

          this.print.success(`application.properties was configured successfully`);
          this.print.information(
            `application.properties check configs to modify application name, language, and frond-end path`
          );
        } else {
          this.print.warning(`application.properties contains needed configurations`);
        }

        if (!this.file.exist(propertiesPathDev)) {
          this.file.writeFile(propertiesPathDev, '');
          this.print.success('application-dev.properties was created successfully')
        }

        if (!this.file.readFile(propertiesPathDev).includes('app.auth.jwt-secret')) {
          this.file.writeFile(
            propertiesPathDev,
            springBootConfigPropertiesDev()
          );

          this.print.success(`application-dev.properties was configured successfully`);
          this.print.information(
            `application-dev.properties check configs to modify application name, language, and frond-end path`
          );
        } else {
          this.print.warning(`application-dev.properties contains needed configurations`);
        }

        if (!this.file.exist(webSecurityConfig)) {
          this.file.writeFile(
            webSecurityConfig,
            webSecurityConfigSpringBootMicroservice(this.springBootShared.getRootFolder())
          );

          this.print.success(`{WebSecurityConfig} was create successfully`);
        } else {
          this.print.warning(`{WebSecurityConfig} is already exist`);
        }

        if (!this.file.exist(beanConfig)) {
          this.file.writeFile(
            beanConfig,
            beanConfigSpringBootMicroservice(this.springBootShared.getRootFolder())
          );

          this.print.success(`{Bean} was create successfully`);
        } else {
          this.print.warning(`{Bean} is already exist`);
        }

        if (!this.file.exist(iAuthProxy)) {
          this.file.writeFile(
            iAuthProxy,
            iAuthProxySpringBootMicroservice(this.springBootShared.getRootFolder())
          );

          this.print.success(`{Bean} was create successfully`);
        } else {
          this.print.warning(`{Bean} is already exist`);
        }

        this.print.information(dependencyTip());
      }
    });
  }

  private getAbsolutePath() {
    return `${BASE_DIR}/${this.springBootShared.getRootFolder('/')}`;
  }

}