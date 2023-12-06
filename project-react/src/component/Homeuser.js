import React, { useState, useEffect } from 'react';
import HomeuserLeaflet from '../component/HomeuserLeaflet';
import '../style/Home.css';

const Homeuser = () => {
  const [images, setImages] = useState([]);
  const [shops, setShops] = useState([]);

  useEffect(() => {
    fetch('http://localhost:1010/images')
      .then((response) => response.json())
      .then((data) => setImages(data))
      .catch((error) => console.error('Error fetching images:', error));
  }, []);

  useEffect(() => {
    fetch('http://localhost:1010/shops')
      .then((response) => {
        console.log('Response Status:', response.status);
        return response.json();
      })
      .then((data) => {
        console.log('Shop Data:', data);
        setShops(data);
      })
      .catch((error) => console.error('Error fetching shops:', error));
  }, []);

  return (
    <div className="container-background">
      <div className="container-home-margin">
        <div className="container-home-padding">
          <div className="shop-names">
          <ul style={{ listStyleType: 'none', padding: 0, display: 'flex', gap: '10px' }}>
              {shops.map((shop) => (
                <li key={shop.id} style={{ fontWeight: 'bold' }}>
                  {shop.name}
                </li>
              ))}
            </ul>
          </div>

          <div className="imgbanner">
            <ul className="img-container">
              {images.map((image) => (
                <li
                  className="img-item"
                  key={image.id}
                  style={{ listStyleType: 'none', margin: '10px 0' }}
                >
                  <img
                    className="imgmargin"
                    src={image.img}
                    alt={`Image ${image.id}`}
                    style={{ width: '200px', height: '150px' }}
                  />
                </li>
              ))}
            </ul>
          </div>

          <div className="location">
            <HomeuserLeaflet shops={shops} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Homeuser;
