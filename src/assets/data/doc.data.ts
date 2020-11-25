export const main: any = {
  rest: {
    title: '',
    description: '',
    icon: '',
    version: '0.0.1',
    baseUrl: 'http://localhost:1000',
    baseUrlProd: 'http://localhost:1000',
    bookmarks: [],
    credentials: null,
    src: []
  },
  functional: {
    title: '',
    description: '',
    icon: '',
    version: '0.0.1',
    bookmarks: [],
    src: []
  }
}

export const section: any = {
  name: '',
  elements: []
}

export const documentREST: any = {
  name: '',
  authorization: true,
  mapping: '',
  access: '',
  bookmark: '',
  permissions: [],
  description: '',
  html: null,
  responseOk: {
    timestamp: '11-14-2020  10:37:09 a. m.',
    status: 200,
    data: {
      isDemo: true
    }
  },
  responseBadRequest: {
    timestamp: '2020-01-03T16:42:13.727+0000',
    status: 400,
    error: 'BAD_REQUEST',
    message: 'your problem message'
  },
  responseInternalServerError: {
    timestamp: '2020-01-03T17:37:02.348+0000',
    status: 500,
    error: 'Internal Server Error',
    message: 'your error message'
  }
}

export const documentFunctional: any = {
  name: '',
  access: '',
  bookmark: '',
  description: '',
  html: null,
  exampleCodes: [
    {
      title: '',
      description: '',
      code: null,
      out: null,
      language: 'javascript'
    }
  ],
  attributes: [
    {
      name: '',
      type: '',
      description: '',
      default: ''
    }
  ]
}

export const credentials: any = {
  name: '',
  endPoint: 'http://localhost:8080/auth/your-post-end-point',
  bodyRequest: { },
  tokenMapping: 'data.session.token'
}

