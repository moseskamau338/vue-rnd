import { faker } from '@faker-js/faker';

// Generate 30 column headers
export const columns = [];
  for (let i = 1; i <= 5; i++) {
  columns.push({key: `Column ${i}`});
}

// Generate 200 items
export const data = [];
for (let i = 1; i <= 5000; i++) {
  const item = {};
  columns.forEach((column) => {
    item[column.key] = faker.lorem.words({ min: 1, max: 3 })
  });
  data.push(item);
}