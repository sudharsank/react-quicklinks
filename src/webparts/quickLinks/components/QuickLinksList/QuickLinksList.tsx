import * as React from 'react';

import { IQuickLinksListProps } from './IQuickLinksListProps';
import { IQuickLink } from '../../../../Models';
import QuickLinkItem from '../QuickLinkItem/QuickLinkItem';

export default class QuickLinksList extends React.Component<IQuickLinksListProps, {}>{

   constructor(props: IQuickLinksListProps){
      super(props);
   }

   public render(): JSX.Element{
      return (
         <div>
            {
               this.props.quickLinksItems.map((item: IQuickLink) => {
                  return (
                     <QuickLinkItem
                        key={item.Id}
                        quickLink={item}
                        isAdmin={this.props.isAdmin}
                        onGetQuickLinkItem={this.props.getQuickLinkItem}
                        inlineEdit={this.props.inlineEdit}
                        fontSize={this.props.fontSize} />
                  );
               })
            }
         </div>
      );
   }

   protected componentShouldUpdate = (newProps: IQuickLinksListProps) => {
      return (
         this.props.isAdmin !== newProps.isAdmin &&
         this.props.inlineEdit !== newProps.inlineEdit
      );
   }
}
