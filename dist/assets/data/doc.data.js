"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.credentials = exports.documentFunctional = exports.documentREST = exports.section = exports.main = void 0;
exports.main = {
    rest: {
        title: '',
        description: '',
        icon: '',
        version: '0.0.1',
        baseUrl: 'http://localhost:1000',
        bookmarks: [],
        credentials: '',
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
};
exports.section = {
    name: '',
    elements: []
};
exports.documentREST = {
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
};
exports.documentFunctional = {
    name: '',
    access: '',
    bookmark: '',
    description: '',
    html: null,
    exampleCodes: [
        {
            code: {},
            out: {},
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
};
exports.credentials = {
    name: '',
    endPoint: 'http://localhost:8080/auth/your-post-end-point',
    bodyRequest: {},
    tokenMapping: 'data.session.token'
};
