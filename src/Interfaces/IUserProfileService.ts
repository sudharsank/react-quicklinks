import { IPerson } from '../Models';

export interface IUserProfileService {
   
   getPropertiesForCurrentUser: () => Promise<IPerson>;

   getManagers: (userLoginNames: string[]) => Promise<IPerson[]>;

   getReports: (userLoginNames: string[]) => Promise<IPerson[]>;

   getPhotoUrl: (photoUrl: string) => string;

   checkUserPresentInGroup: (groupName?: string, isOwnerGroup?: boolean) => Promise<boolean>;
}