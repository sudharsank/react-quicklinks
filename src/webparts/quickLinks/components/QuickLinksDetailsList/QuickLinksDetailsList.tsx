import * as React from 'react';
import {
   DetailsList,
   DetailsListLayoutMode,
   Selection,
   SelectionMode,
   IColumn
} from 'office-ui-fabric-react/lib/DetailsList';
import { Link } from 'office-ui-fabric-react/lib/Link';
import { CommandBar } from 'office-ui-fabric-react/lib/CommandBar';
import { IContextualMenuItem, ContextualMenu } from 'office-ui-fabric-react/lib/ContextualMenu';

import styles from './QuickLinksDetailsList.module.scss';
import { IQuickLinksDetailsListProps } from './IQuickLinksDetailsListProps';
import { IQuickLinksDetailsListState } from './IQuickLinksDetailsListState';
import { IQuickLink } from '../../../../Models';


export default class QuickLinksDetailsList extends React.Component<IQuickLinksDetailsListProps, IQuickLinksDetailsListState> {
   private _selection: Selection;
   constructor(props: IQuickLinksDetailsListProps) {
      super(props);
      this._selection = new Selection({
         onSelectionChanged: () => this.setState({ selectionDetails: this._getSelectionDetails() })
      });
      this.state = {
         columns: this.buildColumns(),
         selectionDetails: this._getSelectionDetails(),
         selectedItemID: "0"
      };
   }

   public render(): JSX.Element {
      const {isAdmin, inlineEdit, quickLinksItems } = this.props;
      return (
         <div className={styles.quickLinksDetails + " ms-Grid"}>
            <div className="ms-Grid-row">
               {isAdmin && inlineEdit &&
                  <CommandBar items={this._getCommandItems()} />
               }
               <DetailsList
                  items={quickLinksItems}
                  columns={this.state.columns}
                  selectionMode={SelectionMode.single}
                  selection={this._selection}
                  selectionPreservedOnEmptyClick={true}
                  layoutMode={DetailsListLayoutMode.justified}
                  className={styles.detailsList} />
            </div>
         </div>
      );
   }

   protected componentShouldUpdate = (newProps: IQuickLinksDetailsListProps) => {
      return (
         this.props.isAdmin !== newProps.isAdmin &&
         this.props.inlineEdit !== newProps.inlineEdit
      );
   }

   private buildColumns() {
      const _columns: IColumn[] = [
         {
            key: "iconCol",
            name: 'Link Icon',
            headerClassName: 'DetailsListExample-header--FileIcon',
            className: 'DetailsListExample-cell--FileIcon',
            iconClassName: 'DetailsListExample-Header-FileTypeIcon',
            iconName: 'Link',
            isIconOnly: true,
            fieldName: '',
            minWidth: 16,
            maxWidth: 16,
            onRender: () => {
               return <i className="ms-Icon ms-Icon32 ms-Icon--Link" aria-hidden="true"></i>;
            }
         },
         {
            key: 'urlColumn',
            name: 'Url',
            fieldName: '',
            minWidth: 100,
            maxWidth: 150,
            isRowHeader: true,
            isResizable: true,
            data: 'string',
            isPadded: true,
            onRender: (item: IQuickLink) => {
               return <Link href={item.URL} target="_blank">{item.Description}</Link>;
            }
         },
         {
            key: 'notesColumn',
            name: 'Notes',
            fieldName: '',
            minWidth: 100,
            maxWidth: 350,
            isRowHeader: true,
            isResizable: true,
            data: 'string',
            isPadded: true,
            onRender: (item: IQuickLink) => {
               return <span>{item.Comments}</span>;
            }
         },
         // {
         //    key: "editIconCol",
         //    name: 'Edit Icon',
         //    headerClassName: 'DetailsListExample-header--FileIcon',
         //    className: 'DetailsListExample-cell--FileIcon',
         //    iconClassName: 'DetailsListExample-Header-FileTypeIcon',
         //    iconName: 'Edit',
         //    isIconOnly: true,
         //    fieldName: '',
         //    minWidth: 16,
         //    maxWidth: 16,
         //    onRender: () => {
         //       return <i className="ms-Icon ms-Icon32 ms-Icon--Edit ms-fontColor-orangeLighter" aria-hidden="true"></i>;
         //    }
         // },
      ];

      return _columns;
   }

   private _getCommandItems = (): IContextualMenuItem[] => {
      return [
         {
            key: 'addRow',
            text: 'Add',
            iconProps: { iconName: 'Add' },
            onClick: this.props.onShowManageScreen
         },
         {
            key: 'editRow',
            text: 'Edit a QuickLink',
            iconProps: { iconName: 'Edit' },
            onClick: () => {
               if(this.state.selectedItemID !== undefined && this.state.selectedItemID != "0"){
                  this.props.getQuickLinkItem(this.state.selectedItemID)
               } else {
                  console.log("Please select a quick link to edit.");
               }               
            }
         },
         // {
         //    key: 'deleteRow',
         //    text: 'Delete a QuickLink',
         //    iconProps: { iconName: 'Delete' },
         //    //onClick: this._onDeleteRow
         // },
      ];
   }

   private _getSelectionDetails(): string {
      let selection = this._selection.getSelection();
      if (selection !== undefined && selection.length > 0) {
         this.setState({
            selectedItemID: (selection[0] as IQuickLink).Id
         });
         return (selection[0] as IQuickLink).Id;
      }
      return "0";
   }

   private _editSelectedLink() {
      console.log(this.state);
      console.log(this.props);
      // let selectedItemID = this.state.selectionDetails;
      // if(selectedItemID !== undefined && selectedItemID != "0"){
      //    this.props.getQuickLinkItem(selectedItemID);
      // } else {
      //    console.log("Please select the link to edit.");
      // }
   }
}