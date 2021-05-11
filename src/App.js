import './styles/App.scss';

import { MainPage } from './pages/index';

import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faBars,
  faExternalLinkAlt,
  faTimes,
  faPlusCircle,
  faMinusCircle,
  faExclamationCircle,
  faPaperPlane,
  faCheckCircle,
  faTimesCircle,
  faFileAlt
} from '@fortawesome/free-solid-svg-icons';
import { faGithub, faLinkedin, faCodepen, faReact } from '@fortawesome/free-brands-svg-icons';

library.add(
  faBars,
  faExternalLinkAlt,
  faTimes,
  faPlusCircle,
  faMinusCircle,
  faExclamationCircle,
  faPaperPlane,
  faCheckCircle,
  faTimesCircle,
  faFileAlt,
  faGithub,
  faLinkedin,
  faCodepen,
  faReact
);

require('dotenv').config();

function App() {
  return (
    <div className='App'>
      <MainPage />
    </div>
  );
}

export default App;
