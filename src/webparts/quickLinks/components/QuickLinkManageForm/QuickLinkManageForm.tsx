import * as React from 'react';
import styles from './QuickLinkManageForm.module.scss';
import { autobind } from 'office-ui-fabric-react/lib/Utilities';
import { PrimaryButton, DefaultButton } from 'office-ui-fabric-react/lib/Button';
import { Panel, PanelType } from 'office-ui-fabric-react/lib/Panel';
import { TextField } from 'office-ui-fabric-react/lib/TextField';
import { MessageBar, MessageBarType } from 'office-ui-fabric-react/lib/MessageBar';
import { Overlay } from 'office-ui-fabric-react/lib/Overlay';
import { Spinner, SpinnerSize } from 'office-ui-fabric-react/lib/Spinner';


import { IQuickLinkManageFormProps } from './IQuickLinkManageFormProps';
import { IQuickLinkManageFormState } from './IQuickLinkManageFormState';

export default class QuickLinkManageForm extends React.Component<IQuickLinkManageFormProps, IQuickLinkManageFormState>{

   constructor(props: IQuickLinkManageFormProps) {
      super(props);

   }

   public render(): JSX.Element {
      const { showPanel, isError, isSaved, isOverlayShow } = this.props;
      return (
         <Panel
            isOpen={showPanel}
            type={PanelType.smallFixedFar}
            onDismiss={this.props.onCloseManageScreen}
            closeButtonAriaLabel='Close'
            headerText='Manage Quick Links'
            onRenderFooterContent={this.props.onRenderFooterContent} >
            {isError &&
               <MessageBar messageBarType={MessageBarType.error}>
                  Please fill in all the mandatory fields.
                        </MessageBar>
            }
            {isSaved &&
               <MessageBar messageBarType={MessageBarType.success}>
                  QuickLink saved successfully.
                        </MessageBar>
            }
            <div>
               <TextField
                  label='URL'
                  name="URL"
                  placeholder="Please enter Url"
                  multiline
                  autoAdjustHeight
                  required={true}
                  onChanged={this.props.onHandleURLTextField}
                  value={this.props.quickLinkItem.URL}
                  onGetErrorMessage={this.props.onHandleURLErrorMessage}
               />
               <TextField
                  label='Display Text'
                  name="Desription"
                  placeholder="Please enter Display Text"
                  multiline
                  rows={4}
                  required={true}
                  onChanged={this.props.onHandleDescriptionTextField}
                  value={this.props.quickLinkItem.Description}
                  onGetErrorMessage={this.props.onHandleDisplayTextErrorMessage}
               />
               <TextField
                  label='Notes'
                  name="Notes"
                  placeholder="Please enter Notes if any"
                  multiline
                  rows={4}
                  required={false}
                  onChanged={this.props.onHandleCommentsTextField}
                  value={this.props.quickLinkItem.Comments}
               />
            </div>
            {isOverlayShow &&
               < div style={{ width: '100%', height: '100%' }}>
                  <Overlay
                     isDarkThemed={false}>
                     <div style={{ margin: '0 auto', top: '40%', position: 'relative' }}>
                        <Spinner size={SpinnerSize.large} label='' />
                     </div>
                  </Overlay>
               </div>
            }
         </Panel>
      );
   }

}