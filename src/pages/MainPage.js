import React from 'react';
import { Header, Footer, Modal } from '../components/index';
import { About, Experience, Projects, Contact } from '../sections/index';
import home from '../data/home.json';

class MainPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            openThings: false,
            clickedThat: 0,
            openThat: false,
            clickedHate: 0,
            openHate: false,
            capitalize: false
        };

        this.clickThings = function(doOpen) {
            this.setState({ openThings: doOpen });
        }.bind(this);

        this.isThatIt = function(doOpen) {
            this.setState({ clickedThat: this.state.clickedThat + 1, openThat: doOpen });
        }.bind(this);

        this.hateThis = function(doOpen) {
            this.setState({ clickedHate: this.state.clickedHate + 1, openHate: doOpen });
        }.bind(this);
    }

    render() {
        return <div id='home' className='w-full min-h-full flex flex-col items-center bg-white dark:bg-gray-900'>
            <Header capitalize={ this.state.capitalize } />
            <div className='w-10/12 min-h-screen flex flex-col items-center justify-center'>
                <div className='w-full'>
                    <h3 className='mb-3 text-md md:text-xl dark:text-white'>
                        Hello and welcome to my website. Feel free 
                        to <button onClick={ () => this.clickThings(true) }
                                   className='dark:text-white bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 border-b border-black dark:border-white'>
                            click things
                        </button>.
                    </h3>
                    <h1 className='font-semibold text-3xl sm:text-4xl md:text-5xl lg:text-6xl dark:text-white'>
                        I'm Zulaikha. I make stuff.
                    </h1>
                    <div className='mt-5 flex flex-col sm:flex-row items-center justify-center'>
                        <button className='w-full sm:w-auto mb-2 sm:mb-0 sm:mr-2 px-4 py-2 text-lg md:text-xl lg:text-2xl border border-black rounded hover:bg-gray-50 dark:text-white dark:border-white dark:hover:bg-gray-700'
                                onClick={ () => this.isThatIt(true) }>
                            Is that { (this.state.clickedThat > 0) ? 'really' : '' } it?
                        </button>
                        <button className='w-full sm:w-auto px-4 py-2 text-lg md:text-xl lg:text-2xl border border-black rounded hover:bg-gray-50 dark:text-white dark:border-white dark:hover:bg-gray-700'
                                onClick={ () => this.hateThis(true) }>
                            I { (this.state.clickedHate > 0) ? 'still' : '' } hate this design.
                        </button>
                    </div>
                </div>
            </div>
            <About capitalize={ this.state.capitalize } handleCups={ this.handleCups } />
            <Experience capitalize={ this.state.capitalize } />
            <Projects capitalize={ this.state.capitalize } openProjectModal={ this.openProjectModal } />
            <Contact capitalize={ this.state.capitalize } />
            <Footer />
            <Modal messages={ home['things'] } isOpen={ this.state.openThings } close={ this.clickThings } />
            <Modal messages={ home['that'] } isOpen={ this.state.openThat } close={ this.isThatIt } />
            <Modal messages={ home['hate'] } isOpen={ this.state.openHate } close={ this.hateThis } />
        </div>;
    }
}

export default MainPage;
