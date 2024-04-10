import React, { Component, ReactNode } from 'react';
import { ContentReference } from '../Models/ContentLink';
interface LinkProps {
    href: ContentReference;
    className?: string;
    children: React.ReactNode;
}
export default class Link extends Component<LinkProps> {
    render(): ReactNode;
}
export {};
