const chai = require('chai');
const assert = chai.assert;

const Translator = require('../components/translator.js');


suite('Unit Tests', () => {
    const translator = new Translator();

    // #1
    test('Translate Mangoes are my favorite fruit. to British English', function () {
        assert.equal(translator.execute('Mangoes are my favorite fruit.', 'american-to-british'), 'Mangoes are my <span class="highlight">favourite</span> fruit.', 'Translate to British English should be correct');
    });

    // #2
    test('Translate I ate yogurt for breakfast. to British English', function () {
        assert.equal(translator.execute('I ate yogurt for breakfast.', 'american-to-british'), 'I ate <span class="highlight">yoghurt</span> for breakfast.', 'Translate to British English should be correct');
    });

    // #3
    test('Translate We had a party at my friend\'s condo. to British English', function () {
        assert.equal(translator.execute('We had a party at my friend\'s condo.', 'american-to-british'), 'We had a party at my friend\'s <span class="highlight">flat</span>.', 'Translate to British English should be correct');
    });

    // #4
    test('Translate Can you toss this in the trashcan for me? to British English', function () {
        assert.equal(translator.execute('Can you toss this in the trashcan for me?', 'american-to-british'), 'Can you toss this in the <span class="highlight">bin</span> for me?', 'Translate to British English should be correct');
    });

    // #5
    test('Translate The parking lot was full. to British English', function () {
        assert.equal(translator.execute('The parking lot was full.', 'american-to-british'), 'The <span class="highlight">car park</span> was full.', 'Translate to British English should be correct');
    });

    // #6
    test('Translate Like a high tech Rube Goldberg machine. to British English', function () {
        assert.equal(translator.execute('Like a high tech Rube Goldberg machine.', 'american-to-british'), 'Like a high tech <span class="highlight">Heath Robinson device</span>.', 'Translate to British English should be correct');
    });

    // #7
    test('Translate To play hooky means to skip class or work. to British English', function () {
        assert.equal(translator.execute('To play hooky means to skip class or work.', 'american-to-british'), 'To <span class="highlight">bunk off</span> means to skip class or work.', 'Translate to British English should be correct');
    });

    // #8
    test('Translate No Mr. Bond, I expect you to die. to British English', function () {
        assert.equal(translator.execute('No Mr. Bond, I expect you to die.', 'american-to-british'), 'No <span class="highlight">Mr</span> Bond, I expect you to die.', 'Translate to British English should be correct');
    });

    // #9
    test('Translate Dr. Grosh will see you now. to British English', function () {
        assert.equal(translator.execute('Dr. Grosh will see you now.', 'american-to-british'), '<span class="highlight">Dr</span> Grosh will see you now.', 'Translate to British English should be correct');
    });

    // #10
    test('Translate Lunch is at 12:15 today. to British English', function () {
        assert.equal(translator.execute('Lunch is at 12:15 today.', 'american-to-british'), 'Lunch is at <span class="highlight">12.15</span> today.', 'Translate to British English should be correct');
    });

    // #11
    test('Translate We watched the footie match for a while. to American English', function () {
        assert.equal(translator.execute('We watched the footie match for a while.', 'british-to-american'), 'We watched the <span class="highlight">soccer</span> match for a while.', 'Translate to American English should be correct');
    });

    // #12
    test('Translate Paracetamol takes up to an hour to work. to American English', function () {
        assert.equal(translator.execute('Paracetamol takes up to an hour to work.', 'british-to-american'), '<span class="highlight">Tylenol</span> takes up to an hour to work.', 'Translate to American English should be correct');
    });

    // #13
    test('Translate First, caramelise the onions. to American English', function () {
        assert.equal(translator.execute('First, caramelise the onions.', 'british-to-american'), 'First, <span class="highlight">caramelize</span> the onions.', 'Translate to American English should be correct');
    });

    // #14
    test('Translate I spent the bank holiday at the funfair. to American English', function () {
        assert.equal(translator.execute('I spent the bank holiday at the funfair.', 'british-to-american'), 'I spent the <span class="highlight">public holiday</span> at the <span class="highlight">carnival</span>.', 'Translate to American English should be correct');
    });

    // #15
    test('Translate I had a bicky then went to the chippy. to American English', function () {
        assert.equal(translator.execute('I had a bicky then went to the chippy.', 'british-to-american'), 'I had a <span class="highlight">cookie</span> then went to the <span class="highlight">fish-and-chip shop</span>.', 'Translate to American English should be correct');
    });

    // #16
    test('Translate I\'ve just got bits and bobs in my bum bag. to American English', function () {
        assert.equal(translator.execute('I\'ve just got bits and bobs in my bum bag.', 'british-to-american'), 'I\'ve just got <span class="highlight">odds and ends</span> in my <span class="highlight">fanny pack</span>.', 'Translate to American English should be correct');
    });

    // #17
    test('Translate The car boot sale at Boxted Airfield was called off. to American English', function () {
        assert.equal(translator.execute('The car boot sale at Boxted Airfield was called off.', 'british-to-american'), 'The <span class="highlight">swap meet</span> at Boxted Airfield was called off.', 'Translate to American English should be correct');
    });

    // #18
    test('Translate Have you met Mrs Kalyani? to American English', function () {
        assert.equal(translator.execute('Have you met Mrs Kalyani?', 'british-to-american'), 'Have you met <span class="highlight">Mrs.</span> Kalyani?', 'Translate to American English should be correct');
    });

    // #19
    test('Translate Prof Joyner of King\'s College, London. to American English', function () {
        assert.equal(translator.execute('Prof Joyner of King\'s College, London.', 'british-to-american'), '<span class="highlight">Prof.</span> Joyner of King\'s College, London.', 'Translate to American English should be correct');
    });

    // #20
    test('Translate Tea time is usually around 4 or 4.30. to American English', function () {
        assert.equal(translator.execute('Tea time is usually around 4 or 4.30.', 'british-to-american'), 'Tea time is usually around 4 or <span class="highlight">4:30</span>.', 'Translate to American English should be correct');
    });

    // #21
    test('Highlight translation in Mangoes are my favorite fruit.', function () {
        assert.equal(translator.execute('Mangoes are my favorite fruit.', 'american-to-british'), 'Mangoes are my <span class="highlight">favourite</span> fruit.', 'Highlight should be correct');
    });

    // #22
    test('Highlight translation in I ate yogurt for breakfast.', function () {
        assert.equal(translator.execute('I ate yogurt for breakfast.', 'american-to-british'), 'I ate <span class="highlight">yoghurt</span> for breakfast.', 'Highlight should be correct');
    });

    // #23
    test('Highlight translation in We watched the footie match for a while.', function () {
        assert.equal(translator.execute('We watched the footie match for a while.', 'british-to-american'), 'We watched the <span class="highlight">soccer</span> match for a while.', 'Highlight should be correct');
    });

    // #24
    test('Highlight translation in Paracetamol takes up to an hour to work.', function () {
        assert.equal(translator.execute('Paracetamol takes up to an hour to work.', 'british-to-american'), '<span class="highlight">Tylenol</span> takes up to an hour to work.', 'Highlight should be correct');
    });
});
