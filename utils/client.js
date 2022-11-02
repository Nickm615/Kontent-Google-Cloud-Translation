const kontentManagement = require('@kontent-ai/management-sdk')
require('dotenv').config();
const env = {
    projectId: process.env.PROJECT_ID_DEV,
    managementKey: process.env.MANAGEMENT_KEY_DEV
  }
  


const client = kontentManagement.createManagementClient({
    projectId: env.projectId,
    apiKey: env.managementKey
  })
  
  module.exports = client;