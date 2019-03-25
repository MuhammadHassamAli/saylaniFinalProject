import React from 'react';
import ProfileHeader from './ProfileHeader';
import About from './About';

export default class Profile extends React.Component {
    render() {
        return (
            <div>
                <ProfileHeader />
                <About />
            </div>
        )
    }
}