import { Global, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import postgres from 'postgres';
import { drizzle } from 'drizzle-orm/postgres-js';
import * as schema from './schema';

export const DRIZZLE = 'DRIZZLE_INSTANCE';
@Global()
@Module({
  providers: [
    {
      provide: DRIZZLE,
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        const connectStr = config.get<string>('DATABASE_URL');
        if (!connectStr) {
          throw new Error(
            'DATABASE_URL is not defined in the environment variables.',
          );
        }
        const client = postgres(connectStr);
        return drizzle(client, { schema });
      },
    },
  ],
  exports: [DRIZZLE],
})
export class DrizzleModule {}
