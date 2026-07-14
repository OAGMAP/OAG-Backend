import { Injectable } from '@nestjs/common'
import { Article } from './news.types'

@Injectable()
export class NewsService {

    // Phase 0 더미 데이터
    // Phase 1에서 DB 조회로 교체
    private readonly dummyNews: Article[] = [
        {
            article_id: 1,
            title: '미국 기준금리 인상 결정',
            source: 'Reuters',
            source_language: 'en',
            published_at: '2026-07-15T09:00:00Z',
            url: 'https://reuters.com/example1',
            primary_category: 'economy',
            impact_level: 4,
            primary_event_country: 'US',
            related_countries: ['CN'],
            summary: null,
            analysis_status: 'completed'
        },
        {
            article_id: 2,
            title: '북한 탄도미사일 발사',
            source: '연합뉴스',
            source_language: 'ko',
            published_at: '2026-07-15T06:00:00Z',
            url: 'https://yna.co.kr/example1',
            primary_category: 'security',
            impact_level: 3,
            primary_event_country: 'KP',
            related_countries: [],
            summary: null,
            analysis_status: 'completed'
        },
        {
            article_id: 3,
            title: '호르무즈 해협 긴장 고조',
            source: 'BBC',
            source_language: 'en',
            published_at: '2026-07-15T07:30:00Z',
            url: 'https://bbc.com/example1',
            primary_category: 'economy',
            impact_level: 3,
            primary_event_country: 'IR',
            related_countries: ['SA', 'AE'],
            summary: null,
            analysis_status: 'completed'
        }
    ]

    // 뉴스 목록 반환 (영향도 2 이상만)
    findAll(): Article[] {
        return this.dummyNews.filter(news => news.impact_level >= 2)
    }

    // 특정 기사 찾기
    findOne(id: number): Article | undefined {
        return this.dummyNews.find(news => news.article_id === id)
    }
}