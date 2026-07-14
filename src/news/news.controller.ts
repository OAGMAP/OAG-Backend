import { Controller, Get, Param, NotFoundException } from '@nestjs/common'
import { NewsService } from './news.service'

@Controller('api/news')
export class NewsController {

    // Service를 자동으로 연결해줌 (의존성 주입)
    constructor(private readonly newsService: NewsService) {}

    // GET /api/news
    @Get()
    findAll() {
        return this.newsService.findAll()
    }

    // GET /api/news/1/summary
    @Get(':id/summary')
    getSummary(@Param('id') id: string) {
        const article = this.newsService.findOne(Number(id))

        if (!article) {
            throw new NotFoundException('기사를 찾을 수 없어요')
        }

        // Phase 1에서 GPT 연동 예정
        return {
            article_id: Number(id),
            summary: '요약 기능은 Phase 1에서 구현 예정입니다.'
        }
    }
}