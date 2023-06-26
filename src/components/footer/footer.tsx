import style from "./footer.module.css";
import { FC } from 'react';
import { Layout } from 'antd';

const { Footer } = Layout;

const MyFooter: FC = () => {
  return (
    <Footer className={style.footer}>
      <h1 className={style.title}>test task</h1>
    </Footer>
  )
};
export default MyFooter;
