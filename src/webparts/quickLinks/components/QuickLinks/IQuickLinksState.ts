import {IQuickLink} from '../../../../Models';
export interface IQuickLinksState{
   showPanel?: boolean;
   quickLinkItem?: IQuickLink;
   dirty?: boolean;
   isError?: boolean;
   isSaved?: boolean;
   isEdit?: boolean;
   isOverlayShow?: boolean;
}