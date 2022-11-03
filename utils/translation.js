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

const unTranslatedText = 'On July 16, 1969, the Apollo 11 spacecraft launched from the Kennedy Space Center in Florida. Its mission was to go where no human being had gone before—the moon! The crew consisted of Neil Armstrong, Michael Collins, and Buzz Aldrin. The spacecraft landed on the moon in the Sea of Tranquility, a basaltic flood plain, on July 20, 1969. The moonwalk took place the following day. On July 21, 1969, at precisely 10:56 EDT, Commander Neil Armstrong emerged from the Lunar Module and took his famous first step onto the moon’s surface. He declared, “That’s one small step for man, one giant leap for mankind.” It was a monumental moment in human history!';
const translationTarget = 'ru';
translateText(unTranslatedText, translationTarget);
async function translateText(text, target) {
    // Translates the text into the target language. "text" can be a string for
    // translating a single piece of text, or an array of strings for translating
    // multiple texts.
    let [translations] = await translate.translate(text, target);
    translations = Array.isArray(translations) ? translations : [translations];
    console.log('Translations:');
    translations.forEach((translation, i) => {
      console.log(`${text} => (${target}) ${translation}`)
    });
    return translations

  }

  module.exports = translateText;