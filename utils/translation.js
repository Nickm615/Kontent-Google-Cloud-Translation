const { eventNames } = require('../app');

// Imports the Google Cloud client library
const {Translate} = require('@google-cloud/translate').v2;

//automatically authenticates request using env variable
// Creates a client
const translate = new Translate(
    {
            projectId: 'smooth-ripple-366714', //eg my-project-0o0o0o0o'
    }
);

async function translateText(text, target) {
    // Translates the text into the target language. "text" can be a string for
    // translating a single piece of text, or an array of strings for translating
    // multiple texts.
    let [translations] = await translate.translate(text, target);
    translations = Array.isArray(translations) ? translations : [translations];
    console.log('Translations:');
    translations.forEach((translation, i) => {
      // console.log(`${text} => (${target}) ${translation}`)
    });
    return translations

  }

  module.exports = translateText;