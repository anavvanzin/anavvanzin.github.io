export type Lang = 'pt' | 'en'
export type Localized = Record<Lang, string>
export type Scope = 'canonical' | 'comparative-antecedent'

export interface ExhibitionItem {
  id: string
  atlasId: string
  scope: Scope
  title: Localized
  subtitle: Localized
  territory: Localized
  date: string
  medium: Localized
  themes: string[]
  observed: Localized
  context: Localized
  interpretation: Localized
  source: {
    institution: string
    url: string
    rights: Localized
    citation: Localized
  }
  images: {
    figure: string
    plate: string
    alt: Localized
  }
  review: {
    status: 'verified'
    reviewedAt: string
  }
}

export interface ExhibitionData {
  metadata: {
    snapshotDate: string
    canonicalCorpus: { count: number; commit: string; source: string }
    comparativeSurvey: { total: number; female: number; sha256: string }
  }
  items: ExhibitionItem[]
}
