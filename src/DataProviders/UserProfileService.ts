import { sp } from "@pnp/sp";
import { ServiceScope, ServiceKey } from '@microsoft/sp-core-library';
/** */
import { IPerson } from '../Models';
import { IUserProfileService } from '../Interfaces';

export class UserProfileService implements IUserProfileService {

   public static readonly serviceKey: ServiceKey<IUserProfileService> = ServiceKey.create<IUserProfileService>("QL:UserProfileService", UserProfileService);

   /**
    * 
    */
   public getPropertiesForCurrentUser(): Promise<IPerson> {
      return new Promise<IPerson>((resolve: (user: IPerson) => void, reject: (error: any) => void) => {
         sp.profiles.myProperties.get()
            .then((res: any) => {
               //console.log(res);
               var userDetails: IPerson = {
                  Title: res.Title,
                  DisplayName: res.DisplayName,
                  AccountName: res.AccountName,
                  Email: res.Email,
                  FirstName: this.getValueFromArray(res.UserProfileProperties, "FirstName"),
                  LastName: this.getValueFromArray(res.UserProfileProperties, "LastName"),
                  PreferredName: this.getValueFromArray(res.UserProfileProperties, "PreferredName"),
                  Manager: this.getValueFromArray(res.UserProfileProperties, "Manager"),
                  AboutMe: this.getValueFromArray(res.UserProfileProperties, "AboutMe"),
                  UserName: this.getValueFromArray(res.UserProfileProperties, "UserName"),
                  DirectReports: res.DirectReports,
                  ExtendedManagers: res.ExtendedManagers,
                  PictureUrl: res.PictureUrl,
                  UserUrl: res.PersonalUrl,
                  MobilePhone: this.getValueFromArray(res.UserProfileProperties, "CellPhone")
               };
               resolve(userDetails);
            });
      });
   }

   /**
    * 
    * @param userLoginNames 
    */
   public getManagers(userLoginNames: string[]): Promise<IPerson[]> {
      return this.getPropertiesForUsers(userLoginNames);
   }
   
   /**
    * 
    * @param userLoginNames 
    */
   public getReports(userLoginNames: string[]): Promise<IPerson[]> {
      return this.getPropertiesForUsers(userLoginNames);
   }
   
   /**
    * 
    * @param photoUrl 
    */
   public getPhotoUrl(photoUrl: string) {
      return `/_layouts/15/userphoto.aspx?size=M&url=${photoUrl}`;
   }

   /**
    * 
    * @param userLoginNames 
    */
   private getPropertiesForUsers(userLoginNames: string[]): Promise<IPerson[]> {
      //console.log(userLoginNames);
      return new Promise<IPerson[]>((resolve, reject) => {
         if (userLoginNames.length > 0) {
            let arrayOfPersons: IPerson[] = [];
            userLoginNames.forEach((userloginname, index) => {
               sp.profiles.getPropertiesFor(userloginname)
                  .then((res: any) => {
                     var userDetails: IPerson = {
                        Title: res.Title,
                        DisplayName: res.DisplayName,
                        AccountName: res.AccountName,
                        FirstName: res.FirstName,
                        LastName: res.LastName,
                        PreferredName: res.PreferredName,
                        Email: res.Email,
                        Manager: res.Manager,
                        AboutMe: res.AboutMe,
                        UserName: res.UserName,
                        DirectReports: res.DirectReports,
                        ExtendedManagers: res.ExtendedManagers,
                        PictureUrl: res.PictureUrl,
                        UserUrl: res.PersonalUrl,
                        MobilePhone: res.MobilePhone
                     };
                     arrayOfPersons.push(userDetails);
                     resolve(arrayOfPersons);
                  });
            });
         }
      });
   }

   /**
    * 
    * @param groupName 
    * @param userLoginName 
    */
   private checkUserInGroup(groupName: string, userLoginName: string): Promise<boolean> {
      return new Promise<boolean>((resolve: (res: boolean) => void, reject: (errors: any) => void): void => {
         let retResult = false;
         sp.web.siteGroups.getByName(groupName).users.get()
            .then((res: any) => {
               if (res.length > 0) {
                  var filteredResults = res.filter(user => user.LoginName == userLoginName);
                  if (filteredResults.length > 0) {
                     retResult = true;
                  }
               }
               resolve(retResult);
            })
            .catch((error: any) => {
               console.log(error);
            });
      });
   }

   /**
    * 
    * @param groupName 
    * @param isOwnerGroup 
    */
   public checkUserPresentInGroup(groupName?: string, isOwnerGroup?: boolean): Promise<boolean> {
      return new Promise<boolean>((resolve: (res: boolean) => void, reject: (errors: any) => void): void => {
         this.getPropertiesForCurrentUser()
            .then((userInfo: IPerson) => {
               if (groupName) {
                  this.checkUserInGroup(groupName, userInfo.AccountName)
                     .then((res: boolean) => {
                        resolve(res);
                     });
               }
               else if (isOwnerGroup) {
                  sp.web.associatedOwnerGroup.get().then((ownerGroup: any) => {
                     this.checkUserInGroup(ownerGroup.Title, userInfo.AccountName)
                        .then((res: boolean) => {
                           resolve(res);
                        });
                  });
               }
            });
      });
   }

   /**
    * 
    * @param arrayObject 
    * @param key 
    */
   private getValueFromArray(arrayObject: any, key: string): string {
      let retString: string = "";
      if (arrayObject.length > 0) {
         if (arrayObject.filter(i => i.Key === key).length > 0) {
            retString = arrayObject.filter(i => i.Key === key)[0].Value;
         }
      }
      return retString;
   }
}