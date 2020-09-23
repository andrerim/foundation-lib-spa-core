"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FetchAdapter = void 0;
exports.FetchAdapter = (config) => __awaiter(void 0, void 0, void 0, function* () {
    const requestUrl = new URL(config.url || '', config.baseURL);
    if (config.auth) {
        requestUrl.username = config.auth.username;
        requestUrl.password = config.auth.password;
    }
    const headers = Object.assign({}, config.headers);
    // Remove Authorization header if username & password are provided
    if (config.auth && headers.Authorization) {
        delete headers.Authorization;
    }
    // Set User-Agent (required by some servers)
    // Only set header if it hasn't been set in config
    // See https://github.com/axios/axios/issues/69
    if (!headers['User-Agent'] && !headers['user-agent']) {
        headers['User-Agent'] = 'Axios-Fetch-Adapter/0.0.1';
    }
    const requestConfig = {
        headers: headers,
        credentials: config.withCredentials ? "include" : "omit",
        method: config.method,
        redirect: config.maxRedirects ? "follow" : "error",
    };
    var request = new Request(requestUrl.href, requestConfig);
    const r = yield fetch(request);
    let responseHeaders = {};
    r.headers.forEach((value, name) => responseHeaders[name] = value);
    let response = {
        config,
        request,
        status: r.status,
        statusText: r.statusText,
        headers: responseHeaders,
        data: undefined
    };
    switch (config.responseType) {
        case 'json':
            response.data = yield r.json();
            break;
        case 'text':
            response.data = yield r.text();
            break;
        case undefined:
        case 'stream':
            response.data = r.body;
            break;
        default:
            throw new Error(`Unsupported response type: ${config.responseType}`);
    }
    return response;
});
exports.default = exports.FetchAdapter;