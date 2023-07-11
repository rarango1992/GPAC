const swaggerAutogen = require('swagger-autogen')()

const outputFile = '../swagger_output.json'
const endpointsFiles = ['../routes/BackendUsers', '../routes/BackendTasks']

swaggerAutogen(outputFile, endpointsFiles)