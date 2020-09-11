import ContentDeliveryAPI, { PathResponse as BasePathResponse, NetworkErrorData as BaseNetworkErrorData, PathResponseIsIContent as BasePathResponseIsIContent } from '../ContentDeliveryAPI';
import BaseActionResponse from '../Models/ActionResponse';
import _Property, { StringProperty as _StringProperty, NumberProperty as _NumberProperty, BooleanProperty as _BooleanProperty, ContentReferenceProperty as _ContentReferenceProperty, ContentAreaProperty as _ContentAreaProperty, LinkListProperty as _LinkListProperty, LinkProperty as _LinkProperty } from '../Property';
import ContentLink from '../Models/ContentLink';
import { IContent } from './Taxonomy';
export declare const PathResponseIsIContent: typeof BasePathResponseIsIContent;
export declare const FetchAdapter: import("axios").AxiosAdapter;
export declare const DefaultAPI: typeof ContentDeliveryAPI;
export declare type API = ContentDeliveryAPI;
export declare type NetworkErrorData = BaseNetworkErrorData;
export declare type PathResponse<T = any, C extends IContent = IContent> = BasePathResponse<T, C>;
export declare type ActionResponse<T = any, C extends IContent = IContent> = BaseActionResponse<T, C>;
export declare type Property<T = any> = _Property<T>;
export declare type StringProperty = _StringProperty;
export declare type NumberProperty = _NumberProperty;
export declare type BooleanProperty = _BooleanProperty;
export declare type ContentReferenceProperty = _ContentReferenceProperty;
export declare type ContentAreaProperty = _ContentAreaProperty;
export declare type LinkListProperty = _LinkListProperty;
export declare type LinkProperty = _LinkProperty;
export declare type ContentReferenceListProperty = _Property<ContentLink[]>;
