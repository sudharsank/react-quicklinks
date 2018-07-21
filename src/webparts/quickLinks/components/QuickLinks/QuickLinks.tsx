import * as React from 'react';
import styles from './QuickLinks.module.scss';
import { autobind } from 'office-ui-fabric-react/lib/Utilities';
import { PrimaryButton, DefaultButton, IButtonProps } from 'office-ui-fabric-react/lib/Button';

import { IQuickLinksProps } from './IQuickLinksProps';
import { IQuickLinksState } from './IQuickLinksState';

import { IQuickLink } from '../../../../Models';
/** List of Custom Components */
import QuickLinksList from '../QuickLinksList/QuickLinksList';
import QuickLinksDetailsList from '../QuickLinksDetailsList/QuickLinksDetailsList';
import QuickLinkAdd from '../QuickLinkAddLink/QuickLinkAddLink';
import QuickLinkManageForm from '../QuickLinkManageForm/QuickLinkManageForm';

export default class QuickLinks extends React.Component<IQuickLinksProps, IQuickLinksState>{

   constructor(props: IQuickLinksProps, state: IQuickLinksState) {
      super(props);
      this.state = {
         showPanel: false,
         quickLinkItem: { URL: '', Description: '', Comments: '' },
         dirty: false,
         isError: false,
         isSaved: false,
         isEdit: false,
         isOverlayShow: false
      };
   }

   public render(): JSX.Element {
      const { showPanel, isOverlayShow, quickLinkItem, isError, isSaved } = this.state;
      const { quickLinksItems, inlineEdit, isAdmin, displayType } = this.props;
      return (
         <div className={styles.quickLinks}>
            {displayType === "list" &&
               <QuickLinksList
                  quickLinksItems={quickLinksItems}
                  isAdmin={isAdmin}
                  getQuickLinkItem={this._getQuickLinkItem}
                  inlineEdit={inlineEdit} />
            }
            {displayType === "details" && 
               <QuickLinksDetailsList
                  quickLinksItems={quickLinksItems}
                  isAdmin={isAdmin}
                  getQuickLinkItem={this._getQuickLinkItem}
                  inlineEdit={inlineEdit}
                  onShowManageScreen={this._onShowManageScreen} />
            }            
            {inlineEdit && displayType === "list" &&
               <QuickLinkAdd
                  isAdmin={isAdmin}
                  onShowManageScreen={this._onShowManageScreen} />
            }
            <div>
               <QuickLinkManageForm
                  isOverlayShow={isOverlayShow}
                  showPanel={showPanel}
                  quickLinkItem={quickLinkItem}
                  onCloseManageScreen={this._onCloseManageScreen}
                  onRenderFooterContent={this._onRenderFooterContent}
                  onHandleURLTextField={this._handleURLTextField}
                  onHandleURLErrorMessage={this._handleURLErrorMessage}
                  onHandleDescriptionTextField={this._handleDescriptionTextField}
                  onHandleDisplayTextErrorMessage={this._handleDisplayTextErrorMessage}
                  onHandleCommentsTextField={this._handleCommentsTextField}
                  isError={isError}
                  isSaved={isSaved} />
            </div>
         </div>
      );
   }

   @autobind
   private _onShowManageScreen(): void {
      this.setState({
         showPanel: true,
         isError: false,
         isSaved: false,
         isEdit: false,
      });
   }

   @autobind
   private _onCloseManageScreen(): void {
      this.setState({
         showPanel: false,
         dirty: false,
         quickLinkItem: { URL: '', Description: '', Comments: '' },
      });
   }

   @autobind
   private _onRenderFooterContent(): JSX.Element {
      return (
         <div>
            <PrimaryButton
               onClick={this._onSaveQuickLink}
               style={{ 'marginRight': '8px' }}
               text="Save">
            </PrimaryButton>
            <DefaultButton
               onClick={this._onCloseManageScreen}
               text="Cancel" />
         </div>
      );
   }

   @autobind
   private _onSaveQuickLink(): void {
      this.setState({ isSaved: false });
      if (this._checkForValidation()) {
         this.setState({ isOverlayShow: true });
         if (!this.state.isEdit) {
            this.props.onAddQuickLinkItem(this.state.quickLinkItem)
               .then((res: boolean) => {
                  if (res) {
                     this.setState({
                        quickLinkItem: { URL: '', Description: '', Comments: '' },
                        dirty: false,
                        isError: false,
                        isSaved: true,
                        isOverlayShow: false
                     });
                     this.props.onGetAllQuickLinks();
                  }
               });
         }
         else {
            this.props.onUpdateQuickLinkItem(this.state.quickLinkItem)
               .then((res: boolean) => {
                  if (res) {
                     this.setState({
                        quickLinkItem: { URL: '', Description: '', Comments: '' },
                        dirty: false,
                        isError: false,
                        isSaved: true,
                        isOverlayShow: false
                     });
                     setTimeout(() => {
                        this._onCloseManageScreen();
                     }, 1000);
                     this.props.onGetAllQuickLinks();
                  }
               });
         }
      }
   }

   private _handleURLTextField = (newValue: any) => {
      this.setState({ dirty: true });
      this.state.quickLinkItem["URL"] = newValue;
   }

   private _handleDescriptionTextField = (newValue: any) => {
      this.setState({ dirty: true });
      this.state.quickLinkItem["Description"] = newValue;
   }

   private _handleCommentsTextField = (newValue: any) => {
      this.setState({ dirty: true });
      this.state.quickLinkItem["Comments"] = newValue;
   }

   private _handleURLErrorMessage = (value: string): Promise<string> => {
      return new Promise<string>((resolve: (errorMsg: string) => void, reject: (errors: any) => void): void => {
         if (!value && this.state.dirty) {
            this.setState({ isError: true });
            resolve("Please enter the 'URL'");
         }
      });
   }

   private _handleDisplayTextErrorMessage = (value: string): Promise<string> => {
      return new Promise<string>((resolve: (errorMsg: string) => void, reject: (errors: any) => void): void => {
         if (!value && this.state.dirty) {
            this.setState({ isError: true });
            resolve("Please enter 'Display Text'");
         }
      });
   }

   private _checkForValidation = (): boolean => {
      if (!this.state.quickLinkItem.URL || !this.state.quickLinkItem.Description) {
         this.setState({ isError: true });
         return false;
      }
      else {
         this.setState({ isError: false });
         return true;
      }
   }

   private _getQuickLinkItem = (quickLinkID: string): void => {
      this._onShowManageScreenForEdit();
      this.setState({ isOverlayShow: true });
      this.props.onGetQuickLink(quickLinkID)
         .then((quickLinkItem: IQuickLink) => {
            this.setState({
               quickLinkItem: quickLinkItem,
               isOverlayShow: false
            });            
         });
   }

   private _onShowManageScreenForEdit(): void {
      this.setState({
         showPanel: true,
         isError: false,
         isSaved: false,
         isEdit: true
      });
   }
}