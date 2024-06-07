// Set SSR
import getGlobal from './AppGlobal';
// Global Libraries && Poly-fills
import ReactDOMServer from 'react-dom/server';
import React from 'react';
import DefaultServiceContainer from './Core/DefaultServiceContainer';
import EpiSpaContext from './Spa';
import CmsSite from './Components/CmsSite';
export default function RenderServerSide(config, serviceContainer) {
    // Update context
    const ctx = getGlobal();
    ctx.epi = ctx.epi || {};
    ctx.epi.isServerSideRendering = true;
    // Initialize Episerver Context, for Server Side Rendering
    serviceContainer = serviceContainer || new DefaultServiceContainer();
    config.enableSpinner = false;
    config.noAjax = true;
    config.enableDebug = false;
    EpiSpaContext.init(config, serviceContainer, true);
    const helmetContext = {};
    const body = ReactDOMServer.renderToString(React.createElement(CmsSite, { context: EpiSpaContext, helmetContext: helmetContext }));
    const { helmet } = helmetContext;
    return {
        Body: body,
        HtmlAttributes: helmet === null || helmet === void 0 ? void 0 : helmet.htmlAttributes.toString(),
        Title: helmet === null || helmet === void 0 ? void 0 : helmet.title.toString(),
        Meta: helmet === null || helmet === void 0 ? void 0 : helmet.meta.toString(),
        Link: helmet === null || helmet === void 0 ? void 0 : helmet.link.toString(),
        Script: helmet === null || helmet === void 0 ? void 0 : helmet.script.toString(),
        Style: helmet === null || helmet === void 0 ? void 0 : helmet.style.toString(),
        BodyAttributes: helmet === null || helmet === void 0 ? void 0 : helmet.bodyAttributes.toString()
    };
}
//# sourceMappingURL=InitServer.js.map