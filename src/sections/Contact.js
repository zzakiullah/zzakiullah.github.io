import React, { Fragment } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Modal } from '../components/index';
import contact from '../data/contact.json';
import emailjs from 'emailjs-com';

class Contact extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            heading: 'message me',
            subheading: 'if you want to talk (or leave a complaint)',
            emails: contact['emails'],
            sending: false,
            missingField: '',
            successModalOpen: false,
            failModalOpen: false
        };
        
        this.submitForm = function(event) {
            event.preventDefault();
            
            /*emailjs.send(process.env.REACT_APP_EMAILJS_SERVICE_ID, process.env.REACT_APP_EMAILJS_TEMPLATE_ID, event.target, process.env.REACT_APP_EMAILJS_USER_ID)
                .then((response) => {
                    alert(`SUCCESS! status: ${response.status} text: ${response.text}`);
                }, (err) => {
                    alert(`FAILED! ${err}`);
                });*/

            let name = document.getElementById('sender-name').value.trim();
            let email = document.getElementById('sender-email').value.trim();
            let message = document.getElementById('sender-message').value.trim();
            let error = false;
    
            if (!name) {
                document.getElementById('sender-name').value = '';
                this.setState({ missingField: 'Name' });
                error = true;
            } else if (!email) {
                document.getElementById('sender-email').value = '';
                this.setState({ missingField: 'Email' });
                error = true;
            } else if (!message) {
                document.getElementById('sender-message').value = '';
                this.setState({ missingField: 'Message' });
                error = true;
            }
            if (error) return;
            this.setState({ missingField: '' });
    
            this.setState({ sending: true });
    
            const serviceID = process.env.REACT_APP_EMAILJS_SERVICE_ID;
            const templateID = process.env.REACT_APP_EMAILJS_TEMPLATE_ID;
            const templateParams = {
                'user_name': name,
                'user_email': email,
                'message': message,
            }
    
            emailjs.send(serviceID, templateID, templateParams)
                .then(function(response) {
                    this.handleSuccessModal(true);
                    document.getElementById('sender-name').value = '';
                    document.getElementById('sender-email').value = '';
                    document.getElementById('sender-message').value = '';
                }.bind(this), function(error) {
                    this.handleFailModal(true);
                }.bind(this));
        }.bind(this);

        this.handleSuccessModal = function(doOpen) {
            this.setState({ successModalOpen: doOpen });
        }.bind(this);

        this.handleFailModal = function(doOpen) {
            this.setState({ failModalOpen: doOpen });
        }.bind(this);
    }

    componentDidMount() {
        emailjs.init(process.env.REACT_APP_EMAILJS_USER_ID);
    }

    componentWillReceiveProps(nextProps) {
        
    }

    render() {
        return <Fragment><div id='contact' className='w-10/12 py-24'>
            <h2 className='font-semibold text-4xl md:text-5xl dark:text-white'>
                { this.state.heading }
            </h2>
            <h3 className='mt-2 text-base md:text-md lg:text-lg dark:text-white'>
                { this.state.subheading }
            </h3>
            <div className='w-full mt-6 flex flex-col items-center justify-center dark:text-white'>
                <h6 className={ 'mb-6 font-semibold text-lg' + (this.state.missingField ? '' : ' hidden') }>
                    <FontAwesomeIcon icon={['fas', 'exclamation-circle']} className='text-red-500 mr-2' />
                    { this.state.missingField } must not be blank!
                </h6>
                <form onSubmit={ (event) => this.submitForm(event) }
                      className='w-11/12 lg:w-7/12 xl:w-1/2'>
                    <div className='flex flex-col md:flex-row'>
                        <div className='mr-1 flex-grow flex flex-col items-start'>
                            <label for='user_name' className='font-semibold text-lg'>
                                name <span className='text-red-500'>*</span>
                            </label>
                            <input id='sender-name' name='user_name'
                                   className='w-full mt-1 px-3 py-2 rounded border border-black dark:bg-gray-700' />
                        </div>
                        <div className='mt-2 md:mt-0 md:ml-1 flex-grow flex flex-col items-start'>
                            <label for='user_email' className='font-semibold text-lg'>
                                email <span className='text-red-500'>*</span>
                            </label>
                            <input id='sender-email' name='user_email' type='email'
                                   className='w-full mt-1 px-3 py-2 rounded border border-black dark:bg-gray-700' />
                        </div>
                    </div>
                    <div className='my-2 flex flex-col items-start'>
                        <label for='message' className='font-semibold text-lg'>
                            message <span className='text-red-500'>*</span>
                        </label>
                        <textarea id='sender-message' name='message' rows='10'
                                  className='w-full mt-1 px-3 py-2 rounded border border-black dark:bg-gray-700' />
                    </div>
                    <div className='flex flex-row justify-end'>
                        <button type='submit'
                                className='px-6 py-2 font-semibold text-lg text-white bg-black hover:bg-gray-700 dark:bg-gray-600 dark:hover:bg-gray-500'>
                            <FontAwesomeIcon icon={['fas', 'paper-plane']} className='-ml-0.5 mr-2' />
                            send
                        </button>
                    </div>
                </form>
                <p className='mt-6 text-lg'>
                    or you can email me
                    at <a href={ 'mailto:' + this.state.emails[0] }
                          className='dark:text-white bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 border-b border-black dark:border-white'>
                        { this.state.emails[0] }
                    </a> or <a href={ 'mailto:' + this.state.emails[1] }
                               className='dark:text-white bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 border-b border-black dark:border-white'>
                        { this.state.emails[1] }
                    </a>
                </p>
            </div>
        </div>
        <Modal okBtn='Dismiss' isOpen={ this.state.successModalOpen } close={ this.handleSuccessModal }>
            <div className='w-full flex flex-col items-center justify-center'>
                <FontAwesomeIcon icon={['fas', 'check-circle']} className='text-7xl text-green-400' />
                <h6 className='text-lg mt-4'>
                    Message sent successfully!<br/>
                    I'll get back to you as soon as I can! 🙂
                </h6>
            </div>
        </Modal>
        <Modal okBtn='Dismiss' isOpen={ this.state.failModalOpen } close={ this.handleFailModal }>
            <div className='w-full flex flex-col items-center justify-center'>
                <FontAwesomeIcon icon={['fas', 'times-circle']} className='text-7xl text-red-400' />
                <h6 className='text-lg mt-4'>
                    Message failed to send! Try again.
                </h6>
            </div>
        </Modal>
        </Fragment>;
    }
}

export default Contact;
