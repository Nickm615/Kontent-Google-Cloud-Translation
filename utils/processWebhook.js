const {getVariant, upsertVariant, updateWorkflow} = require('./query');
const translateText = require('./translation');
let updatedVariant, contentItem, contentType;
const createPostModel = require('./model')
const postModel = createPostModel();
const supportedLanguages = [
{codename: 'fr', id:'99f062d5-3f7b-4bb1-9215-cea244f704e6'}, 
{codename: 'es', id:'7a43f993-44f8-4b5b-b21b-90f2ee6b25e6'}, 
{codename: 'de', id:'bff65a26-2a59-4d99-8151-92284efd5c6f'}
] 

async function processWebhook(body){
    
    const updatedVariantLangID = body.data.items[0].language.id
    const updatedVariantItemID = body.data.items[0].item.id
    if(updatedVariantLangID !== '00000000-0000-0000-0000-000000000000') return;
    //get untrans variant
    const untranslatedVariant = await getVariant(updatedVariantItemID, updatedVariantLangID);
    //from untrans variant, get all values for elements that need translation. This is hard coded for the Post type, but could compare element ids using the PostModel to allow for changes to the Post type
    elementsForTranslation = [untranslatedVariant.data.elements[0].value, untranslatedVariant.data.elements[5].value];
    translateToAllLanguages(elementsForTranslation, untranslatedVariant, updatedVariantItemID);

}

async function translateToAllLanguages(elementsForTranslation, untranslatedVariant, updatedVariantItemID){
    supportedLanguages.map(async function(targetLang) {
        let translatedVariant = untranslatedVariant;
        const translationOutput = await translateText(elementsForTranslation, targetLang.codename);
        translatedVariant.data.elements[0].value = translationOutput[0];
        translatedVariant.data.elements[5].value = translationOutput[1];
        translatedVariant.data.language.id = targetLang.id;
        upsertVariant(translatedVariant, updatedVariantItemID, targetLang).then(async () => {await updateWorkflow(updatedVariantItemID, targetLang.codename)});



   });

}
module.exports = processWebhook;