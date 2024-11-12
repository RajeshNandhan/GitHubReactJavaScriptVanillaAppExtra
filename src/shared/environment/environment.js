let apiAdditionalServiceEndPoint = ''

if(process.env.NODE_ENV === 'development') {
    apiAdditionalServiceEndPoint = 'http://localhost:6102/api/'
    //apiPersonEndPoint = 'http://localhost:6102/api/person'
}

/*PORT - is set in package json, if it is not set application will run in default 3000*/

export const Environments = {
    NODE_ENV : process.env.NODE_ENV,
    PORT : process.env.PORT,
    apiAdditionalServiceEndPoint : apiAdditionalServiceEndPoint,
}
