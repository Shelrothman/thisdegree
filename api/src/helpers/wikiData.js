/** helpers for resolvers */
const urlStart = 'https://en.wikipedia.org/w/api.php?action=query&prop=revisions&titles=';
const urlEnd = '&rvslots=*&rvprop=content&formatversion=2&format=json';
// !!!!!! PU !!!!
//TODO:: needs a LOT more work certain titles will have more than one page... so need to add logic to give user an option to select the correct page
// *need to add way more logic to find the cast properly and where to look if we cant find it in the first place !!!!!
async function getCastFromWiki(movieTitle) {
    try {
        // console.log(movieTitle); // debug
        const response = await fetch(`${urlStart}${movieTitle}${urlEnd}`);
        const resObject = await response.json();
        const content = resObject.query.pages[0].revisions[0].slots.main.content;
        let cast = await parseCastFromContent(content);
        
        if (cast?.length === 0) return [];
        return cast;
    } catch (error) {
        console.error(error);
    }
}


// do this by if there is more than one, that list comes back and we can use that list in tthe front to present to the user

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
        if (matches === null || matches === undefined) {
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

async function getCast(movieTitle) {
    // TODO: add precheck to first see if its in the db already and if it is then get the castList from there
    try {
        let castList = [];
        let actorList = await getCastFromWiki(movieTitle);
        for (let i = 0, max = actorList.length; i < max; i++) {
            castList.push({ id: uuidv4(), name: actorList[i] });
        }
        console.log(castList)
        if (castList.length === 0) return [];
        return castList;
    } catch (error) {
        console.error(error);
    }
}

module.exports = {
    getCast
}