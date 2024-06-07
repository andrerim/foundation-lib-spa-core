import React from 'react';
import { HelmetServerState } from 'react-helmet-async';
import IEpiserverContext from '../Core/IEpiserverContext';
/**
 * Define the property structure for the CmsSite component
 */
export interface CmsSiteProps {
    context: IEpiserverContext;
    helmetContext?: {
        helmet?: HelmetServerState;
    };
    children?: React.ReactNode;
}
export declare const EpiserverWebsite: React.FunctionComponent<CmsSiteProps>;
export default EpiserverWebsite;
