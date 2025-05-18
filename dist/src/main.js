"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const swagger_1 = require("@nestjs/swagger");
const dotenv = require("dotenv");
const fs = require("fs");
const path = require("path");
const common_1 = require("@nestjs/common");
async function bootstrap() {
    const envPath = path.resolve(process.cwd(), '.env');
    console.log(`MAIN.TS: Checking for .env file at: ${envPath}`);
    if (fs.existsSync(envPath)) {
        console.log(`MAIN.TS: .env file found at: ${envPath}`);
        const result = dotenv.config({ path: envPath, debug: process.env.NODE_ENV !== 'production' });
        if (result.error) {
            console.error('MAIN.TS: Error loading .env file:', result.error);
        }
        else {
            console.log('MAIN.TS: .env file loaded successfully');
        }
    }
    else {
        console.error(`MAIN.TS: .env file NOT FOUND at: ${envPath}`);
    }
    console.log(`MAIN.TS: Value of process.env.MONGODB_URI after dotenv.config(): ${process.env.MONGODB_URI}`);
    console.log(`MAIN.TS: Value of process.env.PORT after dotenv.config(): ${process.env.PORT}`);
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.setGlobalPrefix('api');
    app.enableCors({
        origin: ['http://localhost:3000', 'http://localhost:3002', 'http://localhost:3003'],
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
        credentials: true,
    });
    app.useGlobalPipes(new common_1.ValidationPipe({
        whitelist: true,
        transform: true,
        forbidNonWhitelisted: true,
    }));
    const config = new swagger_1.DocumentBuilder()
        .setTitle('Bank Deposits API')
        .setDescription('API для сравнения банковских депозитов')
        .setVersion('1.0')
        .addBearerAuth()
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup('api/docs', app, document);
    const port = process.env.PORT || 3001;
    await app.listen(port);
    console.log(`Application is running on: http://localhost:${port}`);
    console.log(`Swagger docs available at: http://localhost:${port}/api/docs`);
}
bootstrap();
//# sourceMappingURL=main.js.map