import React from 'react';
import './ImageUrlLink.css'

const ImageUrlLink = ({ onInputChange, onSubmit }) => {
    return (
        <div className='pa3 pt0'>
            <p className='f3'>
                This site detects faces in your pictures. Give it a try!
            </p>
            <div className='center'>
                <div className='fix-particles center form pa4 br3 shadow-5'>
                    <input onChange={onInputChange} className='f4 pa2 w-70 center pr5' type="text" placeholder='Enter image URL here:'/>
                    <button onClick={onSubmit}  className='w-30 grow f4 link pv2 dib white special'>Detect</button>
                </div>
            </div>
        </div>
    );
};


export default ImageUrlLink;