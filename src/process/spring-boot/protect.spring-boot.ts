import { Command } from '../../core/interface/command';
import { BASE_DIR, BASE_DIR_RESOURCES } from './const/spring-boot.const';
import { SpringBootShared } from './shared/spring-boot.shared';
import {
	beanConfigSpringBoot,
	dependencyTip,
	iAuthRepositorySpringBoot,
	springBootConfigProperties, springBootConfigPropertiesDev,
	springBootUserEntity, userDetailsServiceImplSpringBoot, userPrincipleSpringBoot,
	webSecurityConfigSpringBoot
} from '../../assets/data/spring-boot.data';

export class ProtectSpringBoot extends Command {

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
				//const entityPath = `${this.getAbsolutePath()}/entity/.kt`;
				const propertiesPath = `${BASE_DIR_RESOURCES}/application.properties`;
				const propertiesPathDev = `${BASE_DIR_RESOURCES}/application-dev.properties`;
				const iAuthRepository = `${this.getAbsolutePath()}/security/IAuthRepository.kt`;
				const userEntity = `${this.getAbsolutePath()}/entity/User.kt`;
				const webSecurityConfig = `${this.getAbsolutePath()}/security/WebSecurityConfig.kt`;
				const userDetailsServiceImpl = `${this.getAbsolutePath()}/security/UserDetailsServiceImpl.kt`;
				const userPrinciple = `${this.getAbsolutePath()}/security/UserPrinciple.kt`;
				const bean = `${this.getAbsolutePath()}/config/BeanConfig.kt`;

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

				if (!this.file.exist(iAuthRepository)) {
					this.file.writeFile(
						iAuthRepository,
						iAuthRepositorySpringBoot(this.springBootShared.getRootFolder())
					);

					this.print.success(`{IAuthRepository} was create successfully`);
				} else {
					this.print.warning(`{IAuthRepository} is already exist`);
				}

				if (!this.file.exist(userEntity)) {
					this.file.writeFile(
						userEntity,
						springBootUserEntity(this.springBootShared.getRootFolder())
					);

					this.print.success(`{User Entity} was create successfully`);
				} else {
					this.print.warning(`{User Entity} is already exist`);
				}

				if (!this.file.exist(webSecurityConfig)) {
					this.file.writeFile(
						webSecurityConfig,
						webSecurityConfigSpringBoot(this.springBootShared.getRootFolder())
					);

					this.print.success(`{WebSecurityConfig} was create successfully`);
				} else {
					this.print.warning(`{WebSecurityConfig} is already exist`);
				}

				if (!this.file.exist(userDetailsServiceImpl)) {
					this.file.writeFile(
						userDetailsServiceImpl,
						userDetailsServiceImplSpringBoot(this.springBootShared.getRootFolder())
					);

					this.print.success(`{UserDetailsServiceImpl} was create successfully`);
				} else {
					this.print.warning(`{UserDetailsServiceImpl} is already exist`);
				}

				if (!this.file.exist(userPrinciple)) {
					this.file.writeFile(
						userPrinciple,
						userPrincipleSpringBoot(this.springBootShared.getRootFolder())
					);

					this.print.success(`{UserPrinciple} was create successfully`);
				} else {
					this.print.warning(`{UserPrinciple} is already exist`);
				}

				if (!this.file.exist(bean)) {
					this.file.writeFile(
						bean,
						beanConfigSpringBoot(this.springBootShared.getRootFolder())
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
