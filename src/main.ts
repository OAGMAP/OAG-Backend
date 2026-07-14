import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  // CORS 설정 (React에서 요청 허용)
  app.enableCors({
    origin: [
      'http://localhost:5173',  // Vite React
      'http://localhost:3000',  // CRA React
    ]
  })

  const PORT = process.env.PORT || 8000
  await app.listen(PORT)

  console.log(`서버 실행 중: http://localhost:${PORT}`)
  console.log(`뉴스 API: http://localhost:${PORT}/api/news`)
}

bootstrap()