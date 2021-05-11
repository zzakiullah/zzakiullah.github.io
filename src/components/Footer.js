import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import links from '../data/links.json';

class Footer extends React.Component {
    render() {
        let socials = [];
        for (let i=0; i<links.length; i++) {
            socials.push(
                <a href={ links[i]['href'] } target='_blank' rel='noreferrer' title={ links[i]['name'] }
                   className='mx-2 p-2 text-2xl hover:text-gray-300'>
                    <FontAwesomeIcon icon={ links[i]['icon'] } />
                </a>
            );
        }
        return <div className='py-20 w-full text-white bg-gray-900'>
            <div>
                { socials }
            </div>
            <p className='mt-10'>
                Copyright &copy; 2021 Zulaikha Zakiullah
            </p>
            <p className='mt-1 flex flex-row justify-center items-center'>
                Made with ☕ and <FontAwesomeIcon icon={['fab', 'react']} className='ml-2 text-xl' style={{ color: '#61dafb' }} />
            </p>
        </div>;
    }
}

export default Footer;
