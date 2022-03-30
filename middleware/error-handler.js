const { CustomAPIError } = require('../errors')
const { StatusCodes } = require('http-status-codes')
const errorHandlerMiddleware = (err, req, res, next) => {
  let customError = {
    statusCode : err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
    msg : err.message || 'Something went wrong.'
  }
  // if (err instanceof CustomAPIError) {
  //   return res.status(err.statusCode).json({ msg: err.message })
  // }
  
  if(err.name === "ValidationError"){
    customError.msg = Object.values(err.errors).map((items)=>items.message).join(', ')
  }

  if(err.name === "CastError"){
    customError.statusCode = StatusCodes.NOT_FOUND
    if(!err.value._id){
    customError.msg = `No item with id ${err.value}`
    }
    else{
      customError.msg = `No item with id ${err.value._id}`
    }
  }
  if(err.code && err.code === 11000){
    customError.statusCode = StatusCodes.BAD_REQUEST
    customError.msg = `Duplicate value in ${Object.keys(err.keyValue)} field, please try another value`
  }
  // return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ err })
  return res.status(customError.statusCode).json({message : customError.msg})

}

module.exports = errorHandlerMiddleware
