import React from 'react';
import Rating from '@material-ui/lab/Rating';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import './RatingPromedio.css'

export default function RatingPromedio(props) {
    const {reviews}=props
    let quantity=reviews?.length;
    function promedio(array){
        let suma=0;
        let cont=0;
        if(!array.length) return 0;
        for(let i=0;i<array.length;i++){
            suma=suma+parseInt(array[i].rating);
            cont++;
        }
        return suma/cont;
    }
    let prom=0;
    if(quantity) prom=promedio(reviews);

  return (
    <div className='prom'>
      <Box component="fieldset" mb={3} borderColor="transparent">        
        <Rating name="read-only" value={prom} precision={0.5} readOnly />
        <Typography component="legend">De {quantity} reseñas.</Typography>
      </Box>
    </div>
  );
}