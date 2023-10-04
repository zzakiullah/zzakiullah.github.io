import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Toggler } from './index';
import links from '../data/links.json';

class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            sections: ['home', 'about', 'experience', 'projects', 'contact'],
            highlight: [false, false, false, false, false],
            currentPage: 0,
            isCollapsed: true
        };

        this.updateCurrentPage = function() {
            for (let i=this.state.sections.length-1; i>=0; i--) {
                if (window.scrollY >= document.getElementById(this.state.sections[i]).offsetTop) {
                    this.setState({ currentPage: i });
                    break;
                }
            }
        }.bind(this);

        this.toggleCollapseMenu = function() {
            this.setState({ isCollapsed: !this.state.isCollapsed });
        }.bind(this);

        this.closeDropdown = function() {
            this.setState({ isCollapsed: true });
        }.bind(this);

        this.animateHighlight = function(show, index) {
            let new_highlight = [...this.state.highlight];
            new_highlight[index] = show;
            this.setState({ highlight: new_highlight });
        }.bind(this);
    }

    componentDidMount() {
        window.addEventListener('scroll', () => this.updateCurrentPage());
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', () => this.updateCurrentPage());
    }

    render() {
        let sections = [];
        for (let i=0; i<this.state.sections.length; i++) {
            let show_highlight = (this.state.currentPage === i) || this.state.highlight[i];
            sections.push(
                <a href={ '#' + this.state.sections[i] } onClick={ () => this.closeDropdown() }
                   onMouseEnter={ () => this.animateHighlight(true, i) } onMouseLeave={ () => this.animateHighlight(false, i) }
                   onFocus={ () => this.animateHighlight(true, i) } onBlur={ () => this.animateHighlight(false, i) }
                   className={ 'mx-3 px-1 relative text-lg md:text-xl text-gray-800 dark:text-white' }>
                    <span className={ 'z-0 transition-all duration-300 bg-gray-400 opacity-50 absolute top-2/3 bottom-0 left-0 ' + (show_highlight ? 'right-0' : 'right-full') }></span>
                    <span className='relative z-10'>
                        { this.state.sections[i] }
                    </span>
                </a>
            );
        }
        return <div className='w-full z-20 fixed inset-x-0 top-0 bg-white dark:bg-gray-900'>
            <div className='w-full mx-auto px-5 xl:px-32 py-1 relative flex flex-row justify-between items-center'>
                <div className='my-4 flex-grow flex flex-row sm:flex-grow-0'>
                    <a href='#home' className='mx-2 px-2 flex flex-row items-center font-semibold text-xl md:text-2xl text-gray-800 hover:text-black dark:text-white dark:hover:text-gray-300'>
                        <img src='logo512.png' alt='' className='w-6 h-6 mr-2.5 dark:hidden' />
                        <img src='logoWhite.png' alt='' className='w-6 h-6 mr-2.5 hidden dark:inline-block' />
                        <span className='hidden sm:inline-block'>Zulaikha Zakiullah</span>
                        <span className='sm:hidden inline-block'>Zulaikha</span>
                    </a>
                </div>
                <div className={ 'lg:ml-auto transition-height overflow-y-hidden lg:h-auto absolute bg-white dark:bg-gray-900 top-full inset-x-0 px-3 lg:static flex flex-col lg:flex-row justify-center items-center' + (this.state.isCollapsed ? ' h-0' : ' h-40') }>
                    { sections }
                    <a href={ links[3]['href'] } target='_blank' rel='noreferrer'
                        className={ 'inline-block lg:hidden mx-2 px-2 text-lg md:text-xl text-gray-800 hover:text-black dark:text-white dark:hover:text-gray-300' }>
                        resume
                    </a>
                </div>
                <div className='flex flex-row justify-center items-center'>
                    <Toggler />
                    <a href={ links[3]['href'] } target='_blank' rel='noreferrer'
                        className='hidden lg:inline-block ml-4 mr-2 px-4 py-2 text-md md:text-lg rounded-md bg-gray-600 text-white hover:bg-gray-500'>
                        resume
                        <FontAwesomeIcon icon={['fas', 'external-link-alt']} className='ml-2 text-sm md:text-md text-gray-400' />
                    </a>
                    <button className='lg:hidden flex items-center mx-2' onClick={ () => this.toggleCollapseMenu() }>
                        <FontAwesomeIcon icon={['fas', 'bars']} className='text-2xl dark:text-white' />
                    </button>
                </div>
            </div>
        </div>;
    }
}

export default Header;
