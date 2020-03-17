import React from 'react';


const Navigation = (props) => {
    const { onChange } = props;
    return (
        <div className="navigation">
            <ul className="navigation-list">
                <li onClick={() => onChange('home')}>Home</li>
                <li onClick={() => onChange('events')}>Events</li>
            </ul>
        </div>
    );
}

export default Navigation;
