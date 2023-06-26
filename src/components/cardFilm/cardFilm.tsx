import  { FC  } from 'react';
import style from './cardFilm.module.css';
import { TCardFilm } from '../utils/types/types';
import { Card, Typography, Button } from 'antd';

const CardFilm: FC<TCardFilm> = ({ title, loading, releaseDate, director, producers, onViewCharacters }) => {

  const { Text } = Typography;

  const styleTitle = {
    fontFamily: 'Roboto',
    fontSize: 27,
    fontWeight: 700,
    color: '#FBBE08'
    
  }

  return (
    <Card headStyle={styleTitle} className={style.film}  loading={loading} title={title}>
        <Text className={style.text}>Release date: {releaseDate}</Text>
        <Text className={style.text}>Director: {director}</Text>
        <Text className={style.text}>Producer: {producers}</Text>
        <Button onClick={onViewCharacters} className={style.button} type="ghost" block>view characters</Button>
    </Card>
  )
}

export default CardFilm