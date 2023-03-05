import { TypeOrmModuleOptions } from '@nestjs/typeorm'; 

export const dbConfig: TypeOrmModuleOptions = {
	type: 'mongodb',
	url: process.env.DB_URL_STRING,
	database: process.env.DB_NAME || 'exchangedb',
	// migrations: ['src/migration/*{.ts,.js}'],
	// cli: {
	//   migrationsDir: 'src/migration',
	// },
	// entities: [join(__dirname, '**', '*.entity.{ts,js}')],
	autoLoadEntities: true,
	synchronize: true,
};
