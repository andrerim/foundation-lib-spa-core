import React from 'react';
import { RouteProps, RouteComponentProps, RouteChildrenProps } from 'react-router';
export interface IRouteConfigComponentProps<ParamsType extends {
    [K in keyof ParamsType]?: string | undefined;
}> extends RouteComponentProps<ParamsType> {
    routes?: IRouteConfig;
    path?: string;
}
export interface IRouteConfigItem extends RouteProps {
    path: string;
    component?: React.ComponentType<IRouteConfigComponentProps<any>> | React.ComponentType<any>;
    render?: (props: IRouteConfigComponentProps<any>) => React.ReactNode;
    children?: ((props: RouteChildrenProps<any>) => React.ReactNode) | React.ReactNode;
    routes?: IRouteConfigItem[];
}
type IRouteConfig = IRouteConfigItem[];
export default IRouteConfig;
