import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import experience from '../data/experience.json';

class Experience extends React.Component {
    constructor(props) {
        super(props);

        let col = [];
        for (let i=0; i<experience.length; i++) {
            col.push(true);
        }

        this.state = {
            heading: 'where I\'ve worked',
            subheading: 'or am currently working',
            collapsed: col
        };

        this.expandOrCollapseAll = function(doCollapse) {
            let col = this.state.collapsed.slice();
            for (let i=0; i<col.length; i++) {
                col[i] = doCollapse;
            }
            this.setState({ collapsed: col });
        }.bind(this);

        this.expandOrCollapseOne = function(index) {
            let col = this.state.collapsed.slice();
            col[index] = !col[index];
            this.setState({ collapsed: col });
        }.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        
    }

    render() {
        let experienceItems = [];
        for (let i=0; i<experience.length; i++) {
            let bullets = [];
            for (let j=0; j<experience[i]['bullets'].length; j++) {
                bullets.push(
                    <li className='my-1'>
                        { experience[i]['bullets'][j] }
                    </li>
                );
            }
            let links = [];
            for (let j=0; j<experience[i]['links'].length; j++) {
                links.push(
                    <a href={ experience[i]['links'][j]['href'] } target='_blank' rel='noreferrer'
                       className='my-1 dark:text-white bg-gray-200 dark:bg-gray-600 hover:bg-gray-300 dark:hover:bg-gray-500 border-b border-black dark:border-white'>
                        { experience[i]['links'][j]['name'] }
                        <FontAwesomeIcon icon={['fas', 'external-link-alt']} className='ml-1.5 text-sm' />
                    </a>
                );
            }
            let label, plusMinus;
            if (this.state.collapsed[i]) {
                label = 'Expand';
                plusMinus = 'plus';
            } else {
                label = 'Collapse';
                plusMinus = 'minus';
            }
            experienceItems.push(
                <div className='w-full md:w-10/12 my-1 flex flex-row'>
                    <div className='w-full flex flex-col'>
                        <div className='w-full px-1 flex flex-row bg-gray-600 dark:bg-gray-600 py-3'>
                            <div className='my-2 px-2 text-left flex flex-row items-center w-full'>
                                <button onClick={ () => this.expandOrCollapseOne(i) } title={ label } aria-label={ label }
                                        className='w-6 h-6 ml-2 mr-4 flex items-center justify-center rounded-full text-white hover:text-gray-300'>
                                    <FontAwesomeIcon icon={['fas', plusMinus + '-circle']} className='text-2xl' />
                                </button>
                                <div className='flex-grow flex flex-col md:flex-row'>
                                    <h4 className='text-lg mr-auto text-white'>
                                        { experience[i]['position'] } @ { experience[i]['company'] }
                                    </h4>
                                    <h6 className='text-md mr-3 text-white'>
                                        { experience[i]['duration'] }
                                    </h6>
                                </div>
                            </div>
                        </div>
                        <div className='w-full flex flex-row'>
                            <div className={ 'flex-grow py-3 pr-2 text-left bg-gray-100 dark:bg-gray-700' + (this.state.collapsed[i] ? ' hidden' : '') }>
                                <ul className='ml-12 mr-8 my-3 text-left list-outside list-disc'>
                                    { bullets }
                                </ul>
                                <div className='ml-12 mr-8 mb-3'>
                                    { links }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            );
        }
        return <div id='experience' className='w-10/12 pt-24'>
            <h2 className='font-semibold text-4xl md:text-5xl dark:text-white'>
                { this.state.heading }
            </h2>
            <h3 className='mt-2 text-base md:text-md lg:text-lg dark:text-white'>
                { this.state.subheading }
            </h3>
            <div className='w-full mt-6 flex flex-col items-center justify-center dark:text-white'>
                <div className='w-full md:w-10/12 flex flex-col sm:flex-row items-center mb-2'>
                    <button onClick={ () => this.expandOrCollapseAll(false) }
                            className='flex-grow w-full sm:w-auto sm:mr-0.5 px-4 py-2 text-center sm:text-right bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600'>
                        expand all
                    </button>
                    <button onClick={ () => this.expandOrCollapseAll(true) }
                            className='flex-grow w-full mt-1.5 sm:mt-0 sm:w-auto sm:ml-0.5 px-4 py-2 text-center sm:text-left bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600'>
                        collapse all
                    </button>
                </div>
                { experienceItems }
            </div>
        </div>;
    }
}

export default Experience;
