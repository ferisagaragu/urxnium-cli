"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fakeGet = exports.demo = exports.urxniumDoc = void 0;
exports.urxniumDoc = {
    main: {
        rest: {
            title: 'Urxnium-doc',
            description: '',
            icon: '',
            version: '1.0.0',
            baseUrl: 'http://localhost:8080',
            bookmarks: [],
            credentials: '',
            src: [
                './demo/demo.json'
            ]
        }
    }
};
exports.demo = {
    name: 'Demo',
    elements: [
        './fake-get.rest.json'
    ]
};
exports.fakeGet = {
    name: 'fake-get',
    authorization: true,
    mapping: "/auth/validate-token",
    access: 'get',
    bookmark: '',
    permissions: [],
    description: 'Service fake description',
    html: null,
    responseOk: {
        timestamp: '11-14-2020  10:37:09 a. m.',
        status: 200,
        data: {
            validateToken: true
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
