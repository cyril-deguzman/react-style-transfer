// import antd component library
import { useEffect, useState } from 'react';
import { Col, Row, Layout, Menu, Button, Space } from 'antd';
import { GithubOutlined } from '@ant-design/icons';
import 'antd/dist/antd.min.css';
import './css/App.css'
import * as tf from '@tensorflow/tfjs'

// import components
import UploadButton from './components/UploadButton';
import How from './components/How';

// constants
const { Header, Content, Footer } = Layout;

const items1 = ['1', '2', '3'].map((key) => ({
  key,
  label: `nav ${key}`,
}));

// App Component
const App = () => {
  const [model, setModel] = useState({});

  useEffect(() => {
    fetchModel()
  }, []);

  const fetchModel = async () => {
    let fetchedModel = await tf.loadGraphModel('model/model.json', 
      {onProgress: (value)=>{
        console.log(value)
      }})
    
    setModel(fetchedModel)
  }

  const handleChange = () => {
    console.log(model)
  }

  return (
    <>
    <Layout>
    <Header className="header">
      <div className="logo">
      </div>
      <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']} items={items1} />
    </Header>
    <Content
      style={{
        padding: '0 50px',
      }}
    >
      <Layout
        className="site-layout-background"
        style={{
          margin: '24px 0 0 0',
          padding: '24px 0',
        }}
      >
        <Content
          style={{
            padding: '0 24px',
            minHeight: 0,
          }}
        >
         
        <Row justify='space-evenly'>
          <Col
          xs='24'
          sm='12'
          md='8'
          align='middle'>
            <p>Content Image</p>
            <UploadButton type={'content'}/>
          </Col>
          <Col
          xs='24'
          sm='12'
          md='8'
          align='middle'>
            <p>Style Image</p>
            <UploadButton type={'style'}/>
          </Col>
          <Col
            xs='24'
            sm='12'
            md='8' align='middle'>
              <p>Stylized Image</p>
              <UploadButton type={'stylized'}/>
            <div>
              <Button type='primary' onClick={handleChange}
              style={{
                width: 120,
                margin: '20px 0 0 0',
              }}
              >Style</Button>
            </div>
            
          </Col>
        </Row>

        </Content>
      </Layout>

      <Layout
        className = 'site-layout-background'
        style={{
          margin: '24px 0 0 0',
          padding: '24px 20%',
        }}
      >
        <Content 
          style={{
          padding: '0 50px',}}
        >
          <How/>
          
        </Content>
      </Layout>

    </Content>
    <Footer
      style={{
        textAlign: 'center',
      }}
    >
    
      
      <Space direction='vertical'>
        Style Transfer ©2022 Created by Mga Natalo sa 50/50 kay Qiqi
        <Button type="text" href='https://github.com/cyril-deguzman/react-style-transfer' target="_blank">
            <GithubOutlined className="teamSocialIcon" />
        </Button>
      </Space>
    </Footer>
  </Layout>
    
    </>
  );
};

export default App;