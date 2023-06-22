export type TAllFilmsAndPerson = {
  films?: {
    director?: string,
    producers?: [string],
    releaseDate?: string,
    title?: string,
    __typename: string,
    characterConnection: {
      __typename: string,
      characters: {
        __typename: string,
        eyeColor: string,
        gender: string,
        hairColor: string,
        height: number,
        mass: number,
        name: string,
        skinColor: string
      }[]
    }
  }[]
}