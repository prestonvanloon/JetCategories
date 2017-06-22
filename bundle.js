'use strict';

const fs = require('fs');
const csv = require('csv-parser');
const _ = require('ramda');

// Attributes
const attributes = {};
const attributeValues = {};
fs.createReadStream('data/AttributeValues.csv')
  .pipe(csv())
  .on('data', data => {
    const attId = data.attribute_id;
    if (attributeValues[attId]) {
      attributeValues[attId].push(data.value);
    } else {
      attributeValues[attId] = [data.value];
    }
  })
  .on('end', () => {
    fs.createReadStream('data/Attributes.csv')
      .pipe(csv())
      .on('data', data => {
        data = _.pick(['id', 'free_text', 'variant', 'description', 'display_name'], data);
        data.id = data.id;
        data.values = attributeValues[data.id];
        data.free_text = data.free_text === 'TRUE';
        data.variant = data.variant === 'TRUE';

        attributes[data.id] = data;
      })
      .on('end', () => {
        fs.writeFile('dist/attributes.json', JSON.stringify(attributes), err => {
          if (err) throw err;
          console.log('Attributes: done');
        });
      });
  });

// Categories
const categories = {};
const categoryAttributeIds = {};
fs.createReadStream('data/CategoryAttributeMapping.csv')
  .pipe(csv())
  .on('data', data => {
    const catId = data.category_id;
    const attId = data.attribute_id;
    if (categoryAttributeIds[catId]) {
      categoryAttributeIds[catId].push(attId);
    } else {
      categoryAttributeIds[catId] = [attId];
    }

  })
  .on('end', () => {
    fs.createReadStream('data/Categories.csv')
      .pipe(csv())
      .on('data', data => {
        data = convertDataProps(data);

        const category = data;
        category.attributeIds = categoryAttributeIds[data.id];
    
        categories[category.id] = category;
      }).on('end', () => {
        fs.writeFile('dist/categories.json', JSON.stringify(categories), err => {
          if (err) throw err;
          console.log('Categories: done');
        })
      });
  });

/**
 * Converts category data from props of 
 *  L0 Node ID,L0 Node Name,L1 Node ID,L1 Node Name,L2 Node ID,L2 Node Name
 * to 
 * id,name,parent_id,active,retired,path
 * @param {*} data 
 */
function convertDataProps(data) {
  // As of 6/21/17, only active categories are present in the spreadsheet.
  return {
    id: data['L2 Node ID'],
    active: true,
    retired: false,
    path: `${data['L0 Node Name']}|${data['L1 Node Name']}|${data['L2 Node Name']}`
  }
}