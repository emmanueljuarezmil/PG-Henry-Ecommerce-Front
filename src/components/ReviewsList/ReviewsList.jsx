import React from 'react';
import Rating from '@material-ui/lab/Rating';
import Box from '@material-ui/core/Box';
import './ReviewList.css';

const ReviewList=(props)=>{
    const {reviews}=props;
    return (
        <div className='comments-list-cont'>
            <ul className='comments-list'>
                {reviews && reviews.map((Rev, index)=>{
                    return(
                        <li className='item' key={index}>
                            <p className='userName'>{Rev.User && Rev.User.userName}</p>
                            <p className='comment'>{Rev.comment}</p>
                            <Box component="fieldset" mb={3} borderColor="transparent">        
                                <Rating name="read-only" value={parseInt(Rev.rating)} readOnly />
                            </Box>
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}

export default ReviewList;




