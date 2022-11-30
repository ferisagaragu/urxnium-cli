export const springBootEntity = (packagePath: string, name: string) => {
  return `package ${packagePath}.entity

import javax.persistence.Entity
import javax.persistence.GeneratedValue
import javax.persistence.GenerationType
import javax.persistence.Id
import javax.persistence.Table

import java.util.UUID

@Entity
@Table(name = "${name.toLowerCase()}s")
class ${name}(
\t@Id
\t@GeneratedValue(strategy = GenerationType.AUTO)
\tvar uuid: UUID
)
`;
}

export const springBootIService = (packagePath: string, name: string, services: Array<string>) => {
	return `package ${packagePath}.service.\`interface\`

import org.springframework.http.ResponseEntity

import org.pechblenda.service.Request

import java.util.UUID

interface I${name}Service {
${
		services.map(service => {
			switch (service) {
				case 'get': return `\tfun findAll${name}sByUuid(${name.toLowerCase()}Uuid: UUID): ResponseEntity<Any>\n`;
				case 'post': return `\tfun create${name}(request: Request): ResponseEntity<Any>\n`;
				case 'put': return `\tfun update${name}(request: Request): ResponseEntity<Any>\n`;
				case 'patch': return `\tfun set${name}(request: Request): ResponseEntity<Any>\n`;
				case 'delete': return `\tfun delete${name}(${name.toLowerCase()}Uuid: UUID): ResponseEntity<Any>\n`;
				default: return '';
			}	
		}).join('').slice(0, -1)
}
}
`;
}

export const springBootService = (packagePath: string, name: string, services: Array<string>) => {
	return `package ${packagePath}.service

import org.springframework.http.ResponseEntity
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional

import org.pechblenda.service.Request
import org.pechblenda.service.Response
import ${packagePath}.repository.I${name}Repository
import ${packagePath}.service.\`interface\`.I${name}Service

import java.util.UUID

@Service
class ${name}Service(
\tval ${name.toLowerCase()}Repository: I${name}Repository,
\tval response: Response
): I${name}Service {

${
  services.map(service => {
  	switch (service) {
		  case 'get': return `\t@Transactional(readOnly = true)
\toverride fun findAll${name}sByUuid(${name.toLowerCase()}Uuid: UUID): ResponseEntity<Any> {
\t\tTODO("Not yet implemented")
\t}\n\n`;
		  case 'post': return `\t@Transactional
\toverride fun create${name}(request: Request): ResponseEntity<Any> {
\t\tTODO("Not yet implemented")
\t}\n\n`;
		  case 'put': return `\t@Transactional
\toverride fun update${name}(request: Request): ResponseEntity<Any> {
\t\tTODO("Not yet implemented")
\t}\n\n`;
		  case 'patch': return `\t@Transactional
\toverride fun set${name}(request: Request): ResponseEntity<Any> {
\t\tTODO("Not yet implemented")
\t}\n\n`;
		  case 'delete': return `\t@Transactional
\toverride fun delete${name}(${name.toLowerCase()}Uuid: UUID): ResponseEntity<Any> {
\t\tTODO("Not yet implemented")
\t}\n\n`;
	  }
  }).join('').slice(0, -1)
}
}
`
}

