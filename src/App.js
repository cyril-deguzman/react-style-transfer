// import antd component library
import { Col, Row, Layout, Button, Space, PageHeader, Progress, BackTop, message, Modal } from 'antd';
import { GithubOutlined } from '@ant-design/icons';
import { useRef, useState, useEffect } from 'react';
import * as mi from '@magenta/image'
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

const success = () => {
  message.success('Application fully loaded!');
};

const warning = () => {
  message.warning('Application is downloading (88mb)!');
};

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
  const [visible, setVisible] = useState(true)
  const [fastModel, setFastModel] = useState(new mi.ArbitraryStyleTransferNetwork())
  const [model, setModel] = useState({});
  const [progress, setProgress]= useState(0.00);
  const [gpu, setGpu] = useState(true);
  const [fast, setFast] = useState(true);
  const canvasRef = useRef()
  const contentRef = useRef()
  const styleRef = useRef()
  
  useEffect(() => {
    fastModel.initialize().then(()=>{
      setFast(false)
    })
    warning()
    fetchModel()
  }, []);

  const fetchModel = async () => {
    let fetchedModel = await tf.loadGraphModel('model/model.json', 
    {onProgress: (progress)=>{
      const progressed = (progress*100).toFixed(2)
      
      console.log(`download progress: ${progressed}%`)
    
      if(progressed >= 100) {
        setGpu(false)
        console.log('finished')
        success()
      }
      
      setProgress(progressed)
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

  const handleFastStyle = () => {
    console.log('style transferring...')
    
    const content = contentRef.current;
    const style = styleRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d')

    fastModel.stylize(content, style).then((imageData) => {
      // generate a second canvas
      var renderer = document.createElement('canvas');
      renderer.width = imageData.width;
      renderer.height = imageData.height;
      // render our ImageData on this canvas
      renderer.getContext('2d').putImageData(imageData, 0, 0);

      ctx.drawImage(renderer, 0,0, canvas.width, canvas.height)
    });
  }

  return (
    <>
    <Modal
      title="CAUTION: READ BEFORE USE"
      centered
      visible={visible}
      footer={null}
      onCancel={() => setVisible(false)}
    >
      <p>The web app has two ways to stylize your image. Please refer below on when and which to use depending on your device.</p>
      <p><b>GPU Style</b>: use ONLY when you have a dedicated GPU. Not available on handheld devices.</p>
      <p><b>Fast Style</b>: can be used safely but outputs a lower quality stylized image. Available on all devices.</p>
    </Modal>
    <BackTop/>
    <Layout>
        <div id='parallax-ina' style={{
            background: `url(${bg})`,
            backgroundSize: 'cover',
            backgroundAttachment: 'fixed',
            backgroundPosition: 'center',
            zIndex: 1
          }}>
          <Content>
              <Header className="header" id="navbar">
                <PageHeader
                  style={{
                    padding: '0 0'
                  }}>
                  <img src={logo} id='logo'/>
                </PageHeader>
              </Header>
            <div id='header-content'>
              <Layout
                id='main-layout-background'
                style={{
                  height: '100%',
                  padding: '24px 0',
                  background: 'none'
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
                      <Button type='primary' id='fast-button'  onClick={handleFastStyle}
                      style={{
                        width: 120,
                        margin: '13px 13px 0 13px',
                        backgroundColor: "#491718", borderColor: "#4a161e" 
                      }} disabled={fast}
                      >Fast Style</Button>
                      <Button type='primary' onClick={handleStyle}
                      style={{
                        width: 120,
                        margin: '13px 0 0px 0',
                        backgroundColor: "#491718", borderColor: "#4a161e" 
                      }} disabled={gpu} id='gpu-button'
                      >GPU Style</Button>
                    </div>
                  </Col>
                </Row>
                </Content>
                <Progress 
                    strokeColor={{
                      from: '#773806',
                      to: '#626c16',
                    }}
                    percent={progress}
                    status="active"
                />
              </Layout>
            </div>
            </Content>
        </div>
      <Layout
        className = 'site-layout-background'
        id= 'pad-layout'
      >
        <Content id='pad-content'
          style={{
          padding: '0 10px',}}
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