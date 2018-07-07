import * as React from 'react';
import styles from './QuickLinkAddLink.module.scss';

import { Link } from 'office-ui-fabric-react/lib/Link';

import { IQuickLinkAddProps } from './IQuickLinkAddProps';

export default class QuickLinkAdd extends React.Component<IQuickLinkAddProps, {}>{
   
   constructor(props: IQuickLinkAddProps){
      super(props);
   }

   public render(): JSX.Element {
      return (
         <div className={styles.quickLinkAddLink}>
            {
               this.props.isAdmin &&
               <div className={styles.addQuickLinkDiv}>
                  <div className={styles.iconDiv}>
                     <i className="ms-Icon ms-Icon32 ms-Icon--AddTo ms-fontColor-blue" aria-hidden="true"></i>
                  </div>
                  <Link onClick={this.props.onShowManageScreen}>
                     <span className="ms-font-s">Add a QuickLink</span>
                  </Link>
               </div>
            }
         </div>
      );
   }
}