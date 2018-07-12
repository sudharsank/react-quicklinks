import * as React from 'react';
import { escape } from '@microsoft/sp-lodash-subset';
import { 
   DisplayMode,
   ServiceScope,
   Environment,
   EnvironmentType
} from '@microsoft/sp-core-library';
import { Overlay } from 'office-ui-fabric-react/lib/Overlay';
import {
   Spinner,
   SpinnerSize
} from 'office-ui-fabric-react/lib/Spinner';
import { WebPartTitle } from "@pnp/spfx-controls-react/lib/WebPartTitle";

import ConfigContainer from '../ConfigContainer/ConfigContainer';
import QuickLinks from '../QuickLinks/QuickLinks';
import MessageContainer from '../MessageContainer/MessageContainer';

import * as strings from 'QuickLinksWebPartStrings';
import styles from './QuickLinksContainer.module.scss';
import { IQuickLinksContainerProps } from './IQuickLinksContainerProps';
import { IQuickLinksContainerState } from './IQuickLinksContainerState';
/** Service Reference */
import { IQuickLink, IPerson } from '../../../../Models';
import {
   IQuickLinkService,
   IUserProfileService
} from '../../../../Interfaces';
import {
   MockQuickLinkService,
   QuickLinkService,
   UserProfileService
} from '../../../../DataProviders';
import { MessageScope } from '../Common/enumHelper';

export default class QuickLinksContainer extends React.Component<IQuickLinksContainerProps, IQuickLinksContainerState> {

   private userProfileService: IUserProfileService;
   private quickLinksService: IQuickLinkService;

   /**
    * 
    * @param props 
    */
   constructor(props: IQuickLinksContainerProps) {
      super(props);

      this.state = {
         quickLinkItems: [],
         isAdmin: false,
         isOverlayShow: true,
         error: false,
         msgScope: null,
         message: ""
      };

      let _serviceScope: ServiceScope;
      _serviceScope = this.props.serviceScope;

      _serviceScope.whenFinished((): void => {
         this.userProfileService = _serviceScope.consume(UserProfileService.serviceKey as any) as IUserProfileService;
         this.quickLinksService = _serviceScope.consume(QuickLinkService.serviceKey as any) as IQuickLinkService;
      });
   }

   /**
    * 
    */
   public render(): React.ReactElement<IQuickLinksContainerProps> {
      const { displayMode, listName, inlineEdit, title, updateProperty } = this.props;
      const { isOverlayShow, error, msgScope, message } = this.state;
      return (
         <div className={styles.quickLinks}>
            <div className={"ms-Grid"}>
               <div className={"ms-Grid-row"}>
                  <div className={"ms-Grid-col ms-sm2 ms-md1 ms-lg1"}>
                     <div className="ms-hiddenMdUp">
                        <i className={"ms-Icon ms-Icon--GlobeFavorite " + styles.webpartTitleIcon + " " + styles.webpartTitleIconSM} aria-hidden="true"></i>
                     </div>
                     <div className="ms-hiddenSm">
                        <i className={"ms-Icon ms-Icon--GlobeFavorite " + styles.webpartTitleIcon} aria-hidden="true"></i>
                     </div>
                  </div>
                  <div className={"ms-Grid-col ms-sm10 ms-md11 ms-lg11 " + styles.noLeftPad}>
                     <div className="ms-hiddenMdUp">
                        <WebPartTitle displayMode={displayMode}
                           title={title} className={styles.webpartTitle + " " + styles.webpartTitleSM}
                           updateProperty={updateProperty} />
                     </div>
                     <div className="ms-hiddenSm">
                        <WebPartTitle displayMode={displayMode}
                           title={title} className={styles.webpartTitle}
                           updateProperty={updateProperty} />
                     </div>
                  </div>
               </div>
            </div>
            {listName && isOverlayShow &&
               <div style={{ width: '100%', height: '100px' }}>
                  <Overlay
                     isDarkThemed={false}>
                     <div style={{ margin: '0 auto', top: '40%', position: 'relative' }}>
                        <Spinner size={SpinnerSize.large} label='' />
                     </div>
                  </Overlay>
               </div>
            }
            {error &&
               <MessageContainer MessageScope={msgScope} Message={message} />
            }
            {listName && !isOverlayShow && !error &&
               <QuickLinks
                  quickLinksItems={this.state.quickLinkItems}
                  onAddQuickLinkItem={this._addQuickLink}
                  onGetAllQuickLinks={this._getAllQuickLinks}
                  onGetQuickLink={this._getQuickLinkItem}
                  onUpdateQuickLinkItem={this._updateQuickLink}
                  isAdmin={this.state.isAdmin}
                  inlineEdit={inlineEdit} />
            }
            {!listName && displayMode === DisplayMode.Edit &&
               <ConfigContainer
                  buttonText={strings.Configure_ButtonText}
                  currentContext={this.props.currentContext}
                  description={strings.Configure_EditDescription}
                  iconText={strings.Configure_IconText}
                  displayButton={true} />
            }
            {!listName && displayMode === DisplayMode.Read &&
               <ConfigContainer
                  buttonText={strings.Configure_ButtonText}
                  currentContext={this.props.currentContext}
                  description={strings.Configure_PreviewDescription}
                  iconText={strings.Configure_IconText}
                  displayButton={false} />
            }
         </div>
      );
   }

