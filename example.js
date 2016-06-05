const jet = require('./index');

const architecture = jet.categories[1000002];
architecture.attributes = architecture.attributeIds.reduce((acc, attributeId) => {
  const attribute = jet.attributes[attributeId];
  if (attribute) {
    acc.push(attribute);
  }
  return acc;
}, []);

console.log(JSON.stringify(architecture, null, 2));