export const springBootController = (packagePath: string, name: string, services: Array<string>, doc: boolean) => {
	return `package ${packagePath}.controller

import org.springframework.http.ResponseEntity
import org.springframework.web.server.ResponseStatusException
import org.springframework.web.bind.annotation.RequestMethod
import org.springframework.web.bind.annotation.CrossOrigin
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.RequestBody
${
		services.map(service => {
			switch (service) {
				case 'get': return 'import org.springframework.web.bind.annotation.GetMapping\n';
				case 'post': return 'import org.springframework.web.bind.annotation.PostMapping\n';
				case 'put': return 'import org.springframework.web.bind.annotation.PutMapping\n';
				case 'patch': return 'import org.springframework.web.bind.annotation.PatchMapping\n';
				case 'delete': return 'import org.springframework.web.bind.annotation.DeleteMapping\n';
			}
		}).join('')
}
import org.pechblenda.exception.HttpExceptionResponse
import org.pechblenda.service.Request${doc ? '\nimport org.pechblenda.doc.annotation.ApiDocumentation' : ''}
import ${packagePath}.service.\`interface\`.I${name}Service

import java.util.UUID

@CrossOrigin(methods = [
${
		services.map(service => {
			switch (service) {
				case 'get': return '\tRequestMethod.GET,\n';
				case 'post': return '\tRequestMethod.POST,\n';
				case 'put': return '\tRequestMethod.PUT,\n';
				case 'patch': return '\tRequestMethod.PATCH,\n';
				case 'delete': return '\tRequestMethod.DELETE,\n';
			}
		}).join('').slice(0, -2)
}
])
@RestController
@RequestMapping(name = "${name}", value = ["/rest/${name.toLowerCase()}s"])
class ${name}Controller(
\tprivate val ${name.toLowerCase()}Service: I${name}Service,
\tprivate val httpExceptionResponse: HttpExceptionResponse
) {

${
		services.map(service => {
			switch (service) {
				case 'get': return `\t@GetMapping(value = ["/{${name.toLowerCase()}Uuid}", ""])${doc ? `\n\t@ApiDocumentation(path = "doc/${name.toLowerCase()}/find-all-${name.toLowerCase()}s-by-uuid.json")` : ''}
\tfun findAll${name}sByUuid(
\t\t@PathVariable ${name.toLowerCase()}Uuid: UUID
\t): ResponseEntity<Any> {
\t\treturn try {
\t\t\t${name.toLowerCase()}Service.findAll${name}sByUuid(${name.toLowerCase()}Uuid)
\t\t} catch (e: ResponseStatusException) {
\t\t\thttpExceptionResponse.error(e)
\t\t}
\t}\n\n`;
				case 'post': return `\t@PostMapping${doc ? `\n\t@ApiDocumentation(path = "doc/${name.toLowerCase()}/create-${name.toLowerCase()}.json")` : ''}
\tfun create${name}(@RequestBody request: Request): ResponseEntity<Any> {
\t\treturn try {
\t\t\t${name.toLowerCase()}Service.create${name}(request)
\t\t} catch (e: ResponseStatusException) {
\t\t\thttpExceptionResponse.error(e)
\t\t}
\t}\n\n`;

				case 'put': return `\t@PutMapping${doc ? `\n\t@ApiDocumentation(path = "doc/${name.toLowerCase()}/update-${name.toLowerCase()}.json")` : ''}
\tfun update${name}(@RequestBody request: Request): ResponseEntity<Any> {
\t\treturn try {
\t\t\t${name.toLowerCase()}Service.update${name}(request)
\t\t} catch (e: ResponseStatusException) {
\t\t\thttpExceptionResponse.error(e)
\t\t}
\t}\n\n`;

				case 'patch': return `\t@PatchMapping${doc ? `\n\t@ApiDocumentation(path = "doc/${name.toLowerCase()}/set-${name.toLowerCase()}.json")` : ''}
\tfun set${name}(@RequestBody request: Request): ResponseEntity<Any> {
\t\treturn try {
\t\t\t${name.toLowerCase()}Service.set${name}(request)
\t\t} catch (e: ResponseStatusException) {
\t\t\thttpExceptionResponse.error(e)
\t\t}
\t}\n\n`;

				case 'delete': return `\t@DeleteMapping("/{${name.toLowerCase()}Uuid}")${doc ? `\n\t@ApiDocumentation(path = "doc/${name.toLowerCase()}/delete-${name.toLowerCase()}.json")` : ''}
\tfun delete${name}(
\t\t@PathVariable ${name.toLowerCase()}Uuid: UUID
\t): ResponseEntity<Any> {
\t\treturn try {
\t\t\t${name.toLowerCase()}Service.delete${name}(${name.toLowerCase()}Uuid)
\t\t} catch (e: ResponseStatusException) {
\t\t\thttpExceptionResponse.error(e)
\t\t}
\t}\n\n`;
				default: return '';
			}
		}).join('').slice(0, -1)
}
}
`;
}

