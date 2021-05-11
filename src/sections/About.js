import React, { Fragment } from 'react';
import about from '../data/about.json';
import { Modal } from '../components/index';
import zulaikha from '../assets/zulaikha.jpg';
import cups from '../assets/cups.jpg';

class About extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            heading: 'a bit about me',
            subheading: 'while you\'re still here',
            capitalize: this.props.capitalize,
            openCups: false
        };

        this.handleCups = function(doOpen) {
            this.setState({ openCups: doOpen });
        }.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.capitalize !== this.state.capitalize) {
            this.setState({ capitalize: nextProps.capitalize });
        }
    }

    render() {
        let bullets = [];
        for (let i=0; i<about['bullets'].length; i++) {
            bullets.push(
                <li className='my-1'>
                    { about['bullets'][i] }
                </li>
            );
        }
        let skills = [];
        for (let i=0; i<about['skills'].length; i++) {
            skills.push(
                <li className='my-1'>
                    <span className='font-semibold'>{ about['skills'][i]['heading'] }:</span> { about['skills'][i]['content'] }
                </li>
            );
        }
        return <Fragment><div id='about' className='w-full md:w-10/12 pt-24'>
            <h2 className='font-semibold text-4xl md:text-5xl dark:text-white'>
                { this.state.heading }
            </h2>
            <h3 className='mt-2 text-base md:text-md lg:text-lg dark:text-white'>
                { this.state.subheading }
            </h3>
            <div className='w-full mt-6 flex flex-col lg:flex-row items-center justify-center'>
                <div className='px-5 flex flex-col w-full lg:w-auto items-center lg:items-end dark:text-white'>
                    <img src={ zulaikha } alt='Me, Zulaikha Zakiullah'
                         className='w-72 lg:w-98 h-auto shadow-lg transition-transform transform hover:scale-102 duration-300' />
                </div>
                <div className='px-8 md:px-5 mt-4 lg:mt-0 flex flex-col lg:w-auto items-start dark:text-white'>
                    <p className='my-1 text-left'>
                        <span className='line-through'>I don't feel like writing a paragraph, so:</span><br/>
                        I don't think you have time to read a paragraph, so:
                    </p>
                    <ul className='ml-8 text-left list-outside list-disc'>
                        { bullets }
                    </ul>
                    <p className='my-1 text-left'>
                        You can check out my skills if you want:
                    </p>
                    <ul className='ml-8 text-left list-outside list-disc'>
                        { skills }
                    </ul>
                    <p className='my-1 text-left'>
                        🥤 <button onClick={ () => this.handleCups(true) }
                                   className='dark:text-white bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 border-b border-black dark:border-white'>
                            Click here
                        </button> to see a cup tower I made. (I like stacking things.)
                    </p>
                </div>
            </div>
        </div>
        <Modal heading='Lots of Cups' closeBtn isOpen={ this.state.openCups } close={ this.handleCups }>
            <img src={ cups } alt='' className='w-full' />
        </Modal></Fragment>;
    }
}

export default About;
