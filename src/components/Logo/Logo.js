import React from 'react';
import Tilt from 'react-parallax-tilt';
import face from './face.png'
import './Logo.css'

function Logo() {
    return (
        <Tilt className='shadow-2 w4 br3 logo mh4 '>
            <div className='pa3'>
                <img src={face} alt="face" attribute="smashicons" />
            </div>
        </Tilt>
    );
}


export default Logo;