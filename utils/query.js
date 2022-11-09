const { response } = require('../app');
const client = require('./client');
const postModel = require('./model')
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

    // console.log(response.data.type.id);
    return response.data.type.id
  };

async function getContentType(typeId){
    contentItem = result.data;
    const response =   await client
        .viewContentType()
        .byTypeId(typeId)
        .toPromise();

    // console.log(response.data);
    return  response.data;
  };

async function upsertVariant(translatedVariant, itemId, targetLang){
  console.log(translatedVariant.data)
  const response = await client
    .upsertLanguageVariant()
    .byItemId(itemId)
    .byLanguageCodename(targetLang.codename)
    .withData((builder)=> {
      return translatedVariant.data.elements;
    })
    .toPromise()
    .catch(err=> console.log(err))

    
    



}
module.exports = {getVariant, getTypeId, getContentType, upsertVariant};
