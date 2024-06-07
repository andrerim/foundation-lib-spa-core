import React from 'react';
import { RouteProps } from 'react-router';

export interface IRouteConfigComponentProps 
{
    routes  ?:       IRouteConfig;
    path    ?:       string;
}

export type IRouteConfigItem = RouteProps & {
    path:           string
    component?:     React.ComponentType<IRouteConfigComponentProps>
    children?:      React.ReactNode;  
    routes ?:       IRouteConfigItem[]
}

type IRouteConfig = IRouteConfigItem[];
export default IRouteConfig;