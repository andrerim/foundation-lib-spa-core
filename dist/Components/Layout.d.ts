import React, { ComponentType, FunctionComponent } from 'react';
import IEpiserverContext from '../Core/IEpiserverContext';
export type LayoutProps = React.PropsWithChildren<{
    context?: IEpiserverContext;
}>;
export type LayoutComponent<P extends LayoutProps = LayoutProps> = ComponentType<P>;
/**
 * A default layout implementation, simply wrapping the site in a div
 *
 * @param   props   The properties of this layout
 */
export declare const Layout: FunctionComponent<LayoutProps>;
export default Layout;
