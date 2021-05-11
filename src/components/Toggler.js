import React from 'react';
import '../styles/components/Toggler.scss';

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
        return <button className='w-16 h-8 flex flex-row items-center justify-between relative mx-2 px-1 bg-gray-600 dark:bg-white rounded-full select-none' onClick={ () => this.toggleDark() }>
            <span>&#x1f31c;</span>
            <span>&#x1f31e;</span>
            <span className={ 'absolute bg-white dark:bg-gray-600 w-6 h-6 rounded-full transition-transform' + (this.state.dark ? ' dark-on' : '') }></span>
        </button>;
    }
}

export default Toggler;
