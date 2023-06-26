import { FC, useState, useEffect } from "react";
import style from './persons.module.css'
import { TPerson } from "../utils/types/types";
import { useQuery } from '@apollo/client';
import { FilmDocument, FilmQuery, FilmQueryVariables } from '../../__generated__/graphql';
import { Card, Typography, Space, Button } from 'antd';
import { COUNT_PERSON, COUNT_PERSON_MIN } from "../utils/const/const";
import { nanoid } from "nanoid";

const styleTitle = {
  fontFamily: 'Roboto',
  fontSize: 17,
  fontWeight: 500,
  color: '#FBBE08'

}

const CardPerson: FC<TPerson> = ( { filmId } ) => {

  const { Text } = Typography;
  const [width, setWidth] = useState(window.innerWidth);
  const widthCountPerson = () => width > 980 ? COUNT_PERSON : COUNT_PERSON_MIN
  const [pagePersons, setPagePersons] = useState(widthCountPerson())

  useEffect(() => {
    const handleResizeWindow = () => setWidth(window.innerWidth);
    window.addEventListener('resize', handleResizeWindow);
    return () => {
      window.removeEventListener('resize', handleResizeWindow);
    };
  }, []);

  const { loading, data } = useQuery<FilmQuery, FilmQueryVariables>(FilmDocument,
    {
      variables: {
        filmId: filmId,
        first: pagePersons,
        last: widthCountPerson(),
      }
    }
  );

  const person = data?.film?.characterConnection?.characters;
  const maxPerson = data?.film?.countPerson?.characters?.length || 1;

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-evenly' }}>
        {loading && 
          <Space direction="vertical" size={"small"} style={{ display: 'flex', flexDirection: 'column' }}>
            <Card bodyStyle={{ padding: 10 }} size="small" className={style.person} headStyle={styleTitle} title={"Loading..."}>
            </Card>
          </Space>
        }
        {!loading && person?.map(e => {
          const nano = nanoid()
          return (
            <Space key={nano} direction="vertical" size={"small"} style={{ display: 'flex', flexDirection: 'column' }}>
              <Card bodyStyle={{padding: 10}} size="small" className={style.person} headStyle={styleTitle} title={e?.name}>
                <Text className={style.text}>Birth year: {e?.birthYear}</Text>
                <Text className={style.text}>Eye color: {e?.eyeColor}</Text>
                <Text className={style.text}>Hair color: {e?.hairColor}</Text>
                <Text className={style.text}>Skin color: {e?.skinColor}</Text>
                <Text className={style.text}>Height: {e?.height}</Text>
                <Text className={style.text}>mass: {e?.mass}</Text>
              </Card>
            </Space>
          )
        })}
      </div>
      <div className={style.pag}>
        <Button
          className={style.button_pag}
          disabled={pagePersons === widthCountPerson()}
          onClick={() => setPagePersons(prev => prev - widthCountPerson())}>
            back
        </Button>
        <p className={style.count} >{pagePersons / widthCountPerson()}</p>
        <Button 
          className={style.button_pag} 
          disabled={pagePersons >= maxPerson} 
          onClick={() => setPagePersons(prev => prev + widthCountPerson())}>
          next
        </Button>
      </div>
    </div>
  )
};

export default CardPerson;
