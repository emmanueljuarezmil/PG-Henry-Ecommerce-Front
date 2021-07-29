import React from 'react';
import { GoMarkGithub } from "react-icons/go";
import { FaLinkedin } from "react-icons/fa";
import sofi from '../../img/sofi.png';
import gian from '../../img/gian.png';
import iñaki from '../../img/iñaki.png';
import emma from '../../img/emma.png';
import juanpi from '../../img/juanpi.png';
import fer from '../../img/fer.png';
import rodri from '../../img/rodri.png';
import gus from '../../img/gus.png';
import Footer from '../Footer/Footer';
import './About.css';

let develops = [
    {foto: sofi, nombre: 'Sofia Rocchietti', linkedin:'https://www.linkedin.com/in/sofiarocchietti/', github:'https://github.com/sofiarocchietti'},
    {foto: gian, nombre: 'Gianfranco Cucinotta', linkedin:'https://www.linkedin.com/in/gianfranco-cucinotta/', github:'https://github.com/giancucinotta'},
    {foto: iñaki, nombre: 'Iñaki Otegui', linkedin:'https://www.linkedin.com/in/i%C3%B1akiotegui/', github:'https://github.com/inakiotegui'},
    {foto: emma, nombre: 'Emmanuel Juarez', linkedin:'https://www.linkedin.com/in/emmanueljuarezmil/', github:'https://github.com/emmanueljuarezmil'},
    {foto: juanpi, nombre: 'Juan Pablo Retamar', linkedin:'https://www.linkedin.com/in/jpretamar/', github:'https://github.com/jpretamare'},
    {foto: fer, nombre: 'Fernando Perez Diez', linkedin:'https://www.linkedin.com/in/fernando-perez-diez/', github:'https://github.com/ferperezdiez'},
    {foto: rodri, nombre: 'Rodrigo Romero', linkedin:'https://www.linkedin.com/in/rromero96/', github:'https://github.com/rromero96'},
    {foto: gus, nombre: 'Gustavo Riera', linkedin:'https://www.linkedin.com/in/gustavo-riera-fullstackdev/', github:'https://github.com/Gustavitory'}
]

export default function About() {
    let iconStyles = { color: "black", fontSize: "3rem"};
    return (
        <div className='div_padre_10'>
            <h1>Desarrolladores</h1>
            <div className='dev_container'>
                {
                    develops.map((d, i) => (
                        <div className='dev_individual'>
                            <img src={d.foto} alt='' width='330rem'/>
                            <div className='div_nombre'>
                                <h4>{d.nombre}</h4>
                                <div className='div_container_links'>
                                    <a href={d.linkedin} target="_blank" rel="noopener noreferrer"><FaLinkedin style={iconStyles} className='linkedin_icon'/></a>
                                    <a href={d.github} target="_blank" rel="noopener noreferrer"><GoMarkGithub style={iconStyles} className='github_icon'/></a>
                                </div>
                            </div>
                        </div>
                    ))
                }
             </div>
             <Footer/>
        </div>
    )
}