export const springBootRepository = (packagePath: string, name: string) => {
	return `package ${packagePath}.repository

import ${packagePath}.entity.${name}

import org.springframework.data.jpa.repository.JpaRepository

import java.util.UUID

interface I${name}Repository: JpaRepository<${name}, UUID>
`;
}

export const springBootConfigProperties = () => {
	return "#App config\n" +
		"app.name=YOUR APP NAME\n" +
		"app.language=es or en\n" +
		"app.formal.language=true is normal and false is with Oops at start messages\n" +
		"app.user-avatar=gradient or material\n" +
		"app.host=http://localhost:5000\n" +
		"\n" +
		"#App doc\n" +
		"app.doc.title=YOUR DOCUMENTATION TITLE NAME\n" +
		"app.doc.description=YOUR REST DESCRIPTION\n" +
		"app.doc.icon-url=\n" +
		"app.doc.version=1.0.0\n" +
		"app.doc.credential.end-point=http://localhost:5000/rest/auth/sign-in\n" +
		"app.doc.credential.token-mapping=data.session.token\n" +
		"app.doc.credentials=[{\"name\": \"Root User\", \"userName\": \"fernnypay95\", \"password\": \"fernny27\"}]\n" +
		"\n" +
		"#JWT config\n" +
		"app.auth.jwt-secret=jwt@_/rest-secret#\n" +
		"app.auth.jwt-expiration=18000000\n" +
		"app.auth.front-base-url=http://localhost:4200/#/auth/sign-in\n" +
		"\n" +
		"#Gmail\n" +
		"app.mail.color=#000\n" +
		"app.mail.background=#2196F3\n" +
		"\n" +
		"#Data base config\n" +
		"spring.sql.init.platform=postgres\n" +
		"spring.datasource.driver-class-name=org.postgresql.Driver\n" +
		"\n" +
		"spring.datasource.url=jdbc:postgresql://YOUR_HOST/YOUR_DATABASE\n" +
		"spring.datasource.username=YOUR_USER_NAME\n" +
		"spring.datasource.password=YOUR_PASSWORD\n" +
		"\n" +
		"#Jpa daba base config\n" +
		"spring.jpa.database=POSTGRESQL\n" +
		"spring.jpa.show-sql=true\n" +
		"spring.jpa.generate-ddl=true\n" +
		"spring.jpa.properties.hibernate.jdbc.lob.non_contextual_creation=true\n" +
		"spring.jpa.database-platform=org.hibernate.dialect.PostgreSQLDialect\n" +
		"spring.jpa.hibernate.ddl-auto=update\n" +
		"\n" +
		"#storage\n" +
		"#storage.firebase.bucket=IF YOU HAVE YOUR BUCKET\n" +
		"#storage.firebase.service-account-key-path=YOUR SERVICE ACCOUNT KEY\n" +
		"#storage.firebase.base-path=YOUR BASE PATH TO UPDATE FILES\n" +
		"\n" +
		"#File max size\n" +
		"#spring.servlet.multipart.max-file-size=10MB\n" +
		"#spring.servlet.multipart.max-request-size=10MB\n";
}

