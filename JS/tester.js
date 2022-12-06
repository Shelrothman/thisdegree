const pJSON = require('./package.json');


function listToSection(obj, section) {
    const listItems = [];
    //  Object.entries(obj).map(([key, value]) => `* ${key}: ${value}`);
    for (const [key, value] of Object.entries(obj)) {
        listItems.push(`${key}: ${value} /n <br />`);
    }
    return (
        `<section>
            <strong>${section}</strong>
            ${listItems}
        </section>`
    )
}

function buildSection() {
    let itemSections = [];
    for (const [key, value] of Object.entries(pJSON)) {
        if (key === 'dependencies' || key === 'devDependencies' || key === 'browserslist' || key === 'author') continue;
        if (key === 'scripts') {
            itemSections.push(listToSection(pJSON.scripts, 'Scripts'));
        } else if (key === 'engines') {
            itemSections.push(listToSection(pJSON.engines, 'Engines'));
        } else {
            itemSections.push(`${key}: ${value}`);
            //<p key={key}>{key}: {value}</p>;
        }
    }
    return itemSections;
}

console.log(buildSection());