import React from "react";

export default ({post}) => {
    return (
        <div className='card'>
            <div className="cardbody">
                <h5 className="cardtitle">{post.title}</h5>
            </div>
        </div>
    )
}