export const springBootConfigPropertiesDev = () => {
	return "#Server config\n" +
		"server.port=5000\n" +
		"\n" +
		"#App config\n" +
		"app.name=YOUR APP NAME\n" +
		"app.language=es or en\n" +
		"app.formal.language=true is normal and false is with Oops at start messages\n" +
		"app.user-avatar=gradient or material\n" +
		"app.host=http://localhost:5000\n" +
		"\n" +
		"#App doc\n" +
		"app.doc.title=YOUR DOCUMENTATION TITLE NAME\n" +
		"app.doc.description=YOUR REST DESCRIPTION\n" +
		"app.doc.icon-url=\n" +
		"app.doc.version=1.0.0\n" +
		"app.doc.credential.end-point=http://localhost:5000/rest/auth/sign-in\n" +
		"app.doc.credential.token-mapping=data.session.token\n" +
		"app.doc.credentials=[{\"name\": \"Root User\", \"userName\": \"fernnypay95\", \"password\": \"fernny27\"}]\n" +
		"\n" +
		"#JWT config\n" +
		"app.auth.jwt-secret=jwt@_/rest-secret#\n" +
		"app.auth.jwt-expiration=18000000\n" +
		"app.auth.front-base-url=http://localhost:4200/#/auth/sign-in\n" +
		"\n" +
		"#Gmail\n" +
		"app.mail.color=#000\n" +
		"app.mail.background=#2196F3\n" +
		"\n" +
		"#Data base config\n" +
		"spring.sql.init.platform=postgres\n" +
		"spring.datasource.driver-class-name=org.postgresql.Driver\n" +
		"\n" +
		"spring.datasource.url=jdbc:postgresql://YOUR_HOST/YOUR_DATABASE\n" +
		"spring.datasource.username=YOUR_USER_NAME\n" +
		"spring.datasource.password=YOUR_PASSWORD\n" +
		"\n" +
		"#Jpa daba base config\n" +
		"spring.jpa.database=POSTGRESQL\n" +
		"spring.jpa.show-sql=true\n" +
		"spring.jpa.generate-ddl=true\n" +
		"spring.jpa.properties.hibernate.jdbc.lob.non_contextual_creation=true\n" +
		"spring.jpa.database-platform=org.hibernate.dialect.PostgreSQLDialect\n" +
		"spring.jpa.hibernate.ddl-auto=update\n" +
		"\n" +
		"#Print data information o console\n" +
		"logging.level.org.hibernate.SQL=debug\n" +
		"logging.level.org.springframework.web.servlet.mvc.method.annotation=trace\n" +
		"\n" +
		"#storage\n" +
		"#storage.firebase.bucket=IF YOU HAVE YOUR BUCKET\n" +
		"#storage.firebase.service-account-key-path=YOUR SERVICE ACCOUNT KEY\n" +
		"#storage.firebase.base-path=YOUR BASE PATH TO UPDATE FILES\n" +
		"\n" +
		"#File max size\n" +
		"#spring.servlet.multipart.max-file-size=10MB\n" +
		"#spring.servlet.multipart.max-request-size=10MB\n";
}

export const iAuthRepositorySpringBoot = (packagePath: string) => {
	return `package ${packagePath}.security

import java.util.Optional
import java.util.UUID

import org.pechblenda.auth.entity.IUser
import org.pechblenda.auth.repository.IAuthRepository
import ${packagePath}.entity.User

import org.springframework.data.jpa.repository.Query

interface IAuthRepository: IAuthRepository<User, UUID> {

	override fun findByUserName(userName: String): Optional<IUser>

	override fun findByActivatePassword(activatePassword: UUID?): Optional<IUser>

	override fun findByPassword(password: String): Optional<IUser>

	override fun existsByUserName(userName: String): Boolean

	override fun existsByEmail(email: String): Boolean

	override fun existsByActivatePassword(activatePassword: UUID): Boolean

	@Query(
		"select user from User user where " +
			"user.email = :userName or user.userName = :userName"
	)
	override fun findByUserNameOrEmail(userName: String): Optional<IUser>

	@Query(
		"select user from User user where " +
			"user.userName like :userName"
	)
	override fun likeByUserName(userName: String): Optional<IUser>

}`;
}

