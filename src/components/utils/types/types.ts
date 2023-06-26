export type TCardFilm = {
  loading: boolean,
  title?: string | undefined | null,
  releaseDate?: string | undefined | null,
  director?: string | undefined | null,
  producers?: (string | null)[] | string | null | undefined | string[],
  onViewCharacters?: () => void
}

export type TPerson = { 
  filmId: string | undefined | null,
}
