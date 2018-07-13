import {IQuickLink} from '../../../../Models';
export interface IQuickLinksProps {
   quickLinksItems: IQuickLink[];    
   quickLinkItem?: IQuickLink;
   onAddQuickLinkItem(quickLinkItem: IQuickLink): Promise<boolean>;
   onUpdateQuickLinkItem(quickLinkItem: IQuickLink): Promise<boolean>;
   onGetAllQuickLinks: () => void;
   onGetQuickLink: (quickLinkID: string) => Promise<IQuickLink>;
   isAdmin?: boolean;
   inlineEdit: boolean;
   displayType: string;
}