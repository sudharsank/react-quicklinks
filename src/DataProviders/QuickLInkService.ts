import { sp } from "@pnp/sp";
import { ItemAddResult, ItemUpdateResult } from "@pnp/sp";
import { ServiceScope, ServiceKey } from '@microsoft/sp-core-library';
/** */
import { IQuickLink } from '../Models';
import { IQuickLinkService } from '../Interfaces';

export class QuickLinkService implements IQuickLinkService {

   public static readonly serviceKey: ServiceKey<IQuickLinkService> = ServiceKey.create<IQuickLinkService>("QL:QuickLinkService", QuickLinkService);

   /**
    * To get all the quick links from the list.
    * @param listName 
    */
   public getAllQuickLinks(listName: string): Promise<IQuickLink[]> {
      return new Promise<IQuickLink[]>((resolve: (quicklinks: IQuickLink[]) => void, reject: (errors: any) => void): void => {
         let retQuickLinks: IQuickLink[] = [];
         sp.web.lists.getById(listName).items.get()
            .then((links: any[]) => {
               if (links.length > 0) {
                  links.map((link, index) => {
                     retQuickLinks.push({
                        Id: link.Id,
                        URL: link.URL.Url,
                        Comments: link.Comments,
                        Description: link.URL.Description
                     });
                  });
               }
               resolve(retQuickLinks);
            });
      });
   }

   /**
    * To add a quick link to the list.
    * @param listName 
    * @param quickLinkItem 
    */
   public addQuickLink(listName: string, quickLinkItem: IQuickLink): Promise<boolean> {
      return new Promise<boolean>((resolve: (retResult: boolean) => void, reject: (errors: any) => void): void => {
         sp.web.lists.getById(listName).items.add({
            URL: {
               Url: quickLinkItem.URL,
               Description: quickLinkItem.Description
            },
            Comments: quickLinkItem.Comments
         })
            .then((iar: ItemAddResult) => {
               resolve(true);
            }, (error: any): void => {
               console.log(error);
            });
      });
   }

   /**
    * To get a quick link for update.
    * @param listName 
    * @param quickLinkID 
    */
   public getQuickLink(listName: string, quickLinkID: string): Promise<IQuickLink> {
      return new Promise<IQuickLink>((resolve: (quickLinkItem: IQuickLink) => void, reject: (errors: any) => void): void => {
         let resQuickLinkItem: IQuickLink;
         sp.web.lists.getById(listName).items.getItemByStringId(quickLinkID).get()
            .then((quickLink: any) => {
               resQuickLinkItem = {
                  Id: quickLink.Id,
                  URL: quickLink.URL.Url,
                  Description: quickLink.URL.Description,
                  Comments: quickLink.Comments
               };
               resolve(resQuickLinkItem);
            });
      });
   }

   /**
    * To update the quick link.
    * @param listName 
    * @param quickLinkItem 
    */
   public updateQuickLink(listName: string, quickLinkItem: IQuickLink): Promise<boolean> {
      return new Promise<boolean>((resolve: (retResult: boolean) => void, reject: (errors: any) => void): void => {
         sp.web.lists.getById(listName).items.getById(parseInt(quickLinkItem.Id)).update(
            {
               URL: {
                  Url: quickLinkItem.URL,
                  Description: quickLinkItem.Description
               },
               Comments: quickLinkItem.Comments
            })
            .then((resResult: ItemUpdateResult) => {
               resolve(true);
            }, (error: any): void => {
               console.log(error);
            });
      });

   }

   /**
    * To check whether the selected list is of QuickLinks type.
    * @param listID 
    */
   public checkListTypeAsQuickLinks(listID: string): Promise<boolean> {
      return new Promise<boolean>((resolve: (retResult: boolean) => void, reject: (error: any) => void): void => {
         sp.web.lists.getById(listID).select("BaseTemplate").get()
            .then((listDetails: any) => {
               if (listDetails.BaseTemplate == 103) {
                  resolve(true);
               }
               resolve(false);
            }, (error: any): void => {
               console.log(error);
            });
      });
   }

}