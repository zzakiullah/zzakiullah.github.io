import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class Modal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isHidden: true,
            isOpen: false,
            showOverlay: false,
            lastButton: null,
            timesOpened: 0
        };

        this.open = function() {
            this.setState({ isHidden: false });
            setTimeout(function() {
                this.setState({ showOverlay: true });
            }.bind(this), 10);
            setTimeout(function() {
                this.setState({ isOpen: true });
            }.bind(this), 160);
        }.bind(this);

        this.close = function() {
            this.setState({ isOpen: false });
            setTimeout(function() {
                this.setState({ showOverlay: false });
            }.bind(this), 150);
            setTimeout(function() {
                this.setState({ timesOpened: this.state.timesOpened + 1, isHidden: true });
                if (this.props.close) {
                    this.props.close(false);
                } else {
                    this.props.closeWithIndex(this.props.index);
                }
            }.bind(this), 300);
        }.bind(this);

        this.okay = function() {
            this.close();
        }.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.isOpen) {
            this.open();
        }
    }

    render() {
        let header, okBtn, cancelBtn, message;
        if (this.props.children) {
            if (this.props.heading && this.props.closeBtn) {
                header = <div className='w-full pb-6 flex flex-row justify-between'>
                    <h4 className='text-xl pr-4'>
                        { this.props.heading }
                    </h4>
                    <button onClick={ () => this.close() } className='text-xl text-gray-600 hover:text-gray-500 dark:text-gray-400 dark:hover:text-gray-300'>
                        <FontAwesomeIcon icon={['fas', 'times']} />
                    </button>
                </div>;
            } else if (this.props.heading) {
                header = <div className='w-full pb-6 flex flex-row justify-start'>
                    <h4 className='text-xl'>
                        { this.props.heading }
                    </h4>
                </div>;
            } else if (this.props.closeBtn) {
                header = <div className='w-full pb-6 flex flex-row justify-end'>
                    <button onClick={ () => this.close() } className='text-xl text-gray-600 hover:text-gray-500 dark:text-gray-400 dark:hover:text-gray-300'>
                        <FontAwesomeIcon icon={['fas', 'times']} />
                    </button>
                </div>;
            }
            if (this.props.okBtn) {
                okBtn = <button onClick={ () => this.close() }
                                className='mt-6 px-4 py-2.5 rounded dark:text-white bg-gray-300 hover:bg-gray-400 dark:bg-gray-700 dark:hover:bg-gray-600'>
                    { this.props.okBtn }
                </button>;
            }
            if (this.props.cancelBtn) {
                cancelBtn = <button onClick={ () => this.close() }
                                className='mt-6 mr-2 px-4 py-2.5 rounded dark:text-white bg-gray-100 hover:bg-gray-200 dark:bg-gray-500 dark:hover:bg-gray-400'>
                    { this.props.cancelBtn }
                </button>;
            }
            message = <div className='w-full'>
                { this.props.children }
            </div>;
        } else {
            let index = (this.state.timesOpened < this.props.messages.length ? this.state.timesOpened : this.props.messages.length - 1);
            if (this.props.messages[index]['okButton']) {
                okBtn = <button onClick={ () => this.close() }
                                className='mt-6 px-4 py-2.5 rounded dark:text-white bg-gray-300 hover:bg-gray-400 dark:bg-gray-700 dark:hover:bg-gray-600'>
                    { this.props.messages[index]['okButton'] }
                </button>;
            }
            if (this.props.messages[index]['cancelButton']) {
                cancelBtn = <button onClick={ () => this.close() }
                                    className='mt-6 mr-2 px-4 py-2.5 rounded dark:text-white bg-gray-100 hover:bg-gray-200 dark:bg-gray-500 dark:hover:bg-gray-400'>
                    { this.props.messages[index]['cancelButton'] }
                </button>;
            }
            message = <div className='w-full flex flex-row justify-center items-center'>
                <div className='text-4xl md:text-5xl lg:text-6xl mr-3'>
                    { this.props.messages[index]['emoji'] }
                </div>
                <div className='text-left text-md md:text-lg lg:text-xl'>
                    { this.props.messages[index]['message'] }
                </div>
            </div>;
        }
        return <div onClick={ () => this.close() }
                 className={ 'fixed inset-0 p-4 md:p-8 z-30 overflow-y-auto flex flex-col bg-black dark:bg-gray-700 transition-all' + (this.state.showOverlay ? ' bg-opacity-50 dark:bg-opacity-50' : ' bg-opacity-0 dark:bg-opacity-0') + (this.state.isHidden ? ' hidden' : '') }>
            <div onClick={ (event) => event.stopPropagation() }
                 className={ 'm-auto max-w-2xl px-6 py-6 z-40 rounded-lg flex flex-col dark:text-white bg-white dark:bg-black transition transform' + (this.state.isOpen ? ' scale-100 opacity-100' : ' scale-90 opacity-0') }>
                { header }
                { message }
                <div className='w-full flex flex-row justify-end text-md md:text-lg'>
                    { cancelBtn }
                    { okBtn }
                </div>
            </div>
        </div>;
    }
}

export default Modal;
