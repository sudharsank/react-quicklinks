import { IQuickLink } from '../Models';

export interface IQuickLinkService {
   
   getAllQuickLinks(listName: string): Promise<IQuickLink[]>;

   addQuickLink(listName: string, quickLinkItem: IQuickLink): Promise<boolean>;

   updateQuickLink(listName: string, quickLinkItem: IQuickLink): Promise<boolean>;

   getQuickLink(listName: string, quickLinkID: string): Promise<IQuickLink>;
}