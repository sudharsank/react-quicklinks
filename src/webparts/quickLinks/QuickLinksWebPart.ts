import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
   BaseClientSideWebPart,
   IPropertyPaneConfiguration,
   PropertyPaneTextField
} from '@microsoft/sp-webpart-base';
/** SP PnP Reference */
import { sp } from '@pnp/sp';
/** Property Pane Controls */
import { PropertyFieldListPicker, PropertyFieldListPickerOrderBy } from '@pnp/spfx-property-controls/lib/PropertyFieldListPicker';
import { CalloutTriggers } from '@pnp/spfx-property-controls/lib/PropertyFieldHeader';
import { PropertyFieldToggleWithCallout } from '@pnp/spfx-property-controls/lib/PropertyFieldToggleWithCallout';
import { PropertyFieldChoiceGroupWithCallout } from '@pnp/spfx-property-controls/lib/PropertyFieldChoiceGroupWithCallout';

import * as strings from 'QuickLinksWebPartStrings';
import QuickLinksContainer from './components/QuickLinksContainer/QuickLinksContainer';
import { IQuickLinksContainerProps } from './components/QuickLinksContainer/IQuickLinksContainerProps';

export interface IQuickLinksWebPartProps {
   title: string;
   listName: string;
   inlineEdit: boolean;
   displayType: string;
}

export default class QuickLinksWebPart extends BaseClientSideWebPart<IQuickLinksWebPartProps> {

   protected onInit(): Promise<void> {
      // Setup the PnP Context
      sp.setup({
         spfxContext: this.context
      });
      return Promise.resolve();
   }

   public render(): void {
      const element: React.ReactElement<IQuickLinksContainerProps> = React.createElement(
         QuickLinksContainer,
         {
            currentContext: this.context,
            serviceScope: this.context.serviceScope,
            displayMode: this.displayMode,
            listName: this.properties.listName,
            inlineEdit: this.properties.inlineEdit,
            title: this.properties.title,
            updateProperty: (value: string) => {
               this.properties.title = value;
            },
            displayType: this.properties.displayType
         }
      );

      ReactDom.render(element, this.domElement);
   }

   protected onDispose(): void {
      ReactDom.unmountComponentAtNode(this.domElement);
   }

   protected get dataVersion(): Version {
      return Version.parse('1.0');
   }

   protected get disableReactivePropertyChanges(): boolean {
      return true;
   }

   private validateListName(value: string): string {
      if (value === null ||
         value.trim().length === 0) {
         return 'Please select the list';
      }
      return '';
   }

   protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
      return {
         pages: [
            {
               header: {
                  description: strings.PropertyPaneDescription
               },
               groups: [
                  {
                     groupName: strings.BasicGroupName,
                     groupFields: [
                        PropertyFieldListPicker('listName', {
                           label: strings.ListNameFieldLabel,
                           selectedList: this.properties.listName,
                           includeHidden: false,
                           orderBy: PropertyFieldListPickerOrderBy.Title,
                           disabled: false,
                           onPropertyChange: this.onPropertyPaneFieldChanged.bind(this),
                           properties: this.properties,
                           context: this.context,
                           onGetErrorMessage: this.validateListName.bind(this),
                           deferredValidationTime: 200,
                           multiSelect: false,
                           key: 'listNameFieldId'
                        }),                        
                        PropertyFieldChoiceGroupWithCallout('displayType', {
                           calloutContent: React.createElement('div', {}, strings.DisplayTypeCalloutContent),
                           calloutTrigger: CalloutTriggers.Hover,
                           key: 'displayTypeFieldId',
                           label: strings.DisplayTypeFieldLabel,
                           options: [{
                             key: 'list',
                             text: 'List',
                             checked: this.properties.displayType === 'list',                             
                           }, {
                             key: 'details',
                             text: 'Detail List',
                             checked: this.properties.displayType === 'details'
                           }]
                         }),
                         PropertyFieldToggleWithCallout('inlineEdit', {
                           calloutTrigger: CalloutTriggers.Hover,
                           key: 'inlineEditFieldId',
                           label: strings.InlineEditFieldLabel,
                           calloutWidth: 250,
                           calloutContent: React.createElement('div', {}, strings.InlineEditCalloutContent),
                           onText: 'Yes',
                           offText: 'No',
                           checked: this.properties.inlineEdit
                        })
                     ]
                  }
               ]
            }
         ]
      };
   }
}
