import React from 'react';
import { Route, RouteProps, Routes, RoutesProps } from 'react-router';
import { BrowserRouter, BrowserRouterProps } from 'react-router-dom';
import IRouteConfig, { IRouteConfigItem } from './IRouteConfig';
import IEpiserverContext from '../Core/IEpiserverContext';
import { useEpiserver } from '../Hooks/Context';
import { StaticRouter, StaticRouterProps } from 'react-router-dom/server';

export type RouterProps = StaticRouterProps & BrowserRouterProps;
export const Router : React.FunctionComponent<RouterProps> = (props) =>
{
    const epi = useEpiserver();

    if (epi.isServerSideRendering()) {
        const staticRouterProps: StaticRouterProps = {
            basename: props.basename,
            location: props.location
        };

        return <StaticRouter {...staticRouterProps}>{ props.children }</StaticRouter>
    }

    const browserRouterProps: BrowserRouterProps = {
        basename: props.basename,
    };

    if (epi.isInEditMode() || epi.isEditable()) { 
        return <BrowserRouter {...browserRouterProps}>{ props.children }</BrowserRouter>
    }
        
    return <BrowserRouter {...browserRouterProps}>{ props.children }</BrowserRouter>
}
Router.displayName = "Optimizely CMS: Router";
export default Router;

export type RoutedContentProps = RoutesProps & {
    keyPrefix ?:    string,
    config ?:       IRouteConfig,
    basePath ?:     string
}

export const RoutedContent : React.FunctionComponent<RoutedContentProps> = (props) => {
    const ctx = useEpiserver();

    return (
      <Routes location={props.location}>
        {props.children}
        {(props.config || []).map((item, idx) =>
          createRouteNode(item, props.basePath, `${props.keyPrefix}-route-${idx}`, ctx),
        )}
      </Routes>
    );
}
RoutedContent.displayName = "Optimizely CMS: Route container";

function createRouteNode(route: IRouteConfigItem, basePath = "", key ?: string, ctx ?: IEpiserverContext) : React.ReactElement<RouteProps> {
    
    let createdRoute : string = basePath ? (basePath.substr(-1) === "/" ? basePath.substr(0, -1) : basePath) : "";
    createdRoute = createdRoute + "/" + (route.path ? (route.path.substr(0,1) === "/" ? route.path.substr(1) : route.path) : "")

    if (ctx?.isDebugActive()) console.log('Generating Route Virtual DOM Node', createdRoute, route, key);

    const element = route.component
      ? React.createElement(route.component || 'div', { routes: route.routes, path: route.path })
      : undefined;    

    const newRouteProps: RouteProps = {
      children: route.children,
      path: createdRoute,
      element,
    };

    return <Route { ...newRouteProps } key={ key } />
}