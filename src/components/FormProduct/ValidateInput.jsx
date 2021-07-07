export function validate(input) {
    let errors = {};
    if (!input.name) {
        errors.name = 'Debe escribir el nombre del nuevo producto.';
    } else if (!/([a-z])\w+/.test(input.name)) {
        errors.name = 'El nombre ingresado no es válido, por favor ingrese uno nuevo.';
    }
    else if (!input.description) {
        errors.description = 'Por favor ingrese una descripción en este campo.';
    } else if (!/^([1-9]|[1-9][0-9]|[1-2][0-5][0-5])$/.test(input.description)) {
        errors.description = 'La descripción ingresada no es válida, intentelo nuevamente.';
    }
    else if (!input.stock) {
        errors.stock = 'Elija la cantidad de productos disponibles para la venta.';
    } else if (!/^([5-9]|[1-9][0-9]|[1][0-8][0-9]|[1][9][0])$/.test(input.stock)) {
        errors.stock = 'La cantidad ingresada es erronea, intentelo nuevamente ingresando solo caracteres numéricos.';
    }
    else if (!input.selled) {
        errors.selled = 'La cantidad de items ya vendidos es necesaria para garantizar buenas estadisticas.';
    } else if (!/^([5-9]|[1-9][0-9]|[1-2][0-2][0-9]|[2][3][0])$/.test(input.selled)) {
        errors.selled = 'La cantidad de items vendidos es invalida, por favor ingrese solo caracteres numéricos.';
    }
    else if (!input.price) {
        errors.price = 'Por favor ingrese el precio del item que desea crear.';
    } else if (!/^([5-9]|[1-9][0-9]|[1][0-1][0-6])$/.test(input.price)) {
        errors.price = 'El precio ingresado es inválido, por favor utilice solo caracteres numéricos.';
    }
    else if (!input.perc_desc) {
        errors.perc_desc = 'Por favor ingrese el porcentaje de descuento que quiere aplicar al producto (si no quiere ofrecer descuentos para este producto ingrese 0)';
    } else if (!/^([1-9]|[1-9][0-9]|[1-9][0-9][0-9]|[1-9][0-9][0-9][0-9]|[1-9][0-9][0-9][0-9])$/.test(input.perc_desc)) {
        errors.perc_desc = 'El descuento ingresado es inválido, por favor utilice solo caracteres numéricos.';
    }
    // else if (!input.DRAG&DROP) {
    //     errors.DRAG&DROP = 'DRAG&DROP is required';
    // } else if (!/^([1-9]|[1-9][0-9]|[1][0-9][0-9]|[2][0][0])$/.test(input.DRAG&DROP)) {
    //     errors.DRAG&DROP = 'This DRAG&DROP is invalid, please try again';
    // }
    return errors;
};
