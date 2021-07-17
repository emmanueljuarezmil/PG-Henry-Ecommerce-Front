export const validate= (obj)=>{
    const emailRegex=/^(([^<>()[\].,;:\s@"]+(.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+.)+[^<>()[\].,;:\s@"]{2,})$/i; 
    let errors={}
    if(!obj.email)errors.email='Email es requerido';
    if(emailRegex.test(obj.email)===false)errors.email='Ingrese un email válido';
    if(!obj.userName)errors.userName='Username es requerido';
    if(!obj.hashedPassword)errors.hashedPassword='Debe escribir una contraseña';
    if(obj.hashedPassword!==obj.repeat)errors.repeat='Las contraseñas deben coincidir';
    return errors;
}