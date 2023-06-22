import { gql } from '../__generated__/gql';

export const GET_FILMS_AND_PERSON = gql(`
  query AllFilms($first: Int, $last: Int, $characterConnectionFirst2: Int, $characterConnectionLast2: Int) {
  allFilms(first: $first, last: $last) {
    films {
      title
      director
      producers
      releaseDate
      characterConnection(first: $characterConnectionFirst2, last: $characterConnectionLast2) {
        characters {
          eyeColor
          gender
          hairColor
          height
          mass
          name
          skinColor
        }
      }
    }
  }
}
`);

export const COUNT_FILMS = 2

export const COUNT_PERSON = 4