import {IQuickLink} from '../../../../Models';
export interface IQuickLinkItemProps {
   quickLink: IQuickLink;
   isAdmin?: boolean;
   onGetQuickLinkItem: (quickLinkID: string) => void;
   inlineEdit: boolean;
}