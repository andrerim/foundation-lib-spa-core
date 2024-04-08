export * as Property from '../Property';
export * from '../Models/Language';
export * from '../Models/LanguageList';
export * from '../Models/Website';
export * from '../Models/WebsiteList';
export * from '../Models/ContentLink';
import * as IContentNS from '../Models/IContent';
export type IContent = IContentNS.default;
export type IContentType = IContentNS.IContentType;
export declare const AbstractIContent: typeof IContentNS.BaseIContent;
export declare const namePropertyIsString: typeof IContentNS.namePropertyIsString;
