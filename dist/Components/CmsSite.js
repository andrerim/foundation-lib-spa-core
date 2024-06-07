// Import libraries
import React, { StrictMode } from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { Provider as ReduxProvider } from 'react-redux';
import EpiserverContext from '../Hooks/Context';
// Import Episerver Taxonomy
import Layout from './Layout';
// Import Episerver Components
import EpiRouter, { RoutedContent } from '../Routing/EpiSpaRouter';
import { DefaultServices } from '../Core/IServiceContainer';
import CmsCommunicator from './CmsCommunicator';
export const EpiserverWebsite = (props) => {
    const SiteLayout = getLayout(props.context);
    const ssr = props.context.serviceContainer.getService(DefaultServices.ServerContext);
    const location = (props.context.isServerSideRendering() ? ssr.Path : window.location.pathname) || "";
    console.log("###### her er routesa ###########");
    console.log("# config", props.context.config(), "#");
    console.log("# routes", props.context.config().routes, "#");
    console.log("##############################");
    return (React.createElement(StrictMode, null,
        React.createElement(ReduxProvider, { store: props.context.getStore(), serverState: {} },
            React.createElement(HelmetProvider, { context: props.helmetContext },
                React.createElement(EpiserverContext.Provider, { value: props.context },
                    React.createElement(Helmet, null),
                    React.createElement(CmsCommunicator, null),
                    React.createElement(EpiRouter, { location: location },
                        React.createElement(SiteLayout, { context: props.context },
                            React.createElement(RoutedContent, { config: props.context.config().routes || [], keyPrefix: "CmsSite-RoutedContent" }),
                            props.children)))))));
};
function getLayout(context) {
    return context.config().layout || Layout;
}
EpiserverWebsite.displayName = "Optimizely CMS: Website";
export default EpiserverWebsite;
//# sourceMappingURL=CmsSite.js.map