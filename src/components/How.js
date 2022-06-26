// necessary imports
import React from 'react';
import 'antd/dist/antd.min.css';
import { Space, Typography, Card, Col, Row } from 'antd';
import '../css/How.css';
import van from '../img/van.jpg'
import raisehand from '../img/raised-hand.jpeg'
import styleraise from '../img/styled-raise.png'

const { Title, Paragraph, Link, Text } = Typography;
const { Meta } = Card;

const How = () => {
  const handleChange = () => {
    
  }

  let github = <Link href='https://github.com/cyril-deguzman/react-style-transfer' target="_blank">here</Link>

  return(

    <Space direction="vertical"
      style ={{
        justifyContent: "center"
      }}>

      <Title level={2}> HOW IT WORKS </Title>
      
      <Title level={4}> Image Style Transfer </Title>
      <Paragraph
      style ={{
        textAlign: "justify",
        color: 'black'
      }}>
        Style transfer is a computer vision technique that allows us to recompose the content of an image 
        in the style of another. If you've ever imagined what a photo might look like if it were painted by 
        a famous artist, then style transfer is the computer vision technique that turns this into a reality.
      </Paragraph>

      <Row justify='center'
        gutter={{md: 100}}>
        <Col
          xs='24'
          sm='12'
          md='8'
          style={{
            padding: '16px 16px',
          }}>
          <Card
            style={{
              width: 200
            }}
            cover={
              <img
                alt="content"
                src={raisehand}
                height='200'
                width='200'
              />
            }>
            <Meta title="Content Image"/>
          </Card>
        </Col>
        <Col xs='24'
          sm='12'
          md='8'
          style={{
            padding: '16px 16px',
          }}>
          <Card
            style={{
              width: 200
            }}
            cover={
              <img
                alt="content"
                src={van}
                height='200'
                width='200'
              />
            }
          >
            <Meta title="Style Image"/>
          </Card>
        </Col>
        <Col xs='24'
          sm='24'
          md='8'
          style={{
            padding: '16px 16px',
          }}>
          <Card
            style={{
              width: 200
            }}
            cover={
              <img
                alt="content"
                src={styleraise}
                height='200'
                width='200'
              />}
          >
            <Meta title="Stylized Image"/>
          </Card>
        </Col>
      </Row>

      <Title level={4}> The Model </Title>
      <Paragraph style ={{
        textAlign: "justify",
        color: 'black'
      }}>
        The web application makes use of the Fast Arbitrary Image Style Transfer Model that is found on Tensorflow Hub
        which was published by Google. The original work of image style transfer with neural networks has a slow
        optimization algortihm however it works with any arbitrary paintings. The model used performs faster fast artistic
        style transfer that works on any arbitrary painting styles. The current model that is around 88MB, so it would take a 
        while for the browser to download it. Once it is already loaded, you would be able to style images in a matter of seconds!
      </Paragraph>

      <Title level={4}> Is the Code Available on GitHub? </Title>
      <Paragraph style ={{
        textAlign: "justify",
        color: 'black'
      }}>
        Yes! You can check out our GitHub {github}.
      </Paragraph>

      <Space direction='vertical'>
        <Title level={4}> Resources </Title>
        <Link href="https://tfhub.dev/google/magenta/arbitrary-image-stylization-v1-256/2" target="_blank">
          Tensorflow Hub: Arbitrary Image Stylization Model
        </Link>
        <Link href="https://colab.research.google.com/github/tensorflow/hub/blob/master/examples/colab/tf2_arbitrary_image_stylization.ipynb" target="_blank">
          Arbitrary Image Stylization Google Colab Notebook
        </Link>
        <Link href="https://colab.research.google.com/github/tensorflow/docs/blob/master/site/en/tutorials/generative/style_transfer.ipynb" target="_blank">
          Style Transfer Google Colab Notebook
        </Link>
        <Text style={{
          color: 'black'
        }}>
          Gatys, L., Ecker, A., & Bethge, M. (2016, September). A neural algorithm of artistic style. Journal of Vision, 326. https://doi.org/10.1167/16.12.326
        </Text>
        <Text style={{
          color: 'black'
        }}>
          Ghiasi, G., Lee, H., Kudlur, M., Dumoulin, V., & Shlens, J. (2017). Exploring the structure of a real-time, arbitrary neural artistic stylization network. arXiv preprint arXiv:1705.06830.
        </Text>
      </Space>
    

    </Space>
  )
}

export default How