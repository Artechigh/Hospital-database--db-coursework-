 * import packages must be installed with "npm instal"

 to add prisma database manager make sure:
 * database provider is online
 * .env file exists and contains DATABASE_URL="postgresql://johndoe:password@localhost:5432/databaseName schema=public" with the correct data ("password" can be empty)
 * prisma packages and database provider are updated after changing schema.prisma file ("npx prisma generate", "npx prisma db push")

 * use "node app.mjs" to run the node app




To configure npm script to run express server:

package.json -> scripts -> add new command ("command_name" : "command")

execute command by npm run command_name

Added babel + webpack configuration for distributing + developing frontend react package
