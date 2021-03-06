import * as React from 'react';
import styles from './QuickLinkItem.module.scss';
import Dotdotdot from 'react-dotdotdot'

import { Link } from 'office-ui-fabric-react/lib/Link';

import { IQuickLinkItemProps } from './IQuickLinkItemProps';

export default class QuickLinkItem extends React.Component<IQuickLinkItemProps, {}>{

  constructor(props: IQuickLinkItemProps) {
    super(props);
  }

  public render(): JSX.Element {

    const { isAdmin, inlineEdit, fontSize } = this.props;
    const linkSize = {
      fontSize: fontSize + 'px'
    }
    // const dotSpan = {
    //   width: '95%'
    // }
    return (
      <div className={styles.quickLinkItem}>
        <div className={styles.mainDiv}>
          <div className={styles.iconDiv}>
            <i className="ms-Icon ms-Icon32 ms-Icon--Link" aria-hidden="true"></i>
          </div>
          <div className={styles.contentDiv}>
            <Dotdotdot tagName="div" clamp="auto" watch="window" truncationChar="...">
              <span id={"spnContent"+this.props.quickLink.Id} className={styles.contentSpan} style={linkSize}>
                <Link href={this.props.quickLink.URL} target="_blank">{this.props.quickLink.Description}</Link>
              </span>

            {isAdmin && inlineEdit &&
              <span>
                <Link onClick={() => this.props.onGetQuickLinkItem(this.props.quickLink.Id)} >
                  <i className="ms-Icon ms-Icon32 ms-Icon--Edit ms-fontColor-orangeLighter" aria-hidden="true"></i>
                </Link>
              </span>
            }
            </Dotdotdot>
          </div>
        </div>
      </div>
    );
  }

  protected componentShouldUpdate = (newProps: IQuickLinkItemProps) => {
    return (
      this.props.isAdmin !== newProps.isAdmin &&
      this.props.inlineEdit !== newProps.inlineEdit
    );
  }

}
