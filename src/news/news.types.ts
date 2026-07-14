export interface Article {
    article_id: number
    title: string
    source: string
    source_language: 'ko' | 'en'
    published_at: string
    url: string
    primary_category: 'economy' | 'security' | 'diplomacy' | 'society'
    impact_level: 1 | 2 | 3 | 4
    primary_event_country: string
    related_countries: string[]
    summary: string | null
    analysis_status: 'pending' | 'completed' | 'analysis_failed'
}