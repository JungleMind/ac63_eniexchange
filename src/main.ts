import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
	app.useGlobalPipes(new ValidationPipe());
	app.setGlobalPrefix('api');
	app.enableCors();
	dotenv.config();

	if (process.env.NODE_ENV !== 'production') {
		const document = SwaggerModule.createDocument(
			app,
			new DocumentBuilder().setTitle('ENI_Exchange').setDescription('ENI_Exchange API').setVersion('1.0').build(),
		);
		SwaggerModule.setup('api', app, document);
	}
	app.use(cookieParser(process.env.cookieSecret))
  await app.listen(6969);
}
bootstrap();
