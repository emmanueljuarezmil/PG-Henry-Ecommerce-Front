import React,{ useEffect } from 'react';


const ReviewList=(props)=>{
    const {reviews}=props;
    // useEffect{}
    return (
        <div>
            <ul>
                {reviews.map(Rev=>{
                    return(
                        <li>
                            <span>{Rev.User}:</span>
                            <p>{Rev.comment}</p>
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}






