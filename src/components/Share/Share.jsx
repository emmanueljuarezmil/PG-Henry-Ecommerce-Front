import React from 'react';
import {FacebookIcon,FacebookShareButton,TwitterShareButton,TwitterIcon,WhatsappIcon,WhatsappShareButton} from "react-share";

const Share = (props)=>{
    const {name,id}=props;
    const ruta=`https://elgramofono.tk/product/${id}`;
    const quote=`Mira esto increible que encontre en elgramofono.tk!- ${name}`;
    return(
        <div>            
            <FacebookShareButton url={ruta}
             quote={quote} >
                <FacebookIcon round={true} size={40} />
            </FacebookShareButton>
            <TwitterShareButton url={ruta} title={quote}>
                <TwitterIcon  round={true} size={40}/>
            </TwitterShareButton>
            <WhatsappShareButton title={quote} url={ruta}>
                <WhatsappIcon  round={true} size={40}/>
            </WhatsappShareButton>
        </div>
    )

}
export default Share;