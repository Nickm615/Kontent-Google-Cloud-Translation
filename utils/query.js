const { response } = require('../app');
const client = require('./client');
const postModel = require('./model')
async function getVariant(itemId, langId) {
    const response =  await client.viewLanguageVariant()
    .byItemId(itemId)
    .byLanguageId(langId)
    .toPromise();
    return response.data;
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
  const response = await client
    .upsertLanguageVariant()
    .byItemId(itemId)
    .byLanguageCodename(targetLang)
    .withData(translatedVariant)
    .toPromise()

    console.log('UPSERT UPSERT UPSERTUPSERT UPSERT UPSERTUPSERT UPSERT UPSERTUPSERT UPSERT UPSERTUPSERT UPSERT UPSERT',response)


}
module.exports = {getVariant, getTypeId, getContentType, upsertVariant};
