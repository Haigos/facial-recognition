import React from 'react';

    const FaceRecognition = ({ imageUrl, box }) => {
    return (
        <div className='center ma'>
            <div className='absolute mt2'>
                <img id='input-image' className='fix-particles' width='500px' height='auto' src={ imageUrl } alt="" />
                <div className='fix-particles bounding-box' style={{top: box.topRow, right: box.rightCol, bottom: box.bottomRow, left: box.leftCol}}></div>
            </div>
        </div>
    );
};

export default FaceRecognition;