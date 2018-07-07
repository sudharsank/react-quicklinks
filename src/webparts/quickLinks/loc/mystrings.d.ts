declare interface IQuickLinksWebPartStrings {
  PropertyPaneDescription: string;
  BasicGroupName: string;
  // Property Pane Configuration
  ListNameFieldLabel: string;
  InlineEditFieldLabel: string;
  InlineEditCalloutContent: string;
  // Configuration Container
  Configure_ButtonText: string;
  Configure_EditDescription: string;
  Configure_PreviewDescription: string;
  Configure_IconText: string;
}

declare module 'QuickLinksWebPartStrings' {
  const strings: IQuickLinksWebPartStrings;
  export = strings;
}