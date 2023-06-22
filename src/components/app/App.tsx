import style from './App.module.css';
import { useQuery } from '@apollo/client';
import { useState } from 'react';
import Header from '../header/header';
import { GET_FILMS_AND_PERSON, COUNT_FILMS, COUNT_PERSON } from '../../const/const';

function App() {

  const [pageFilm, setPageFilm] = useState(COUNT_FILMS)

  const { loading, error, data, refetch } = useQuery(GET_FILMS_AND_PERSON,
    {
      variables: { 
      first: pageFilm,
      last: 2, 
      characterConnectionFirst2: 4, 
      characterConnectionLast2: 4 
      }
    }
    );
  const filmsName = data?.allFilms?.films;

  console.log(filmsName);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;

  return (
    <>
    <Header />
    <section className={style.films_cont}>
    
      {filmsName?.map((e, i: number) => {
        return (
          <div key={i} className={style.film}>
            <h2 className={style.title}>Episode name: {e?.title}</h2>
            <p className={style.text}>Release date: {e?.releaseDate}</p>
            <p className={style.text}>Director: {e?.director}</p>
            <p className={style.text}>Producer: {e?.producers}</p>
            <button className={style.button}>view characters</button>
          </div>
        )
    })}
    </section>
      <button disabled={pageFilm === 2} onClick={() => setPageFilm(prev => prev - 2)}>back</button>
      <p>{pageFilm / 2}</p>
      <button disabled={pageFilm === 6} onClick={() => setPageFilm(prev => prev + 2)}>next</button>
    </>
  )
}

export default App
