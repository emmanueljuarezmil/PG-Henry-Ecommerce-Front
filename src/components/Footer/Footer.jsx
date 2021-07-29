import React from 'react';
import footer from "../../img/FOOTER.png";
import { Link } from 'react-router-dom';
import './Footer.css';

const imagen3 = 'https://i.ibb.co/WymmN8m/image-3.png';
const imagen5 = 'https://i.ibb.co/ws70nTt/image-5.png';
const imagen6 = 'https://i.ibb.co/8rK2xKn/image-6.png';
const imagen7 = 'https://i.ibb.co/bmXYXtk/image-7.png';

function Footer() {
    return (
        <div className='footer_container'>
            <img src={footer} alt='/' />
            <div className='footer_links'>
                <Link to='/' style={{ color: 'inherit', textDecoration: 'inherit', marginBottom:'1rem'}}> Inicio </Link>
                <Link to='/home' style={{ color: 'inherit', textDecoration: 'inherit', marginBottom:'1rem'}}> Catalogo </Link>
                <Link to='/about' style={{ color: 'inherit', textDecoration: 'inherit'}}> Nosotros </Link>
            </div>
            <div className='contacto_link'>
                <a href="https://facebook.com/" title="Facebook">
                    <img src={imagen7} alt="Facebook" title="Facebook" />
                </a>
                <a href="https://twitter.com/" title="Twitter">
                    <img src={imagen3} alt="Twitter" title="Twitter"/>
                </a>
                <a href="https://linkedin.com/" title="LinkedIn" >
                    <img src={imagen5} alt="LinkedIn" title="LinkedIn"/>
                </a>
                <a href="https://messenger.com/" title="Messenger">
                    <img src={imagen6} alt="Messenger" title="Messenger"/>
                </a>
            </div>
        </div>
    )
}

export default Footer
