export function validate(input) {
    let errors
    if (!input) {
        errors = 'El nombre de la categoria es requerido'
        return errors
    } else if (!/^[a-zA-Z0-9 ,.\-ñÑáÁéÉíÍóÓúÚ/]+$/.test(input)) {
        errors = 'La categoria es inválida. Solo debe contener letras';
        return errors
    }
    else {
        errors = ''
        return errors
    }     
}