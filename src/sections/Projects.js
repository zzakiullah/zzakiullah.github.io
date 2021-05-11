import React, { Fragment } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import projects from '../data/projects.json';
import { Modal } from '../components/index';
import badges from '../data/badges.json';
import mixitup from 'mixitup';

class Projects extends React.Component {
    constructor(props) {
        super(props);

        let mOpen = [];
        for (let i=0; i<projects['items'].length; i++) {
            mOpen.push(false);
        }

        this.state = {
            heading: 'other stuff I\'ve done',
            subheading: 'that you might find cool ❄️',
            capitalize: this.props.capitalize,
            modalsOpen: mOpen
        };

        this.openProjectModal = function(index) {
            let mOpen = this.state.modalsOpen.slice();
            mOpen[index] = true;
            this.setState({ modalsOpen: mOpen });
        }.bind(this);

        this.closeProjectModal = function(index) {
            let mOpen = this.state.modalsOpen.slice();
            mOpen[index] = false;
            this.setState({ modalsOpen: mOpen });
        }.bind(this);
    }

    componentDidMount() {
        this.mixer = mixitup('.projects-container');
    }

    componentWillReceiveProps(nextProps) {
        if (this.state.capitalize !== nextProps.capitalize) {
            this.setState({ capitalize: nextProps.capitalize });
        }
    }

    render() {
        let projectItems = [],
            projectModals = [],
            itemsObject = projects['items'];
        for (let i=0; i<itemsObject.length; i++) {
            projectItems.push(
                <button onClick={ () => this.openProjectModal(i) }
                        className={ 'mix ' + itemsObject[i]['filters'] + ' group h-32 md:h-48 xl:h-60 relative overflow-hidden' }>
                    <img src={ itemsObject[i]['image'] } alt={ itemsObject[i]['heading'] }
                         className='w-full h-full object-cover'/>
                    <span className='overlay p-8 absolute inset-0 group-hover:opacity-0 transition-opacity flex flex-col items-center justify-center bg-opacity-50 bg-black'>
                        <h4 className='font-semibold text-2xl text-white'>
                            { this.state.capitalize ? itemsObject[i]['heading'] : itemsObject[i]['heading'].toLowerCase() }
                        </h4>
                        <h5 className='text-lg text-white'>
                            { this.state.capitalize ? itemsObject[i]['subheading'] : itemsObject[i]['subheading'].toLowerCase() }
                        </h5>
                    </span>
                </button>
            );

            let projectBadges = [];
            for (let j=0; j<itemsObject[i]['badges'].length; j++) {
                projectBadges.push(
                    <img src={ badges[itemsObject[i]['badges'][j]] } alt={ itemsObject[i]['badges'][j] }
                         className='w-auto h-8 mx-0.5' />
                )
            }

            let projectLinks = [];
            for (let j=0; j<itemsObject[i]['links'].length; j++) {
                projectLinks.push(
                    <a href={ itemsObject[i]['links'][j]['href'] } target='_blank' rel='noreferrer'
                       className='dark:text-white bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 border-b border-black dark:border-white'>
                        { itemsObject[i]['links'][j]['label'] }
                        <FontAwesomeIcon icon={['fas', 'external-link-alt']} className='ml-2' />
                    </a>
                )
            }

            projectModals.push(
                <Modal heading={ itemsObject[i]['heading'] } closeBtn
                       isOpen={ this.state.modalsOpen[i] } index={ i }  closeWithIndex={ this.closeProjectModal }>
                    <div className='-mx-0.5 -mt-2 mb-3 flex flex-row flex-wrap items-start'>
                        { projectBadges }
                    </div>
                    <p className='text-left'>
                        { itemsObject[i]['description'] }
                    </p>
                    <div className='text-right my-2'>
                        { projectLinks } 
                    </div>
                </Modal>
            );
        }
        let projectControls = [],
            controlsObject = projects['controls'];
        for (let i=0; i<controlsObject.length; i++) {
            projectControls.push(
                <button data-filter={ controlsObject[i]['filter'] }
                        className='control project-control sm:mx-3 px-4 py-2 font-semibold text-lg hover:text-white focus:text-white hover:bg-black focus:bg-black dark:text-white dark:hover:bg-gray-600 dark:focus:bg-gray-600'>
                    { this.state.capitalize ? controlsObject[i]['label'] : controlsObject[i]['label'].toLowerCase() }
                </button>
            );
        }
        return <Fragment><div id='projects' className='w-10/12 pt-24'>
            <h2 className='font-semibold text-4xl md:text-5xl dark:text-white'>
                { this.state.heading }
            </h2>
            <h3 className='mt-2 text-base md:text-md lg:text-lg dark:text-white'>
                { this.state.subheading }
            </h3>
            <div className='w-full mt-6 flex flex-col items-center justify-center'>
                <div className='mb-4 flex flex-row items-center justify-center'>
                    { projectControls }
                </div>
                <div className='projects-container w-full sm:w-11/12 xl:w-10/12 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-1'>
                    { projectItems }
                </div>
            </div>
        </div>
        { projectModals }</Fragment>;
    }
}

export default Projects;
