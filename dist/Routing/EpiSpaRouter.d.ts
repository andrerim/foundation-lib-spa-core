import React from 'react';
import { RoutesProps } from 'react-router';
import { BrowserRouterProps } from 'react-router-dom';
import IRouteConfig from './IRouteConfig';
import { StaticRouterProps } from 'react-router-dom/server';
export type RouterProps = StaticRouterProps & BrowserRouterProps;
export declare const Router: React.FunctionComponent<RouterProps>;
export default Router;
export type RoutedContentProps = RoutesProps & {
    keyPrefix?: string;
    config?: IRouteConfig;
    basePath?: string;
};
export declare const RoutedContent: React.FunctionComponent<RoutedContentProps>;
