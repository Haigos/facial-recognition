
import React from 'react';

function Navigation({ onRouteChange, isSignedIn }) {


    if (isSignedIn) {
        return (
            <nav className='flex justify-end'>
                <p onClick={() => onRouteChange('signout')} className='f3 dim black underline pa3 link pointer fix-particles'>Sign Out</p>
            </nav>)
    } else {
        return (
            <nav className='flex justify-end'>
                <p onClick={() => onRouteChange('signin')} className='f3 dim black underline pa3 link pointer fix-particles'>Sign In</p>
                <p onClick={() => onRouteChange('register')} className='f3 dim black underline pa3 link pointer fix-particles'>Register</p>
            </nav>
        )
    }


}


export default Navigation;