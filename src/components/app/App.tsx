import style from './App.module.css';
import { FC } from 'react';
import MyHeader from '../header/header';
import MyFooter from '../footer/footer';
import MyContent from '../content/content';
import { Layout} from 'antd';



const App: FC = () => {
  const { Content } = Layout;

  return (
      <div className={style.space}>
        <MyHeader />
        <Content className={style.content}>
          <MyContent />
        </Content>
        <MyFooter />
      </div>
  )
}

export default App
