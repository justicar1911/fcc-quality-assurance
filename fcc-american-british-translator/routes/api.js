'use strict';

const Translator = require('../components/translator.js');

module.exports = function (app) {

  const translator = new Translator();

  app.route('/api/translate')
    .post((req, res) => {
      let { text, locale } = req.body

      if (text == "") {
        return res.status(200).json({ error: 'No text to translate' })
      }

      if (!text || !locale) {
        return res.status(200).json({ error: 'Required field(s) missing' })
      }

      if (!['american-to-british', 'british-to-american'].includes(locale)) {
        return res.status(200).json({ error: 'Invalid value for locale field' })
      }

      let translatedText = translator.execute(text, locale)

      if (text == translatedText) {
        translatedText = "Everything looks good to me!"
      }

      return res.status(200).json({
        text,
        translation: translatedText
      })
    });
};
