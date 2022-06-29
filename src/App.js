// import antd component library
import { Col, Row, Layout, Menu, Button, Space, Typography, PageHeader } from 'antd';
import { GithubOutlined } from '@ant-design/icons';
import { ParallaxBanner, ParallaxProvider } from 'react-scroll-parallax';
import { useRef, useState, useEffect } from 'react';
import * as tf from '@tensorflow/tfjs'
import 'antd/dist/antd.min.css';
import './css/App.css'


// import components
import UploadButton from './components/UploadButton';
import How from './components/How';
import bg from './img/bg3.jpg';
import logo from './img/logo1.png';

// constants
const { Header, Content, Footer } = Layout;
const { Title } = Typography;

const items1 = ['1', '2', '3'].map((key) => ({
  key,
  label: `nav ${key}`,
}));

const getRatio = (image) => {
  const maxSize = 256;
  const width = image.shape[0];
  const height = image.shape[1];

  if(width > height) {
    let percent = height / width;
    return [maxSize, Math.floor(maxSize * percent)];
  }
    
  else {
    let percent = width / height;
    return [Math.floor(maxSize * percent), maxSize];
  }
}

const preprocess = (imgData) => {
  return tf.tidy(()=>{
    // convert the image data to a tensor
    let tensor = tf.browser.fromPixels(imgData, 3);
    let ratio = getRatio(tensor)
    const resized = tf.image.resizeBilinear(tensor, ratio).toFloat()
  
    // Normalize the image 
    const offset = tf.scalar(255.0);
    const normalized = resized.div(offset);
  
    //We add a dimension to get a batch shape 
    const batched = normalized.expandDims(0);
    return batched;
   })
}

// App Component
const App = () => {
  const [model, setModel] = useState({});
  const canvasRef = useRef()
  const contentRef = useRef()
  const styleRef = useRef()
  
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

  const handleStyle = () => {
    console.log('style transferring...')
    
    const content = contentRef.current;
    const style = styleRef.current;
    
    const contentTensor = preprocess(content);
    const styleTensor = preprocess(style);

    const result = model.execute([styleTensor, contentTensor]);
    const canvas = canvasRef.current;
  
    tf.browser.toPixels(tf.squeeze(result), canvas);
  }

  return (
    <>
    <Layout>
    <ParallaxProvider>
        <ParallaxBanner 
          layers={[{ image: bg, speed: -50}]}
          style={{ }}>

        <Content>
            <Header className="header" id="navbar">
              <PageHeader
                style={{
                  padding: '0 0'
                }}>
                <img src={logo} height={'100px'} width={'110px'}/>
              </PageHeader>
            </Header>
          

          <div id='header-content'>
            <Layout
              className="site-layout-background"
              style={{
                height: '100%',
                padding: '24px 0',
              }}
            >
              <Content
                style={{
                  padding: '0 24px',
                  minHeight: 0,
                }}
              >
              
              <Row justify='center'>
                <Col align='middle'>
                  <p id='main-title'>
                    Style Transfer
                  </p>
                </Col>
              </Row>
              
              <Row justify='space-evenly'>
                <Col
                xs='24'
                sm='12'
                md='8'
                align='middle'>
                  <p className='title-image'>Content Image</p>
                  <UploadButton type={'content'} innerRef={contentRef}/>
                </Col>
                <Col
                xs='24'
                sm='12'
                md='8'
                align='middle'>
                  <p className='title-image'>Style Image</p>
                  <UploadButton type={'style'} innerRef={styleRef}/>
                </Col>
                <Col
                  xs='24'
                  sm='12'
                  md='8' align='middle'>
                    <p className='title-image'>Stylized Image</p>
                    <UploadButton type={'stylized'} innerRef={canvasRef}/>
                  <div>
                    <Button type='primary' onClick={handleStyle}
                    style={{
                      width: 120,
                      margin: '13px 0 0 0',
                    }}
                    >Style</Button> 
                  </div>           
                </Col>
              </Row>
              </Content>
            </Layout>
          </div>
          </Content>
        </ParallaxBanner>
      </ParallaxProvider>
      <Layout
        className = 'site-layout-background'
        style={{
          margin: '40px 50px 0 50px',
          padding: '55px 20%',
        }}
      >
        <Content 
          style={{
          padding: '0 50px',}}
        >
          <How/>
          
        </Content>
      </Layout>

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