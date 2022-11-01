const {getVariant, getTypeId, getContentType} = require('./query');
const { mergeMap, map } = require('rxjs/operators');
let updatedVariant, contentItem, contentType;


async function processWebhook(body){
    const updatedVariantLangID = body.data.items[0].language.id
    const updatedVariantItemID = body.data.items[0].item.id
    if(updatedVariantLangID !== '00000000-0000-0000-0000-000000000000') return;
    const untranslatedVariant = await getVariant(updatedVariantItemID, updatedVariantLangID);
    const typeId = await getTypeId(untranslatedVariant.item.id);
    const contentType = await getContentType(typeId);
    






}

module.exports = processWebhook;