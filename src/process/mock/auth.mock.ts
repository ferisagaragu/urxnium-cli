import { Command } from '../../core/interface/command';
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

export class AuthMock extends Command {

	app = express();

	constructor() {
		super();

		this.app.set('port', 2000);
		this.app.set('json spaces', 2)
		this.app.use(morgan('dev'));
		this.app.use(cors({ origin: '*' }));
		this.app.use(express.urlencoded({ extended:false }));
		this.app.use(express.json());
	}

	initAuthServer(): void {
		this.app.get('/rest/auth/generate-profile-image', (req: any, res: any) => {
			res.setHeader('content-type', 'image/svg+xml');
			res.send(
				`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40">
			    <defs>
			        <linearGradient id="gradient" x1="0" y1="0" x2="0" y2="1">
			            <stop stop-color="#765AF8" offset="0"/>
			            <stop stop-color="#1DE9B6" offset="1"/>
			        </linearGradient>
			    </defs>
	        <g>
		        <rect fill="url(#gradient)" x="0" y="0" width="40" height="40" rx="3" ry="3"/>
		        <text x="5" y="19" font-family="Arial, Helvetica, sans-serif" font-size="15px" letter-spacing="1" fill="#FFFFFF">
		            <tspan>UR</tspan>
		            <tspan x="6" y="28">_</tspan>
		        </text>
	        </g>
				</svg>`
			);
		});

		this.app.post('/rest/auth/sign-in', (req: any, res: any) => {
			if (req.body.userName !== 'urx') {
				res.status(400).send(
					{
						timestamp: '04-03-2022  19:10:16 p. m.',
						status: 400,
						error: 'BAD_REQUEST',
						message: 'No se encuentra el usuario',
						developMessage: '',
						fieldNameError: 'userName'
					}
				);
			}

			if (req.body.password !== 'root') {
				res.status(401).send(
					{
						timestamp: '04-03-2022  19:07:31 p. m.',
						status: 401,
						error: 'UNAUTHORIZED',
						message: 'La contraseña es incorrecta',
						developMessage: '',
						fieldNameError: 'password'
					}
				);
			}

			res.json({
				timestamp: '04-03-2022  18:51:58 p. m.',
				status: 200,
				data: {
					uuid: '8a4709d2-a114-4713-a3f8-f58c5c49b23d',
					name: 'Urxnium',
					surname: 'Fakesurname',
					motherSurname: "Fakemothersurname",
					photo: 'http://localhost:2000/rest/auth/generate-profile-image',
					accountType: 'DEFAULT',
					userName: 'urx',
					email: 'urxnium@gmail.com',
					createDate: '2022-03-30T04:52:26.427+00:00',
					session: {
						token: 'eyJhbGciOiJIUzUxMiJ9',
						expiration: '18000000',
						expirationDate: 'Sun Apr 03 23:51:57 CDT 3022',
						refreshToken: 'eyJhbGciOiJIUzUxMiJ9'
					}
				}
			});
		});

		this.app.post('/rest/auth/refresh-token', (req: any, res: any) => {
			if (req.body.refreshToken !== 'eyJhbGciOiJIUzUxMiJ9') {
				res.status(401).send(
					{
						timestamp: '04-03-2022  19:07:31 p. m.',
						status: 401,
						error: 'UNAUTHORIZED',
						message: 'El token a expirado',
						developMessage: ''
					}
				);
			}

			res.json({
				timestamp: '04-03-2022  19:13:27 p. m.',
				status: 200,
				data: {
					token: 'eyJhbGciOiJIUzUxMiJ9',
					expiration: '18000000',
					expirationDate: 'Mon Apr 04 00:13:27 CDT 2022'
				}
			});
		});

		this.app.get('/rest/auth/validate-token', (req: any, res: any) => {
			if (req.header('Authorization') !== 'Bearer eyJhbGciOiJIUzUxMiJ9') {
				res.status(401).send(
					{
						timestamp: '04-03-2022  19:07:31 p. m.',
						status: 401,
						error: 'UNAUTHORIZED',
						message: 'El token a expirado',
						developMessage: ''
					}
				);
			}

			res.json({
				timestamp: '04-03-2022  18:51:58 p. m.',
				status: 200,
				data: {
					uuid: '8a4709d2-a114-4713-a3f8-f58c5c49b23d',
					name: 'Urxnium',
					surname: 'Fakesurname',
					motherSurname: "Fakemothersurname",
					photo: 'http://localhost:2000/rest/auth/generate-profile-image',
					accountType: 'DEFAULT',
					userName: 'urx',
					email: 'urxnium@gmail.com',
					createDate: '2022-03-30T04:52:26.427+00:00',
					session: {
						token: 'eyJhbGciOiJIUzUxMiJ9',
						expiration: '18000000',
						expirationDate: 'Sun Apr 03 23:51:57 CDT 3022'
					}
				}
			});
		});

		this.app.listen(
			this.app.get('port'), () => {
				console.log(`Server listening on port ${'2000'.cyan}`);
			}
		);
	}

}
