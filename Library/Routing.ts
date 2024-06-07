import * as RoutingNS from '../Routing/EpiSpaRouter';
import IRouteConfigBase, { IRouteConfigItem as IRouteConfigItemBase } from '../Routing/IRouteConfig';

/**
 * Routing capability
 */
export const Router = RoutingNS.Router;
export const Content = RoutingNS.RoutedContent;
export type RouterProps = RoutingNS.RouterProps;
export type ContentProps = RoutingNS.RoutedContentProps;
export type IRoutingConfig = IRouteConfigBase;
export type IRoutingItem   = IRouteConfigItemBase;
