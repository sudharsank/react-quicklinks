import { IQuickLink } from '../Models';
export default class MockQuickLinksData {

    public static mockQuickLinks: IQuickLink[] = [
        {
            Id: '1',
            URL: 'https://msdn.microsoft.com/en-us/dn308572.aspx',
            Description: 'MSDN',
            Comments: 'Any Developer. Any App. Any Platform.'
        },
        {
            Id: '2',
            URL: 'https://en.share-gate.com/',
            Description: 'Sharegate',
            Comments: ''
        },
        {
            Id: '3',
            URL: 'https://github.com/',
            Description: 'Github',
            Comments: ''
        },
        {
            Id: '4',
            URL: 'https://www.microsoft.com/en-sg/',
            Description: 'Microsoft',
            Comments: ''
        },
        {
            Id: '5',
            URL: 'https://products.office.com/en-us/sharepoint/collaboration',
            Description: 'SharePoint',
            Comments: ''
        }
    ];

}