import { IQuickLink } from '../../../../Models';
export interface IQuickLinksListProps {
   quickLinksItems: IQuickLink[];
   isAdmin: boolean;
   getQuickLinkItem: (quickLinkID: string) => void;
   inlineEdit: boolean;
}