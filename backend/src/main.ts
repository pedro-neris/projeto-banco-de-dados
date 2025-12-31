import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  const config = new DocumentBuilder()
    .setTitle('Sistema de Avaliação de Pratos - AvaliaRU')
    .setDescription(`
      API REST para sistema de avaliação de pratos do Restaurante Universitário.
      
      ⚠️ **AVISO**: Esta API foi desenvolvida exclusivamente para fins educacionais 
      como projeto acadêmico da disciplina de Banco de Dados. Os dados de avaliação são fictícios e não representam opiniões reais
      
      👨‍💻 **Tecnologias**: NestJS, PostgreSQL, JWT, Swagger
    `)
    .setVersion('1.0')
    .setContact(
      'Projeto Acadêmico',
      'https://github.com/halycia/Trabalho_BD',
      'contato@example.com'
    )
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'JWT',
        description: 'Enter JWT token',
        in: 'header',
      },
      'JWT-auth',
    )
    .addServer('http://localhost:3000', 'Servidor Principal (Backend API)')
    .addServer('http://localhost:3001', 'Servidor Alternativo')
    .build();
  
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document, {
    swaggerOptions: {
      persistAuthorization: true,
    },
  });
  
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  ); 
  app.enableCors({
    origin: ['http://localhost:3001', 'http://localhost:3000'],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  });
  await app.listen(process.env.PORT ?? 3000);
  const port = process.env.PORT ?? 3000;
  console.log(`✅ Backend (API) is running on: http://localhost:${port}`);
  console.log(`📖 Swagger documentation available at: http://localhost:${port}/api/docs`);
  console.log(`🌐 Frontend should run on: http://localhost:3001`);
}
bootstrap();
