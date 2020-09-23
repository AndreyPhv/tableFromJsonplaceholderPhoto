import React from 'react';

export default props => {

    return (
        <div className="d-flex justify-content-center">
            <img src={props.bigImg} alt='color img' />
            <button className="h-25 ml-2" onClick={props.closeBigImg}>Close</button>
        </div>
    )
}
