import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class Toggler extends React.Component {
    constructor(props) {
        super(props);
        this.state = { dark: false };
        this.toggleDark = function() {
            this.setState({ dark: !this.state.dark });
            document.getElementById('root').className = (this.state.dark ? '' : 'dark');
        }.bind(this);
    }

    render() {
        return <button className='w-10 h-10 flex flex-row items-center justify-center relative mx-1 px-1 rounded-full select-none hover:bg-gray-300 dark:hover:bg-gray-700' onClick={ () => this.toggleDark() }>
            <FontAwesomeIcon icon={['fas', 'sun']} className='text-gray-600 text-lg md:text-2xl dark:hidden' />
            <FontAwesomeIcon icon={['fas', 'moon']} className='text-white text-lg md:text-2xl hidden dark:block' />
        </button>;
    }
}

export default Toggler;
