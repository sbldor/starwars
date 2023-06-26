import style from "./header.module.css";
import { FC } from 'react';
import { Layout } from 'antd';

const { Header } = Layout;

const MyHeader: FC = () => {
  return (
    <Header className={style.header}>
      <h1 className={style.title}>star wars movies and characters</h1>
    </Header>
  )
};
export default MyHeader;
