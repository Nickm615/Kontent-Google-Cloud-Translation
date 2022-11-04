const { response } = require('../app');
const client = require('./client');

async function getVariant(itemId, langId) {
    const response =  await client.viewLanguageVariant()
    .byItemId(itemId)
    .byLanguageId(langId)
    .toPromise();
    // console.log(response.data.elements)
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

  const getLanguagesforTranslation = (result) => {
    contentType = result.data;
    return client
            .listLanguages()
            .toPromise();
  }
module.exports = {getVariant, getTypeId, getContentType};
