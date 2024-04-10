import React from "react";
import CmsSite from './Components/CmsSite';
import EpiContext from './Spa';
import ComponentPreLoader from "./Loaders/ComponentPreLoader";
import DefaultServiceContainer from './Core/DefaultServiceContainer';
import { createRoot, hydrateRoot } from "react-dom/client";
export function InitBrowser(config, containerId, serviceContainer) {
    try {
        if ((__INITIAL_DATA__ === null || __INITIAL_DATA__ === void 0 ? void 0 : __INITIAL_DATA__.status) === 'loading') {
            __INITIAL_DATA__.onReady = () => _doInitBrowser(config, containerId, serviceContainer);
            return;
        }
    }
    catch (e) {
        // Ignore on purpose
    }
    return _doInitBrowser(config, containerId, serviceContainer);
}
function _doInitBrowser(config, containerId, serviceContainer) {
    EpiContext.init(config, serviceContainer || new DefaultServiceContainer());
    const container = document.getElementById(containerId ? containerId : "epi-page-container");
    if (container && container.childElementCount > 0) {
        const components = EpiContext.config().preLoadComponents || [];
        if (EpiContext.isDebugActive())
            console.info('Hydrating existing render, Stage 1. Preloading components ...', components);
        const loader = EpiContext.componentLoader();
        ComponentPreLoader.load(components, loader).finally(() => {
            if (EpiContext.isDebugActive())
                console.info('Hydrating existing render, Stage 2. Hydration ...');
            hydrateRoot(container, React.createElement(CmsSite, { context: EpiContext }));
        });
    }
    else {
        if (EpiContext.isDebugActive())
            console.info('Building new application');
        const root = createRoot(container);
        root.render(React.createElement(CmsSite, { context: EpiContext }));
    }
}
export default InitBrowser;
//# sourceMappingURL=InitBrowser.js.map