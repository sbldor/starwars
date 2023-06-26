import style from './content.module.css';
import { FC, useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import CardFilm from '../cardFilm/cardFilm';
import CardPerson from '../cardPersons/persons';
import { COUNT_FILMS, COUNT_FILMS_MIN } from '../utils/const/const';
import { nanoid } from 'nanoid';
import { Button } from 'antd';

import { RootDocument, RootQuery, RootQueryVariables } from '../../__generated__/graphql';


const MyContent: FC = () => {

  const [width, setWidth] = useState(window.innerWidth);

  const widthCountFilm = () => width > 710 ? COUNT_FILMS : COUNT_FILMS_MIN
  const widthCountFilmMin = () => width > 710 ? 2 : 1

  useEffect(() => {
    const handleResizeWindow = () => setWidth(window.innerWidth);
    window.addEventListener('resize', handleResizeWindow);
    return () => {
      window.removeEventListener('resize', handleResizeWindow);
    };
  }, []);

  const [pageFilm, setPageFilm] = useState(widthCountFilm())
  const [pagePersons, setPagePersons] = useState(false)

  const { loading, error, data } = useQuery<RootQuery, RootQueryVariables>(RootDocument,
    {
      variables: {
        first: pageFilm,
        last: widthCountFilmMin(),
      }
    }
  );

  const films = data?.allFilms?.films;
  const maxFilm = data?.countFilm?.films?.length;

  if (error) return <p>Error : {error.message}</p>;

  return (
    <>
      <div className={style.films_cont}>
        {loading && (
        <CardFilm
          loading={loading}
          title={'Loading...'}
          releaseDate={'Loading...'}
          director={'Loading...'}
          producers={['Loading...']}
        />
        )}
        {loading && width > 710 && (
        <CardFilm
          loading={loading}
          title={''}
          releaseDate={'e?.releaseDate'}
          director={'e?.director'}
          producers={['e?.producers']}
        />
        )}
        {films?.map((e) => {
          const nano = nanoid()
          return (
            <div key={nano}>
              <CardFilm
                loading={loading}
                title={e?.title}
                releaseDate={e?.releaseDate}
                director={e?.director}
                producers={e?.producers}
                onViewCharacters={() => setPagePersons(!pagePersons)}
              />
              {pagePersons && 
              <div>
                <CardPerson filmId={e?.id}/>
              </div>
              }
            </div>
          )
        })}
      </div>
      <div className={style.pag}>
        <Button 
          type="ghost" 
          className={style.button_pag} 
          disabled={pageFilm === widthCountFilm()} 
          onClick={() => setPageFilm(prev => prev - widthCountFilm())}>
            back
        </Button>
        <p className={style.count} >{pageFilm / widthCountFilm()}</p>
        <Button 
          type="ghost" 
          className={style.button_pag} 
          disabled={pageFilm === maxFilm} 
          onClick={() => setPageFilm(prev => prev + widthCountFilm())}>
            next
        </Button>
      </div>
    </>
  )
};

export default MyContent;
