const americanOnly = require('./american-only.js');
const americanToBritishSpelling = require('./american-to-british-spelling.js');
const americanToBritishTitles = require("./american-to-british-titles.js")
const britishOnly = require('./british-only.js')

class Translator {
    constructor() {
        this.britishDict = { ...americanOnly, ...americanToBritishSpelling };
        this.americanDict = { ...britishOnly, ...this.swapKeyValue(americanToBritishSpelling) };

        this.britishTitlesDict = { ...americanToBritishTitles }
        this.americanTitlesDict = this.swapKeyValue(this.britishTitlesDict)
    }

    capitalizeFirstLetter(text) {
        return text.charAt(0).toUpperCase() + text.slice(1)
    }

    formatTitle(matches, dict) {
        let key = matches.toLowerCase()
        let translateTitle = this.capitalizeFirstLetter(dict[key])
        return `<span class=\"highlight\">${translateTitle}</span>`
    }

    swapKeyValue(dict) {
        return Object.fromEntries(Object.entries(dict).map(([key, value]) => [value, key]))
    }

    execute(text, locale) {
        if (locale == 'american-to-british') {
            let regexColonToDot = /(\d{1,2}):(\d{2})/
            text = text.replace(regexColonToDot, '<span class="highlight">' + '$1.$2' + '</span>');

            let regexTitle = Object.keys(this.britishTitlesDict).map(title => title.replace('.', '\\.')).join("|")
            text = text.replace(new RegExp(regexTitle, "gi"), matches => this.formatTitle(matches, this.britishTitlesDict))

            return text.replace(new RegExp("\\b(" + Object.keys(this.britishDict).join("|") + ")\\b", "gi"), (matches) => `<span class="highlight">${this.britishDict[matches.toLowerCase()]}</span>`)
        } else {
            let regexDotToColon = /(\d{1,2}).(\d{2})/
            text = text.replace(regexDotToColon, '<span class="highlight">' + '$1:$2' + '</span>');

            let regexTitle = "\\b(" + Object.keys(this.americanTitlesDict).join("|") + ")\\b"
            text = text.replace(new RegExp(regexTitle, "gi"), matches => this.formatTitle(matches, this.americanTitlesDict))

            return text.replace(new RegExp("\\b(" + Object.keys(this.americanDict).join("|") + ")\\b", "gi"), (matches) => `<span class="highlight">${this.americanDict[matches.toLowerCase()]}</span>`)
        }
    }
}

module.exports = Translator;