export const springBootUserEntity = (packagePath: string) => {
	return `package ${packagePath}.entity

import javax.persistence.Column
import javax.persistence.Entity
import javax.persistence.GeneratedValue
import javax.persistence.GenerationType
import javax.persistence.Id
import javax.persistence.Table

import org.pechblenda.auth.entity.IUser
import org.pechblenda.auth.enums.AccountType

import java.util.UUID

@Entity
@Table(name = "users")
class User(
\t@Id
\t@GeneratedValue(strategy = GenerationType.AUTO)
\toverride var uuid: UUID,
\toverride var name: String,
\toverride var surname: String,
\toverride var motherSurname: String,
\toverride var password: String,
\toverride var photo: String,
\toverride var activatePassword: UUID?,
\toverride var accountType: String,

\t@Column(unique = true)
\toverride var userName: String,

\t@Column(unique = true)
\toverride var email: String,

\t@Column(columnDefinition = "boolean default false")
\toverride var enabled: Boolean,

\t@Column(columnDefinition = "boolean default false")
\toverride var active: Boolean
): IUser {

\tconstructor(): this(
\t\tuuid = UUID.randomUUID(),
\t\tname = "",
\t\tsurname = "",
\t\tmotherSurname = "",
\t\tpassword = "",
\t\tphoto = "",
\t\tactivatePassword = null,
\t\taccountType = AccountType.DEFAULT.name,
\t\tuserName = "",
\t\temail = "",
\t\tenabled = false,
\t\tactive = false
\t)

}
`;
}

export const webSecurityConfigSpringBoot = (packagePath: string) => {
  return `package ${packagePath}.security

import org.pechblenda.auth.AuthController
import org.pechblenda.auth.service.AuthService
import org.pechblenda.auth.util.ContextApp
import ${packagePath}.entity.User
import org.pechblenda.security.JwtAuthEntryPoint
import org.pechblenda.security.JwtAuthTokenFilter
import org.pechblenda.security.JwtProvider

import org.springframework.beans.factory.annotation.Autowired
import org.springframework.context.annotation.Bean
import org.springframework.security.authentication.AuthenticationManager
import org.springframework.security.authentication.dao.DaoAuthenticationProvider
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity
import org.springframework.security.config.annotation.web.builders.HttpSecurity
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity
import org.springframework.security.config.http.SessionCreationPolicy
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder
import org.springframework.security.crypto.password.PasswordEncoder
import org.springframework.security.web.SecurityFilterChain
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter

@EnableWebSecurity
@EnableGlobalMethodSecurity(prePostEnabled = true)
class WebSecurityConfig {

\t@Autowired
\tprivate lateinit var userDetailsService: UserDetailsServiceImpl

\t@Autowired
\tprivate lateinit var jwtProvider: JwtProvider

\t@Autowired
\tprivate lateinit var authRepository: IAuthRepository

\t@Bean
\tfun authenticationJwtTokenFilter(): JwtAuthTokenFilter {
\t\treturn JwtAuthTokenFilter(jwtProvider, userDetailsService)
\t}

\t@Bean
\tfun jwtAuthEntryPoint(): JwtAuthEntryPoint {
\t\treturn JwtAuthEntryPoint()
\t}

\t@Bean
\tfun authenticationProvider(): DaoAuthenticationProvider {
\t\tval authProvider = DaoAuthenticationProvider()
\t\tauthProvider.setUserDetailsService(userDetailsService)
\t\tauthProvider.setPasswordEncoder(passwordEncoder())
\t\treturn authProvider
\t}

\t@Bean
\tfun authenticationManager(authConfig: AuthenticationConfiguration): AuthenticationManager {
\t\treturn authConfig.authenticationManager
\t}

\t@Bean
\tfun passwordEncoder(): PasswordEncoder {
\t\treturn BCryptPasswordEncoder()
\t}

\t@Bean
\tfun filterChain(http: HttpSecurity): SecurityFilterChain? {
\t\thttp.cors()
\t\t\t.and()
\t\t\t.csrf()
\t\t\t.disable()
\t\t\t.exceptionHandling()
\t\t\t.authenticationEntryPoint(jwtAuthEntryPoint())
\t\t\t.and()
\t\t\t.sessionManagement()
\t\t\t.sessionCreationPolicy(SessionCreationPolicy.STATELESS)
\t\t\t.and()
\t\t\t.authorizeRequests()
\t\t\t.antMatchers(
\t\t\t\t"/rest/auth/**",
\t\t\t\t"/api/**",
\t\t\t).permitAll()
\t\t\t.anyRequest()
\t\t\t.authenticated()

\t\thttp.authenticationProvider(authenticationProvider())
\t\thttp.addFilterBefore(authenticationJwtTokenFilter(), UsernamePasswordAuthenticationFilter::class.java)
\t\treturn http.build()
\t}

\t@Bean
\tfun authService(userRepository: IAuthRepository): AuthService {
\t\treturn AuthService(userRepository, User::class)
\t}

\t@Bean
\tfun authController(): AuthController {
\t\treturn AuthController()
\t}

\t@Bean
\tfun contextApp(): ContextApp {
\t\treturn ContextApp(authRepository)
\t}

}
`;
}

