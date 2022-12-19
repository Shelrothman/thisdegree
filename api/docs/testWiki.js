/** file to test/play with parsing the text from wiki response FOR usage in upcoming developement of gql server */
const urlStart = 'https://en.wikipedia.org/w/api.php?action=query&prop=revisions&titles=';
const urlEnd = '&rvslots=*&rvprop=content&formatversion=2&format=json';

async function getCastFromWiki(movieTitle) {
    try {
        const response = await fetch(`${urlStart}${movieTitle}${urlEnd}`);
        const resObject = await response.json();
        const content = resObject.query.pages[0].revisions[0].slots.main.content;
        return content;
    } catch (error) {
        console.error(error);
    }
}

// TODO: constraint to check if its even a movie to begin with before  attempting to fetch the cast
async function parseCastFromContent(content) {
    let actorList = [];
    //! if error in here, play with the regex
    try {
        // find all teh casts members in the list in the content- (all the text after '==Cast==' all the way until the next header)
        var castRegex = /==Cast==([\s\S]*?)==/g;
        var castSection = castRegex.exec(content)[1];
        // console.log(cast);
        // The * after the first \ is a quantifier that indicates that the preceding character (the space) should be matched zero or more times.
        var castMemberRegex = /\* *\[\[[^\[\]\*]+\]\] as/g;
        const matches = castSection.match(castMemberRegex);
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

// parseCastFromContentAI();
// TODO willl need to replace spaces with "_" for users input (on the front end)
// or l ike:: which movie did u mean?
    // select one from list OR enter a new one
// i think below ill use and need to make it mroe performant
parseCastFromContent(TEXT2.main.content).then((actorList) => {
    console.log(actorList);
});

getCastFromWiki('Big_Fish').then((text) => {
    // console.log(text);
    parseCastFromContent(text).then((actorList) => {
        console.log(actorList);
    });
});
