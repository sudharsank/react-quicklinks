import { IPerson, IQuickLink } from '../../../../Models';
export interface IQuickLinksContainerState {
   userDetails?: IPerson;
   quickLinkItems?: IQuickLink[];
   isAdmin?: boolean;
   isOverlayShow: boolean;
}