# JetCategories

`jet-categories` is an abstraction of Jet.com's [taxonomy API](http://developer.jet.com/docs/taxonomy-updates).
The purpose of this module is to reduce the calls to Jet's API. The taxonomy API requires a GET request for each category and a second request to get the


## Installation
```
npm i -s jet-categories
```

## Usage
```
const jet = require('jet-categories');

const architecture = jet.categories[1000002];
architecture.attributes = architecture.attributeIds.reduce((acc, attributeId) => {
    acc.push(jet.attributes[attributeId]);
    return acc;
}, []);

console.log(JSON.stringify(architecture, null, 2));
// Prints
// {
//   "id": "1000002",
//   "name": "Architecture",
//   "parent_id": "1000001",
//   "active": true,
//   "retired": false,
//   "path": "Books & Other Media|Books - Arts & Entertainment|Architecture",
//   "level": "2",
//   "attributeIds": [
//     "19",
//     "30",
//     "50",
//     "202155394368402",
//     "281630177799497"
//   ],
//   "attributes": [
//     {
//       "id": "19",
//       "free_text": false,
//       "variant": true,
//       "description": "Book Format",
//       "display_name": "Format",
//       "values": [
//         "Activity Book",
//         "Audio CD",
//         "Board Book",
//         "Coffee Table",
//         "Digital Audio Book",
//         "eBook",
//         "Hard Cover",
//         "Large Print",
//         "Paperback",
//         "Pop-Up Book",
//         "Touch and Feel Book"
//       ]
//     },
//     {
//       "id": "30",
//       "free_text": false,
//       "variant": false,
//       "description": "Language",
//       "display_name": "Language",
//       "values": [
//         "Afrikaans ",
//         "Albanian ",
//         "Ancient Greek ",
//         "Arabic ",
//         "Armenian ",
//         "Basque ",
//         "Bengali ",
//         "Bulgarian ",
//         "Cantonese Chinese ",
//         "Catalan ",
//         "Chinese ",
//         "Cornish",
//         "Croatian ",
//         "Czech ",
//         "Danish ",
//         "Dutch ",
//         "English ",
//         "Esperanto ",
//         "Estonian ",
//         "Farsi ",
//         "Finnish ",
//         "French ",
//         "Galician ",
//         "Georgian ",
//         "German ",
//         "Greek ",
//         "Hebrew ",
//         "Hindi ",
//         "Hungarian ",
//         "Icelandic ",
//         "Indonesian ",
//         "Irish",
//         "Italian ",
//         "Japanese ",
//         "Kannada ",
//         "Korean ",
//         "Latin ",
//         "Latvian ",
//         "Lithuanian ",
//         "Macedonian ",
//         "Maori ",
//         "Middle English ",
//         "Norwegian ",
//         "Old English ",
//         "Persian ",
//         "Polish ",
//         "Portuguese ",
//         "Romanian ",
//         "Russian ",
//         "Sanskrit ",
//         "Spanish "
//       ]
//     },
//     {
//       "id": "50",
//       "free_text": true,
//       "variant": true,
//       "description": "Size - Free Text",
//       "display_name": "Size"
//     }
//   ]
// }
```
