const seedUsers = require('./user-seeds');
const seedPosts = require('./post-seeds');
const seedBookmarks = require('./bookmark-seeds');
const sequelize = require('../config/connection');
const seedAll = async () => {
  await sequelize.sync({ force: true });
  console.log('\nDB Sync');
  await seedUsers();
  console.log('\nUsers Seeded');
  await seedPosts();
  console.log('\nPosts Seeded');
  await seedBookmarks();
  console.log('\nBookmarks Seeded');
  process.exit(0);
};
seedAll();