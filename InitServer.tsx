// Set SSR
import getGlobal from './AppGlobal';

// Global Libraries && Poly-fills
import ReactDOMServer from 'react-dom/server';
import { HelmetServerState } from 'react-helmet-async';
import React from 'react';

// Episerver Libraries
import IServiceContainer from './Core/IServiceContainer';
import DefaultServiceContainer from './Core/DefaultServiceContainer'; 
import EpiSpaContext from './Spa';
import CmsSite from './Components/CmsSite';
import AppConfig from './AppConfig';

// Episerver SPA/PWA Server Side Rendering libs
import SSRResponse from './ServerSideRendering/Response';

export default function RenderServerSide(config: AppConfig, serviceContainer?: IServiceContainer): SSRResponse
{
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

    const helmetContext: {
        helmet?: HelmetServerState;
    } = {};

    const body = ReactDOMServer.renderToString(<CmsSite context={ EpiSpaContext } helmetContext={helmetContext} />);
    const { helmet } = helmetContext;

    return {
        Body: body,
        HtmlAttributes: helmet?.htmlAttributes.toString(),
        Title: helmet?.title.toString(),
        Meta: helmet?.meta.toString(),
        Link: helmet?.link.toString(),
        Script: helmet?.script.toString(),
        Style: helmet?.style.toString(),
        BodyAttributes: helmet?.bodyAttributes.toString()
    };
}