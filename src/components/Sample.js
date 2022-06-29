import 'antd/dist/antd.min.css';
import { Parallax } from 'rc-scroll-anim';
import { Card } from 'antd';
import '../css/Sample.css';
import React from 'react';

const { Meta } = Card;

const Sample = (props) => {

    return(
        <Parallax
            animation={{ y: 0, opacity: 1, playScale: props.playScale }}
            style={{ transform: 'translateY(50px)', opacity: 0 }}
        >
            <Card
                style={{
                    width: 200
                }}
                cover={
                    <img
                    alt={props.altText}
                    src={props.srcImage}
                    height='200'
                    width='200'
                    />
                }>
                <Meta title={props.metaText}/>
            </Card>
        </Parallax>
    )
}

export default Sample