generate migrations:
npx ts-node -r tsconfig-paths/register node_modules/typeorm/cli.js migration:generate src/migrations/CreateUsersTable -d typeorm.config.ts

run migrations
npx ts-node -r tsconfig-paths/register node_modules/typeorm/cli.js migration:run -d typeorm.config.ts
