import { IQuickLink } from '../../../../Models';
export interface IQuickLinkManageFormProps {
   quickLinkItem?: IQuickLink;
   //onAddQuickLinkItem(quickLinkItem: IQuickLink): Promise<boolean>;
   //onUpdateQuickLinkItem(quickLinkItem: IQuickLink): Promise<boolean>;

   showPanel: boolean;
   isError?: boolean;
   isSaved?: boolean;
   isOverlayShow: boolean;
   onCloseManageScreen: () => void;
   onRenderFooterContent: () => JSX.Element;
   onHandleURLTextField: (newValue: any) => void;
   onHandleURLErrorMessage: (value: string) => Promise<string>;
   onHandleDescriptionTextField: (newValue: any) => void;
   onHandleDisplayTextErrorMessage: (value: string) => Promise<string>;
   onHandleCommentsTextField: (newValue: any) => void;
}