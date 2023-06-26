import { gql } from "@apollo/client";

export const GET_FILMS_AND_PERSON = gql(`
  query Root($first: Int, $last: Int) {
  countFilm: allFilms {
    films {
      title
    }
  }
  allFilms(first: $first, last: $last) {
    films {
      id
      title
      director
      producers
      releaseDate
      episodeID
    }
  }
}
`);

export const GET_PERSON_BY_FILMID = gql(`
  query Film($filmId: ID, $last: Int, $first: Int) {
  film(id: $filmId) {
    id
    countPerson: characterConnection {
      characters {
        name
      }
    }
    characterConnection(last: $last, first: $first) {
      characters {
        birthYear
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
`);

export const COUNT_FILMS = 2;
export const COUNT_FILMS_MIN = 1;

export const COUNT_PERSON = 3;
export const COUNT_PERSON_MIN = 2;

