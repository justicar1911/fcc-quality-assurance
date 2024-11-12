const chai = require('chai');
const chaiHttp = require('chai-http');
const assert = chai.assert;
const server = require('../server.js');

chai.use(chaiHttp);

let Translator = require('../components/translator.js');

suite('Functional Tests', () => {

    // #1
    test('Translation with text and locale fields: POST request to /api/translate', function (done) {
        chai
            .request(server)
            .post('/api/translate')
            .send({
                text: 'Mangoes are my favorite fruit.',
                locale: 'american-to-british'
            })
            .end((err, res) => {
                assert.equal(res.status, 200);
                assert.isObject(res.body, 'Response should be an Object');
                assert.property(res.body, 'text', 'Response should include text');
                assert.equal(res.body.text, 'Mangoes are my favorite fruit.', 'Text message should be match');
                assert.property(res.body, 'translation', 'Response should include translation');
                assert.equal(res.body.translation, 'Mangoes are my <span class="highlight">favourite</span> fruit.', 'Text message should be match');
                done();
            })
    });

    // #2
    test('Translation with text and invalid locale field: POST request to /api/translate', function (done) {
        chai
            .request(server)
            .post('/api/translate')
            .send({
                text: 'Mangoes are my favorite fruit.',
                locale: 'french-to-british'
            })
            .end((err, res) => {
                assert.equal(res.status, 200);
                assert.isObject(res.body, 'Response should be an Object');
                assert.property(res.body, 'error', 'Response should include error');
                assert.equal(res.body.error, 'Invalid value for locale field', 'Error message should be match');
                done();
            })
    });

    // #3
    test('Translation with missing text field: POST request to /api/translate', function (done) {
        chai
            .request(server)
            .post('/api/translate')
            .send({
                locale: 'american-to-british'
            })
            .end((err, res) => {
                assert.equal(res.status, 200);
                assert.isObject(res.body, 'Response should be an Object');
                assert.property(res.body, 'error', 'Response should include error');
                assert.equal(res.body.error, 'Required field(s) missing', 'Error message should be match');
                done();
            })
    });

    // #4
    test('Translation with missing locale field: POST request to /api/translate', function (done) {
        chai
            .request(server)
            .post('/api/translate')
            .send({
                text: 'Mangoes are my favorite fruit.'
            })
            .end((err, res) => {
                assert.equal(res.status, 200);
                assert.isObject(res.body, 'Response should be an Object');
                assert.property(res.body, 'error', 'Response should include error');
                assert.equal(res.body.error, 'Required field(s) missing', 'Error message should be match');
                done();
            })
    });

    // #5
    test('Translation with empty text: POST request to /api/translate', function (done) {
        chai
            .request(server)
            .post('/api/translate')
            .send({
                text: '',
                locale: 'american-to-british'
            })
            .end((err, res) => {
                assert.equal(res.status, 200);
                assert.isObject(res.body, 'Response should be an Object');
                assert.property(res.body, 'error', 'Response should include error');
                assert.equal(res.body.error, 'No text to translate', 'Error message should be match');
                done();
            })
    });

    // #6
    test('Translation with text that needs no translation: POST request to /api/translate', function (done) {
        chai
            .request(server)
            .post('/api/translate')
            .send({
                text: 'No need for translation',
                locale: 'american-to-british'
            })
            .end((err, res) => {
                assert.equal(res.status, 200);
                assert.isObject(res.body, 'Response should be an Object');
                assert.property(res.body, 'text', 'Response should include text');
                assert.equal(res.body.text, 'No need for translation', 'Text message should be match');
                assert.property(res.body, 'translation', 'Response should include translation');
                assert.equal(res.body.translation, 'Everything looks good to me!', 'Text message should be match');
                done();
            })
    });
});