   /**
    * 
    */
   public componentDidMount(): void {
      if (this.props.listName) {
         this.InitialLoad();
      }
   }

   /**
    * 
    * @param prevProps 
    */
   public componentDidUpdate(prevProps: IQuickLinksContainerProps): void {
      if (this.props.listName !== prevProps.listName) {
         this.InitialLoad();
      }
   }

   /**
    * 
    */
   private InitialLoad = () => {
      this._checkListType().then((res: boolean) => {
         if (res) {
            this.setState({
               error: false,
               msgScope: null,
               message: ""
            });
            this._getCurrentUserInfo();
            this._checkUserInOwnerGroup();
            this._getAllQuickLinks();
         }
         else {
            this.setState({
               error: true,
               msgScope: MessageScope.Success,
               message: strings.MSG_InvalidListType
            });
         }
      });
   }

   /**
    * 
    */
   private _checkListType(): Promise<boolean> {
      return new Promise<boolean>((resolve: (res: boolean) => void, reject: (error: any) => void): void => {
         this.quickLinksService.checkListTypeAsQuickLinks(this.props.listName)
            .then((res: boolean) => {
               resolve(res);
            });
      });
   }

   /**
    * 
    */
   private _getAllQuickLinks = () => {
      this.quickLinksService.getAllQuickLinks(this.props.listName)
         .then((links: IQuickLink[]) => {
            //console.log('All Quick Links: ', links);
            this.setState({
               quickLinkItems: links,
               isOverlayShow: false
            });
         });
   }

   /**
    * 
    */
   private _checkUserInOwnerGroup = () => {
      this.userProfileService.checkUserPresentInGroup('', true)
         .then((res: boolean) => {
            if (res) {
               this.setState({
                  isAdmin: res
               });
            }
         });
   }

   /**
    * 
    */
   private _getCurrentUserInfo = () => {
      this.userProfileService.getPropertiesForCurrentUser()
         .then((userInfo: IPerson) => {
            this.setState({
               userDetails: userInfo
            });
         });
   }

   /**
    * 
    */
   private _addQuickLink = (quickLinkItem: IQuickLink): Promise<boolean> => {
      return new Promise<boolean>((resolve: (result: boolean) => void, reject: (errors: any) => void): void => {
         this.quickLinksService.addQuickLink(this.props.listName, quickLinkItem)
            .then((res: boolean) => {
               resolve(res);
            });
      });
   }

   /**
    * 
    */
   private _updateQuickLink = (quickLinkItem: IQuickLink): Promise<boolean> => {
      return new Promise<boolean>((resolve: (result: boolean) => void, reject: (errors: any) => void): void => {
         this.quickLinksService.updateQuickLink(this.props.listName, quickLinkItem)
            .then((res: boolean) => {
               resolve(res);
            });
      });
   }

   /**
    * 
    */
   private _getQuickLinkItem = (quickLinkID: string): Promise<IQuickLink> => {
      return new Promise<IQuickLink>((resolve: (result: IQuickLink) => void, reject: (errors: any) => void): void => {
         this.quickLinksService.getQuickLink(this.props.listName, quickLinkID)
            .then((res: IQuickLink) => {
               resolve(res);
            });
      });
   }
}
