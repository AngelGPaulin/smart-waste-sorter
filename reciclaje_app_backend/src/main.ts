// filepath: src/main.ts
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Habilitar CORS para aceptar todas las conexiones
  app.enableCors({
    origin: "*", // Permite todas las conexiones
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE", // Métodos permitidos
    allowedHeaders: "Content-Type, Accept", // Encabezados permitidos
  });

  await app.listen(4000); // Cambia el puerto si es necesario
}
bootstrap();
