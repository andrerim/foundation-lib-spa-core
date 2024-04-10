import React, { Component, ReactNode } from 'react';
import { ContentReference, ContentLinkService } from '../Models/ContentLink';

interface LinkProps {
    href: ContentReference
    className?: string
    children: React.ReactNode,
}

export default class Link extends Component<LinkProps>
{
    public render() : ReactNode
    {
        const href : string | null = ContentLinkService.createHref(this.props.href);

        if (href) {
            return <a href={ href } className={ this.props.className } >{ this.props.children }</a>
        }
        return this.props.children;
    }
}