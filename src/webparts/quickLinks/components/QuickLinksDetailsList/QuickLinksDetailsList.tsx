import * as React from 'react';
import {
   DetailsList,
   DetailsListLayoutMode,
   SelectionMode,
   IColumn
} from 'office-ui-fabric-react/lib/DetailsList';
import { Link } from 'office-ui-fabric-react/lib/Link';
import { IQuickLinksDetailsListProps } from './IQuickLinksDetailsListProps';
import { IQuickLinksDetailsListState } from './IQuickLinksDetailsListState';
import { IQuickLink } from '../../../../Models';

export default class QuickLinksDetailsList extends React.Component<IQuickLinksDetailsListProps, IQuickLinksDetailsListState> {
   constructor(props: IQuickLinksDetailsListProps) {
      super(props);
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
            isRowHeader: true,
            isResizable: true,
            data: 'string',
            isPadded: true,
            onRender: (item: IQuickLink) => {
               return <span>{item.Comments}</span>;
            }
         },
      ];
      this.state = {
         columns: _columns
      };
   }

   public render(): JSX.Element {
      return (
         <div className="ms-Grid">
            <div className="ms-Grid-row">
               <DetailsList
                  items={this.props.quickLinksItems}
                  columns={this.state.columns}
                  selectionMode={SelectionMode.none}
                  selectionPreservedOnEmptyClick={false}
                  layoutMode={DetailsListLayoutMode.justified} />
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
}