import { PlusOutlined, LoadingOutlined } from '@ant-design/icons';
import { message, Upload, Select } from 'antd';
import { useState } from 'react';
import 'antd/dist/antd.min.css';
import '../css/UploadButton.css';

// import images
import transparent from '../img/transparent.png'
import van from '../img/van.jpg'
import mosa from '../img/mona-lisa.jpg'
import park from '../img/park.jpg'
import scream from '../img/scream.jpg'
import starry from '../img/starry.jpg'

const { Option, OptGroup } = Select;

const getBase64 = (img, callback) => {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
};

const beforeUpload = (file) => {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
  const isLt2M = file.size / 1024 / 1024 < 2;

  if (!isJpgOrPng) 
    message.error('You can only upload JPG/PNG file!');

  if (!isLt2M) 
    message.error('Image must smaller than 2MB!');
  
  return isJpgOrPng && isLt2M;
};

const dummyRequest = ({ file, onSuccess }) => {
  setTimeout(() => {
    onSuccess("ok");
  }, 0);
};

const UploadButton = (type) => {
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState();

  const handleChange = (info) => {
    if (info.file.status === 'uploading') {
      setLoading(true);
      return;
    }

    if (info.file.status === 'done') {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, (url) => {
        setLoading(false);
        setImageUrl(url);
      });
    }
  };

  const handleDropdown = (value) => {
    switch(value) {
      case 'van': setImageUrl(van); break;
      case 'starry': setImageUrl(starry); break;
      case 'mosa': setImageUrl(mosa); break;
      case 'scream': setImageUrl(scream); break;
      case 'park': setImageUrl(park); break;
      default: setImageUrl(transparent); break;
    }
  }

  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div
        style={{
          marginTop: 8,
        }}
      >
      <img
            id={type.type}
            src={transparent}
            alt="avatar"
            style={{
              height: '0%',
              width: '0%',
            }}
      />
      Upload
      </div>
    </div>
  );
  
  const base = (
    <Upload
        name="avatar"
        listType="picture-card"
        className="avatar-uploader"
        showUploadList={false}
        customRequest={dummyRequest}
        beforeUpload={beforeUpload}
        onChange={handleChange}
      >
        {imageUrl ? (
          <img
            id={type.type}
            src={imageUrl}
            alt="avatar"
            style={{
              height: '100%',
              width: '100%',
            }}
          />
        ) : (
          uploadButton
        )}
      </Upload>
  )

  const dropDown = (
    <div>
      {base}
      <Select
        defaultValue="custom"
        style={{
          width: 120,
          margin: '20px 0 0 0',
        }}
        onChange={handleDropdown}
      >
        <OptGroup label="Own Image">
          <Option value="custom">Custom</Option>
        </OptGroup>
        <OptGroup label="Presets">
          <Option value="van">Van Gogh</Option>
          <Option value="starry">Starry Night</Option>
          <Option value="mosa">Mona Lisa</Option>
          <Option value="scream">The Scream</Option>
          <Option value="park">Park</Option>
        </OptGroup>
        
      </Select>
    </div>
  )

  const stylized = (
    <div>
      <canvas id='stylized-canvas'>

      </canvas>
    </div>
  )
  return (
    <> 
      {type.type == 'content' ? base: null}
      {type.type == 'style' ? dropDown: null}
      {type.type == 'stylized' ? stylized: null}
    </>
  );
};

export default UploadButton;