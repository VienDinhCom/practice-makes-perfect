// import SQLite from 'better-sqlite3';
// import { Kysely, SqliteDialect } from 'kysely';
// import { DB } from './schema';

// const dialect = new SqliteDialect({
//   database: new SQLite('data.sqlite'),
// });

// export const database = new Kysely<DB>({
//   dialect,
// });

// export * from './schema';

import { PrismaClient } from '@prisma/client';

// const globalForDatabase = globalThis as unknown as {
//   database: PrismaClient | undefined;
// };

// export const database = globalForDatabase.database ?? new PrismaClient();

// if (process.env.NODE_ENV !== 'production') {
//   globalForDatabase.database = database;
// }

export const database = new PrismaClient();

export * from '@prisma/client';
