import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';

import '../styles/toggle.css';
import { useTheme } from '../contexts/ThemeContext';


/**
 * I could not have created this without help from:
 * @cred - https://dev.to/abbeyperini/toggle-dark-mode-in-react-28c9
 */


export default function ThemeToggler() {
    const { dark, toggleDark } = useTheme();

    const handleOnClick = () => {
        toggleDark();
    }

    return (
        <div className="container--toggle mt-2">
            <input
                type="checkbox"
                id="toggle"
                className="toggle--checkbox"
                onClick={handleOnClick}
                defaultChecked={!dark}
            />
            <OverlayTrigger placement="bottom" overlay={<Tooltip id="tooltip-dark-mode">Toggle Dark Mode</Tooltip>}>
                <label htmlFor="toggle" className="toggle--label">
                    <span className="toggle--label-background"></span>
                </label>
            </OverlayTrigger>
        </div>
    )
}