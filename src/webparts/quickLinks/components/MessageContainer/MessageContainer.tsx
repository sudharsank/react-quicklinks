import * as React from 'react';
import styles from './MessageContainer.module.scss';
import { MessageScope } from '../Common/enumHelper';
import IMessageContainerProps from './IMessageContainerProps';

export default class MessageContainer extends React.Component<IMessageContainerProps, {}>{
    constructor(props: IMessageContainerProps) {
        super(props);
    }
    public render(): JSX.Element {
        return (
            <div className={styles.MessageContainer}>
                {
                    this.props.MessageScope === MessageScope.Success &&
                    <span className={styles.successMessage}>{this.props.Message}</span>
                }
                {
                    this.props.MessageScope === MessageScope.Failure &&
                    <span className={styles.errorMessage}>{this.props.Message}</span>
                }
                {
                    this.props.MessageScope === MessageScope.Warning &&
                    <span className={styles.warningMessage}>{this.props.Message}</span>
                }
                {
                    this.props.MessageScope === MessageScope.Info &&
                    <span className={styles.infoMessage}>{this.props.Message}</span>
                }
            </div>
        );
    }
}