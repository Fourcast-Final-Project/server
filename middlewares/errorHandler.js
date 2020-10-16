function errorHandler(err, req, res, next){
    let errors = [];
    let statusCode;
    if(err.name === 'SequelizeValidationError'){
        for(let i = 0; i < err.errors.length; i++){
            errors.push(err.errors[i].message)
        } 
        statusCode = 400
    } else if(err.name === 'SequelizeUniqueConstraintError'){
        errors.push('Email already exists!!')
        statusCode = 400
    } else if(err.name === 'INVALID_TOKEN'){
        errors.push('Your token is invalid!!')
        statusCode = 400
    } else if(err.name === 'AUTHENTICATION_FAILED'){
        errors.push('Your authentication failed!!')
        statusCode = 401
    } else if(err.name === 'NOT_FOUND'){
        errors.push('The data you looking for is not found!!')
        statusCode = 404
    } else if(err.name === 'NOT_AUTHORIZED'){
        errors.push('You are not authorized for this!!')
        statusCode = 401
    } else if(err.name === 'INVALID_EMAIL_OR_PASS'){
        errors.push('Your email or password is wrong!!')
        statusCode = 400
    } else {
        errors.push(err.msg || 'Internal Server Error')
        statusCode = 500
    }
    
    res.status(statusCode).json({ errors })
}

module.exports = errorHandler;