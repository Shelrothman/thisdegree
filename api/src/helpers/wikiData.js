/** helpers for resolvers */

const { v4: uuidv4 } = require('uuid');

const urlStart = 'https://en.wikipedia.org/w/api.php?action=query&prop=revisions&titles=';
const urlEnd = '&rvslots=*&rvprop=content&formatversion=2&format=json';

/*
trying to find all the edge cases of the response
seems to be safe we should always add _(film) to the end of the title
*/



async function getCastFromWiki(movieTitleInput) {
    try {
        let movieTitle = movieTitleInput.replace(/ /g, '') + '_(film)';
        // console.log(movieTitle); // debug
        const response = await fetch(`${urlStart}${movieTitle}${urlEnd}`);
        // console.log("response", response)

        const resObject = await response.json();

        //.'s are allowed in urls.. the thing is the redirect... a redirect to the right page shows up in content so lets first check for that before we parse

        // console.log("resObject", resObject.query.pages[0])

        let content = resObject.query.pages[0].revisions[0].slots.main.content;
        console.log("content", content)
        // if content.toString.includes 'redirect' then we need to get the title from the redirect and then run the fetch again
        if (content.toUpperCase().includes('REDIRECT')) {
            content = await handleRedirect(content);
        }
        
        
        let cast = await parseCastFromContent(content);
        if (cast?.length === 0) return [];
        return cast || [];
    } catch (error) {
        console.error(error);
    }
}

async function handleRedirect(content) {
    try {
        
    } catch (error) {
        
    }
}

// do this by if there is more than one, that list comes back and we can use that list in tthe front to present to the user

async function parseCastFromContent(content) {
    let actorList = [];
    //! if error in here, play with the regex
    try {
        // find all teh casts members in the list in the content- (all the text after '==Cast==' all the way until the next header)
        var castRegex = /== *Cast *==([\s\S]*?)==/g;
        var castSection = castRegex.exec(content)?.[1];
        // console.log(castSection);
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
        // console.log(castList) // debug
        if (castList.length === 0) return [];
        return castList || [];
    } catch (error) {
        console.error(error);
    }
}

module.exports = {
    getCast
}