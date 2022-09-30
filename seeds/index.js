const seedUsers = require('./user-seeds');
const seedPosts = require('./post-seeds');
const seedBookmarks = require('./bookmark-seeds');
const sequelize = require('../config/connection');
const seedAll = async () => {
  await sequelize.sync({ force: true });
  console.log('\nDB Sync Complete\nSeeding Users');
  await seedUsers();
  console.log('\nUsers Seeded\nSeeding Posts');
  await seedPosts();
  console.log('\nPosts Seeded\nSeeding Bookmarks');
  await seedBookmarks();
  console.log('\nBookmarks Seeded');
  process.exit(0);
};
seedAll();