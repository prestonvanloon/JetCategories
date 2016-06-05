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
        if (data.level === '2') {
          const category = data;
          category.attributeIds = categoryAttributeIds[data.id];
          category.active = category.active === '1';
          category.retired = category.retired === '1';

          categories[category.id] = category;
        }
      }).on('end', () => {
        fs.writeFile('dist/categories.json', JSON.stringify(categories), err => {
          if (err) throw err;
          console.log('Categories: done');
        })
      });
  });
