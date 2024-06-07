// Import libraries
import React, { StrictMode } from 'react';
import { Helmet, HelmetProvider, HelmetServerState } from 'react-helmet-async';
import { Provider as ReduxProvider } from 'react-redux';

// Import Episerver Core CMS
import IEpiserverContext from '../Core/IEpiserverContext';
import EpiserverContext from '../Hooks/Context';

// Import Episerver Taxonomy
import Layout, { LayoutComponent } from './Layout';

// Import Episerver Components
import EpiRouter, {  RoutedContent } from '../Routing/EpiSpaRouter';
import IServerContextAccessor from '../ServerSideRendering/IServerContextAccessor';
import { DefaultServices } from '../Core/IServiceContainer';
import CmsCommunicator from './CmsCommunicator';

/**
 * Define the property structure for the CmsSite component
 */
export interface CmsSiteProps {
    context: IEpiserverContext,
    helmetContext?: {
      helmet?: HelmetServerState;
    };
    children?: React.ReactNode,
}

export const EpiserverWebsite : React.FunctionComponent<CmsSiteProps> = (props) => {
    const SiteLayout = getLayout(props.context);
    const ssr = props.context.serviceContainer.getService<IServerContextAccessor>(DefaultServices.ServerContext);
    const location = (props.context.isServerSideRendering() ? ssr.Path : window.location.pathname) || "";
    console.log("###### her er routesa ###########");
    console.log("# config", props.context.config(), "#")
    console.log("# routes", props.context.config().routes, "#")
    console.log("##############################")
    return (
      <StrictMode>
        <ReduxProvider store={props.context.getStore()} serverState={{}}>
          <HelmetProvider context={props.helmetContext}>
            <EpiserverContext.Provider value={props.context}>
              <Helmet />
              <CmsCommunicator />
              <EpiRouter location={location}>
                <SiteLayout context={props.context}>
                  <RoutedContent config={props.context.config().routes || []} keyPrefix="CmsSite-RoutedContent" />
                  {props.children}
                </SiteLayout>
              </EpiRouter>
            </EpiserverContext.Provider>
          </HelmetProvider>
        </ReduxProvider>
      </StrictMode>
    );
}

function getLayout(context: IEpiserverContext) : LayoutComponent
{
    return context.config().layout || Layout;
}

EpiserverWebsite.displayName = "Optimizely CMS: Website";
export default EpiserverWebsite;