import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { NewsModule } from './news/news.module'

@Module({
  imports: [
    // .env 파일 전체에서 사용 가능하게
    ConfigModule.forRoot({ isGlobal: true }),
    NewsModule,
  ],
})
export class AppModule {}