export const userDetailsServiceImplSpringBoot = (packagePath: string) => {
	return `package ${packagePath}.security

import ${packagePath}.entity.User

import org.springframework.security.core.userdetails.UserDetails
import org.springframework.security.core.userdetails.UserDetailsService
import org.springframework.security.core.userdetails.UsernameNotFoundException
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional

@Service
class UserDetailsServiceImpl(
\tprivate val userRepository: IAuthRepository
): UserDetailsService {

\t@Transactional(readOnly = true)
\toverride fun loadUserByUsername(userName: String): UserDetails {
\t\tval user: User = userRepository.findByUserName(userName).orElseThrow {
\t\t\tUsernameNotFoundException("Upps no se encuentra el usuario")
\t\t} as User
\t\treturn UserPrinciple.build(user)
\t}

}
`;
}

export const userPrincipleSpringBoot = (packagePath: string) => {
	return `package ${packagePath}.security

import org.springframework.security.core.userdetails.UserDetails
import org.springframework.security.core.authority.SimpleGrantedAuthority

import com.fasterxml.jackson.annotation.JsonIgnore

import ${packagePath}.entity.User

import java.util.UUID

class UserPrinciple(
\tval uuid: UUID,
\tprivate val userName: String,

\t@JsonIgnore
\tprivate val password: String,

\tprivate val authority: List<SimpleGrantedAuthority>,
\tprivate val enabled: Boolean
) : UserDetails {

\tcompanion object {
\t\t@JvmStatic
\t\tfun build(user: User): UserPrinciple {
\t\t\t/*val authorities: List<SimpleGrantedAuthority> = user.roles.map {
\t\t\t\trole -> SimpleGrantedAuthority(role.name)
\t\t\t}*/
\t\t\tval authorities = listOf<SimpleGrantedAuthority>()

\t\t\treturn UserPrinciple(
\t\t\t\tuser.uuid,
\t\t\t\tuser.userName,
\t\t\t\tuser.password,
\t\t\t\tauthorities,
\t\t\t\tuser.enabled
\t\t\t)
\t\t}
\t}

\toverride fun getAuthorities(): List<SimpleGrantedAuthority> {
\t\treturn authority
\t}

\toverride fun getUsername(): String {
\t\treturn userName
\t}

\toverride fun getPassword(): String {
\t\treturn password
\t}

\toverride fun isAccountNonExpired(): Boolean {
\t\treturn true
\t}

\toverride fun isAccountNonLocked(): Boolean {
\t\treturn true
\t}

\toverride fun isCredentialsNonExpired(): Boolean {
\t\treturn true
\t}

\toverride fun isEnabled(): Boolean {
\t\treturn enabled
\t}

}
`;
}

