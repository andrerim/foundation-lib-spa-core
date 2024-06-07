import IInitializableModule, { BaseInitializableModule } from '../Core/IInitializableModule';
import IConfig from '../AppConfig';
import IStateReducerInfo from '../Core/IStateReducerInfo';
import IEpiserverContext from '../Core/IEpiserverContext';
import { DefaultServices } from '../Core/IServiceContainer';
import CmsStateReducer, { PartialAppState, CmsSetStateAction, ContentAppState as CmsAppState } from './Reducer';
import * as Tools  from './Tools';
import IContentDeliveryAPI from '../ContentDelivery/IContentDeliveryAPI';

export class StateModule extends BaseInitializableModule implements IInitializableModule
{
    protected name: string = "Core State Engine";

    public SortOrder : number = 40;

    public StartModule(context: IEpiserverContext): void
    {
        const store = context.getStore();
        const state = store.getState() as PartialAppState;
        const cfg : Readonly<IConfig> = context.serviceContainer.getService<IConfig>(DefaultServices.Config);
        const cdAPI : IContentDeliveryAPI = context.serviceContainer.getService<IContentDeliveryAPI>(DefaultServices.ContentDeliveryAPI_V2);

        // Setup CD-API Language to respond to the state changes.
        Tools.observeStore<string, CmsAppState>(
            // @ts-ignore
            store, 
            (x) => x?.OptiContentCloud?.currentLanguage || cfg.defaultLanguage,
            (newValue) => {
                if (newValue) cdAPI.Language = newValue;
            }
        );

        // Make sure the current language is applied
        const language = state?.OptiContentCloud?.currentLanguage
        if (!language)
            store.dispatch({
                type: "OptiContentCloud/SetState",
                currentLanguage: cfg.defaultLanguage
            })
        else
            cdAPI.Language = language || cfg.defaultLanguage;

    }

    /**
     * Return the standard state reducer for the CMS Status
     */
    // @ts-ignore
    public GetStateReducer : () => IStateReducerInfo<any> = () => CmsStateReducer;
}

export default StateModule;