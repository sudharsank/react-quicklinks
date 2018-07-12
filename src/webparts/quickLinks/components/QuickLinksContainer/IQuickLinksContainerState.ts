import { IPerson, IQuickLink }   from '../../../../Models';
import { MessageScope }          from '../Common/enumHelper';
export interface IQuickLinksContainerState {
   userDetails?: IPerson;
   quickLinkItems?: IQuickLink[];
   isAdmin?: boolean;
   isOverlayShow: boolean;
   error: boolean;
   msgScope: MessageScope;
   message: string;
}