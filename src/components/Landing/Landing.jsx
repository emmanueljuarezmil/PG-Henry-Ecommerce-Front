import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getAllProducts, getAllCategories } from "../../Redux/Actions";
import CarouselLanding from "../CarouselLanding/CarouselLanding";
import guitarras from "../../img/GUITARRAS.png";
import baterias from "../../img/PERCUSION.png";
import otro from "../../img/OTRO.png";
import otro2 from "../../img/OTRO2.png";
import axios from "axios";
import { url } from "../../constantURL";
import { headers } from "../../controllers/GetHeaders";

const imagesLanding = [guitarras, baterias, otro, otro2];

function Landing(props) {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllProducts());
    dispatch(getAllCategories());
  }, [dispatch]);


  const orderId = localStorage.getItem('orderId')
  useEffect(() => {
    return (async () => {
      try {
        const params = props.location.search;
        const objectParams = new URLSearchParams(params);
        const status = objectParams.get("status");
        if(status) {
          await axios(
            `${url}/user/sendmail?type=${status}&idUser=${headers.idUser}&orderId=${orderId}`
          );
        }        
      } catch (error) {
        console.error(error);
      }
    })();
  }, [props.location.search, orderId]);

  return (
    <div>
      <CarouselLanding images={imagesLanding} />
    </div>
  );
}

export default Landing;
