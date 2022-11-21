const { response } = require('../app');
const client = require('./client');
const postModel = require('./model');

async function getVariant(itemId, langId) {
    const response =  await client.viewLanguageVariant()
    .byItemId(itemId)
    .byLanguageId(langId)
    .toPromise();
    return response;
}

async function getTypeId(itemId){
    const response =  await client.viewContentItem()
        .byItemId(itemId)
        .toPromise();

    return response.data.type.id
  };

async function getContentType(typeId){
    contentItem = result.data;
    const response =   await client
        .viewContentType()
        .byTypeId(typeId)
        .toPromise();

    return  response.data;
  };

async function upsertVariant(translatedVariant, itemId, targetLang){
  const response = await client
    .upsertLanguageVariant()
    .byItemId(itemId)
    .byLanguageCodename(targetLang.codename)
    .withData((builder)=> {
      return translatedVariant.data.elements;
    })
    .toPromise()
    .catch(err=> console.log(err))

    return response

    
    



}
async function updateWorkflow(itemID, languageCodename){
  const response = await client.changeWorkflowOfLanguageVariant()
  .byItemId(itemID)
  .byLanguageCodename(languageCodename)
  .withData(
    {
      "workflow_identifier": {
      "id": "00000000-0000-0000-0000-000000000000"
      },
      "step_identifier": {
      "codename": "translation_review"
      }
      }
  )
  .toPromise();
}
module.exports = {getVariant, getTypeId, getContentType, upsertVariant, updateWorkflow};
