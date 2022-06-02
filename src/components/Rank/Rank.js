
import React from 'react';

const Rank = ({name, entries}) => {
    return (
        <div>
            <div className='white f3'>
                {`Hello ${name}, you have used this site`}
            </div>
            <div className='white f1'>
                {`${entries} times`}
            </div>
        </div>
    );
};


export default Rank;