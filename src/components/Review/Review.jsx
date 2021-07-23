import React,{useState} from 'react';
import { useDispatch } from 'react-redux';
import Rating from '@material-ui/lab/Rating';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Cookies from 'universal-cookie';
import { url } from '../../constantURL';
import axios from 'axios';
import './Review.css'
import {getProductDetail} from '../../Redux/Actions/index'

export default function Review(props) {
    const {idProd}=props
  const [rating, setRating] = useState(0);
  const [comment,setComment]= useState('');
  const dispatch=useDispatch();

    const handleChange=(e)=>{
        e.preventDefault();
        setComment(e.target.value)
    }
    const handleSubmit= async ()=>{
        const body={comment,rating,idProd:idProd};
        const cookie=new Cookies();
        const userId=cookie.get('id');
        try{
            await axios.post(`${url}/review/${userId}`,body);
            alert('Gracias por tu reseña!');
            dispatch(getProductDetail(idProd))
            setRating(0);
            setComment('')
        }catch (err){
            console.log(err);
            alert(err);
        }
    }

  return (
    <div className='general-cont'>
      <Box component="fieldset" mb={3} borderColor="transparent">
        <Typography component="legend">Califica este producto:</Typography>
        <div className='stars'>
            <h2 className='number'>{rating}</h2>
            <Rating
            name="simple-controlled"
            value={rating}
            onChange={(event, newValue) => {
                event.preventDefault();
                setRating(newValue);
            }}
            />
        </div>
        <form className='little-form'>
            <textarea value={comment} onChange={(e)=>handleChange(e)} 
            placeholder='Escribe tu reseña sobre este artículo aqui.' />
            <button onClick={(e)=>{e.preventDefault();handleSubmit()}}>Enviar</button>
        </form>       
      </Box>
    </div>
  );
}




