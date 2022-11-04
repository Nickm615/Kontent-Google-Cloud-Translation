const {getVariant, getTypeId, getContentType} = require('./query');
const translateText = require('./translation');
let updatedVariant, contentItem, contentType;
const createPostModel = require('./model')
const postModel = createPostModel();

async function processWebhook(body){
    
    const updatedVariantLangID = body.data.items[0].language.id
    const updatedVariantItemID = body.data.items[0].item.id
    if(updatedVariantLangID !== '00000000-0000-0000-0000-000000000000') return;
    const untranslatedVariant = await getVariant(updatedVariantItemID, updatedVariantLangID);
    elementsForTranslation = [untranslatedVariant.elements[0].value, untranslatedVariant.elements[5].value]
    console.log(elementsForTranslation)
    translateToAllLanguages(elementsForTranslation)
    //get untrans variant
    //get type id from the content item
    //get type with id, save element ids
    //from untrans variant, get all values for elements that need translation
    //call for all languages, save an array of language codenames and correlate them to the target that 

    //BETTER IDEA: Create mapped model of content type with element ids ( assuming it doesn't change) google constructor class

}

async function translateToAllLanguages(elementsForTranslation){
    const supportedLanguages = ['fr','es','zh'];
   

   const translationOutput = supportedLanguages.map(async function(targetLang) {
    console.log( await translateText(elementsForTranslation, targetLang))
   });

}

module.exports = processWebhook;