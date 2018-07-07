import { ServiceScope, ServiceKey } from '@microsoft/sp-core-library';

import { IQuickLink } from '../Models';
import { IQuickLinkService } from '../Interfaces';

import MockQuickLinksData from './MockQuickLinksData';

export class MockQuickLinkService implements IQuickLinkService {

    public static quicklinks: IQuickLink[] = MockQuickLinksData.mockQuickLinks;

    public static readonly serviceKey: ServiceKey<IQuickLinkService> = ServiceKey.create<IQuickLinkService>("QL:MockQuickLinkService", MockQuickLinkService);

    constructor(serviceScope: ServiceScope) {

    }

    public getAllQuickLinks(listName: string): Promise<IQuickLink[]> {
        return new Promise<IQuickLink[]>((resolve: (quicklinks: IQuickLink[]) => void, reject: (errors: any) => void): void => {
            resolve(MockQuickLinksData.mockQuickLinks);
        });
    }

    public addQuickLink(listName: string, quickLinkItem: IQuickLink): Promise<boolean> {
        return new Promise<boolean>((resolve: (retResult: boolean) => void, reject: (errors: any) => void): void => {
            let tempQuickLink: IQuickLink = quickLinkItem;
            tempQuickLink.Id = (MockQuickLinksData.mockQuickLinks.length + 1).toString();
            MockQuickLinksData.mockQuickLinks.concat(tempQuickLink);
            resolve(true);
        });
    }

    public getQuickLink(listName: string, quickLinkID: string): Promise<IQuickLink> {
        return new Promise<IQuickLink>((resolve: (quickLinkItem: IQuickLink) => void, reject: (errors: any) => void): void => {
            let resQuickLinkItem: IQuickLink;
            resQuickLinkItem = MockQuickLinksData.mockQuickLinks.filter(ql => ql.Id == quickLinkID)[0];
            resolve(resQuickLinkItem);
        });
    }

    public updateQuickLink(listName: string, quickLinkItem: IQuickLink): Promise<boolean> {
        return new Promise<boolean>((resolve: (retResult: boolean) => void, reject: (errors: any) => void): void => {
            let quickLinkIndex = MockQuickLinksData.mockQuickLinks.indexOf(quickLinkItem, 0);
            MockQuickLinksData.mockQuickLinks[quickLinkIndex] = quickLinkItem;
            resolve(true);
        });
    }
}