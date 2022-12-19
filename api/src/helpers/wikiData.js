/** helpers for resolvers */

const urlStart = 'https://en.wikipedia.org/w/api.php?action=query&prop=revisions&titles=';
const urlEnd = '&rvslots=*&rvprop=content&formatversion=2&format=json';

async function getCastFromWiki(movieTitle) {
    try {
        // console.log(movieTitle); // debug
        const response = await fetch(`${urlStart}${movieTitle}${urlEnd}`);
        const resObject = await response.json();
        const content = resObject.query.pages[0].revisions[0].slots.main.content;
        let cast = await parseCastFromContent(content);
        return cast;
    } catch (error) {
        console.error(error);
    }
}

async function parseCastFromContent(content) {
    let actorList = [];
    //! if error in here, play with the regex
    try {
        // find all teh casts members in the list in the content- (all the text after '==Cast==' all the way until the next header)
        var castRegex = /==Cast==([\s\S]*?)==/g;
        var castSection = castRegex.exec(content)?.[1];
        // console.log(cast);
        // The * after the first \ is a quantifier that indicates that the preceding character (the space) should be matched zero or more times.
        var castMemberRegex = /\* *\[\[[^\[\]\*]+\]\] as/g;
        const matches = castSection?.match(castMemberRegex);
        // console.log(matches)
        if (matches === null) {
            return [];
        }
        for (let i = 0, max = matches.length; i < max; i++) {
            // removing the '* [[' and ']] as' from the string and the as at the end
            let actorString = matches[i].replace(/\* *\[\[|\]\] as/g, "");
            // if the actorString has a '(' or a '|' in it, then we parse it to get the name and remove the rest
            if (actorString.includes('(') || actorString.includes('|')) {
                let actorRegex = /([^\|\(\)]+)/g;
                let actor = actorRegex.exec(actorString)[1];
                if (actor !== null) actorList.push(actor);
            } else {
                actorList.push(actorString);
            }
        }
    } catch (error) {
        console.error(error);
    }
    // console.log(actorList);
    return actorList;
}

module.exports = {
    getCastFromWiki
}