export const dependencyTip = () => {
  return `Please put this dependency in your pom or gradle

	<dependency>
		<groupId>org.springframework.boot</groupId>
		<artifactId>spring-boot-starter-security</artifactId>
	</dependency>
	
	Add to run your app the command
		--spring.config.location=classpath:/application-dev.properties
`;
}

export const documentationSpringBoot = () => {
	return `Please put in your inject beans this code: 
\t@Bean
\tfun documentation(): Documentation {
\t\tval bodyRequest = LinkedHashMap<String, String>()
\t\tbodyRequest["userName"] = "your user email"
\t\tbodyRequest["password"] = "your password"

\t\treturn Documentation(
\t\t\tApiInfo(
\t\t\t\ttitle = "Your app name",
\t\t\t\tdescription = "Your description",
\t\t\t\ticonUrl = "",
\t\t\t\tversion = "0.0.1",
\t\t\t\tcredentials = listOf(
\t\t\t\t\tCredential(
\t\t\t\t\t\tname = "User Root",
\t\t\t\t\t\tendPoint = "http://localhost/rest/auth/sign-in",
\t\t\t\t\t\tbodyRequest = bodyRequest,
\t\t\t\t\t\ttokenMapping = "data.session.token"
\t\t\t\t\t)
\t\t\t\t)
\t\t\t),
\t\t\tAuthController::class
\t\t)
\t}

or add in your application.properties

app.doc.title=Your app name
app.doc.description=Your app description
app.doc.icon-url=
app.doc.version=1.0.0
app.doc.credential.end-point=http://localhost:5000/rest/auth/sign-in
app.doc.credential.token-mapping=data.session.token
app.doc.credentials=[\\n\\t{\\n\\t\\t\\"name\\": \\"Root User\\",\\n\\t\\t\\"userName\\": \\"fernnypay95\\",\\n\\t\\t\\"password\\": \\"fernny27\\" \\n\\t},{\\n\\t\\t\\"name\\": \\"Editor\\",\\n\\t\\t\\"userName\\": \\"fernnypay95\\",\\n\\t\\t\\"password\\": \\"fernny27\\" \\n\\t}\\n]
`;
}

export const documentDocJson = (): string => {
	return `{
\t"authorization": true,
\t"file": false,
\t"bookmark": "mdi-information",
\t"permissions": ["USER_NORMAL"],
\t"description": "Service description",
\t"html": "<button>all so good</button>",
\t"responseOk": {
\t\t"timestamp": "01-10-2022  13:39:40 p. m.",
\t\t"status": 200
\t},
\t"responseCreated": {
\t\t"timestamp": "01-10-2022  13:39:40 p. m.",
\t\t"status": 201
\t},
\t"responseUnauthorized": {
\t\t"timestamp": "2022-01-05T01:24:10.787+00:00",
\t\t"status": 401,
\t\t"error": "Unauthorized",
\t\t"path": "your path"
\t},
\t"responseBadRequest": {
\t\t"timestamp": "2022-01-10T19:34:37.685+00:00",
\t\t"status": 400,
\t\t"error": "Bad Request",
\t\t"path": "your path"
\t},
\t"responseInternalServerError": {
\t\t"timestamp": "2022-01-10T19:34:37.685+00:00",
\t\t"status": 500,
\t\t"error": "Internal Server Error",
\t\t"path": "your path"
\t},
\t"steps": [
\t\t{
\t\t\t"access": "post",
\t\t\t"mapping": "http://localhost:5000/api/#/rest/documentation/Auth/%2Frest%2Fauth%2Fsign-in/post"
\t\t}
\t],
\t"pathVariables": [
\t\t{
\t\t\t"name": "demoVariable",
\t\t\t"value": "",
\t\t\t"type": "text",
\t\t\t"required": false
\t\t}
\t],
\t"pathParams": [
\t\t{
\t\t\t"name": "demoVariable2",
\t\t\t"value": "",
\t\t\t"type": "text",
\t\t\t"required": false
\t\t}
\t],
\t"requestBody": { }
}`;
}
