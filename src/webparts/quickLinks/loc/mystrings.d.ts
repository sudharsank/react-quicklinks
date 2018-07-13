declare interface IQuickLinksWebPartStrings {
  PropertyPaneDescription: string;
  BasicGroupName: string;
  // Property Pane Configuration
  ListNameFieldLabel: string;
  InlineEditFieldLabel: string;
  InlineEditCalloutContent: string;
  DisplayTypeFieldLabel: string;
  DisplayTypeCalloutContent: string;
  // Configuration Container
  Configure_ButtonText: string;
  Configure_EditDescription: string;
  Configure_PreviewDescription: string;
  Configure_IconText: string;
  // Messages
  MSG_InvalidListType: string;
  MSG_NoData: string;
}

declare module 'QuickLinksWebPartStrings' {
  const strings: IQuickLinksWebPartStrings;
  export = strings;
}
