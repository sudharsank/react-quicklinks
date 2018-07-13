import { IQuickLink } from '../../../../Models';
export interface IQuickLinksDetailsListProps {
   quickLinksItems: IQuickLink[];
   isAdmin: boolean;
   getQuickLinkItem: (quickLinkID: string) => void;
   inlineEdit: boolean;
}