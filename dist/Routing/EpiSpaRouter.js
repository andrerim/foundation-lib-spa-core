import React from 'react';
import { Route, Routes } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import { useEpiserver } from '../Hooks/Context';
import { StaticRouter } from 'react-router-dom/server';
export const Router = (props) => {
    const epi = useEpiserver();
    if (epi.isServerSideRendering()) {
        const staticRouterProps = {
            basename: props.basename,
            location: props.location
        };
        return React.createElement(StaticRouter, Object.assign({}, staticRouterProps), props.children);
    }
    const browserRouterProps = {
        basename: props.basename,
    };
    if (epi.isInEditMode() || epi.isEditable()) {
        return React.createElement(BrowserRouter, Object.assign({}, browserRouterProps), props.children);
    }
    return React.createElement(BrowserRouter, Object.assign({}, browserRouterProps), props.children);
};
Router.displayName = "Optimizely CMS: Router";
export default Router;
export const RoutedContent = (props) => {
    const ctx = useEpiserver();
    return (React.createElement(Routes, { location: props.location },
        props.children,
        (props.config || []).map((item, idx) => createRouteNode(item, props.basePath, `${props.keyPrefix}-route-${idx}`, ctx))));
};
RoutedContent.displayName = "Optimizely CMS: Route container";
function createRouteNode(route, basePath = "", key, ctx) {
    let createdRoute = basePath ? (basePath.substr(-1) === "/" ? basePath.substr(0, -1) : basePath) : "";
    createdRoute = createdRoute + "/" + (route.path ? (route.path.substr(0, 1) === "/" ? route.path.substr(1) : route.path) : "");
    if (ctx === null || ctx === void 0 ? void 0 : ctx.isDebugActive())
        console.log('Generating Route Virtual DOM Node', createdRoute, route, key);
    const element = route.component
        ? React.createElement(route.component || 'div', { routes: route.routes, path: route.path })
        : undefined;
    const newRouteProps = {
        children: route.children,
        path: createdRoute,
        element,
    };
    return React.createElement(Route, Object.assign({}, newRouteProps, { key: key }));
}
//# sourceMappingURL=EpiSpaRouter.js.map