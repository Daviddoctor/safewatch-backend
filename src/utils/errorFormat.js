function processErrors(err) {
    let errors;
    if (err.errors) {
        //mongoose errors array
        for (let errKey in err.errors) {
            err.errors[errKey] = err.errors[errKey].message;
        }
        delete err['_message'];
    } else if (err.code === 11000) {
        let field = err.message.split('index: ')[1];
        field = field.split('_')[0];
        errors = {
            [field]: `Este ${field === 'email' ? 'correo' : field} ya está registrado`
        }
        err.errors = errors;
        delete err['code'];
        delete err['errmsg'];
        delete err['driver'];
        delete err['index'];
    } else if (err.name === 'CastError') {
        //mongoose bad formatted objects
        errors = {
            [err.path]: 'El formato es incorrecto (' + err.path + ' : ' + err.value + ')'
        }
        err.errors = errors;
        err.message = 'El formato es incorrecto';
        delete err['stringValue'];
        delete err['kind'];
        delete err['value'];
        delete err['path'];
    }
    return err;
}

let errorFormat = (params) => {
    let { status, codeValidate, message, internalCode, field, formErrors } = params;
    if (!message && !!field) message = `El campo ${field} es requerido`;
    let response = {
        status,
        data:{
            success: false,
            message: message || (status === 500 ? 'La solicitud no ha sido procesada' : (internalCode === "BDI" ? message || "Faltan campos requeridos" : "El acceso no está autorizado")),
            codeValidate: codeValidate || status,
            internalCode: internalCode || "ERR",    
        }
    }
    if (formErrors && formErrors.stringfy !== "{}") response.data.formErrors = formErrors;
    return response;
}

module.exports = {
    processErrors,
    errorFormat
};