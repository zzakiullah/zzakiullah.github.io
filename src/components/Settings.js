import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class Settings extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            capitalize: false,
            colour: 'gray',
            font: ''
        };

        this.restoreDefaults = function() {

        }.bind(this);
    }

    componentDidMount() {
        
    }

    componentWillUnmount() {
        
    }

    render() {
        return <div>
            <h2>
                Sorry for offending your eyes.
            </h2>
            <div>
                <input type="checkbox" />
                <label>Capitalize headings</label>
            </div>
            <div>
                <label>Accent Colour:</label>
                <select>
                    <option value="gray" selected>Gray</option>
                    <option value="red">Red</option>
                    <option value="yellow">Yellow</option>
                    <option value="green">Green</option>
                    <option value="blue">Blue</option>
                    <option value="indigo">Indigo</option>
                    <option value="violet">Violet</option>
                </select>
            </div>
            <div>
                <button>
                    Close
                </button>
                <button>
                    Save
                </button>
            </div>
        </div>;
    }
}

export default Settings;
