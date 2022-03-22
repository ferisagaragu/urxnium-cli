export const commandDescription: any = {
	'doc init': 'create the necessary files to start documenting the app',
	'doc start': 'mount a server at ' + 'http://localhost:1000'.cyan + ' to preview the application documentation',
	'doc dist': 'generates everything to mount the documentation on a separate server',
	'doc publish': 'generate documentation ' + 'json file'.red + ' to upload on urxnium-doc web',
	'doc add section':
		'generates a section which represents a ' + 'REST'.red + ' controller or the name of a ' + 'class'.blue,
	'doc add document': 'generates a document to document a '+ 'service'.red + ' or ' + 'function'.blue,
	'doc add credential':
		'generates temporary credentials to authorize web services, ' +
		'these will not be included in the distribution of the documentation',
	'sbku generate service': 'generate necessary files to create a ' + 'REST'.red +
		' service in ' + 'Spring Boot'.green + ' + ' + 'Kotlin'.blue + ' + ' + 'Urxnium'.magenta
}
