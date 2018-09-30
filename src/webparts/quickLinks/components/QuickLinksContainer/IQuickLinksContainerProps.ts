import { IWebPartContext } from '@microsoft/sp-webpart-base';
import { ServiceScope, DisplayMode } from '@microsoft/sp-core-library';

export interface IQuickLinksContainerProps {
  /**
   * Web part display mode. Used for inline editing of the web part title
   */
  displayMode: DisplayMode;
  /**
   * Current context for Configure button
   */
  currentContext: IWebPartContext;
  /**
   * Current context service scope.
   */
  serviceScope: ServiceScope;
  /**
   * Quick Links list name
   */
  listName: string;
  /**
   * Allow inline editing of links
   */
  inlineEdit: boolean;
  /**
   * The title of the web part
   */
  title: string;
  /**
   * Event handler after updating the web part title
   */
  updateProperty: (value: string) => void;
  /**
   * Quick links display type
   */
  displayType: string;
  /**
   * Quick links text size
   */
  fontSize: string;
}
