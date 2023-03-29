import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [images, setImages] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(null);

  useEffect(() => {
    fetch('/images.json')
      .then(response => response.json())
      .then(data => {
        setImages(data.images);
      })
      .catch(error => console.error(error));
  }, []);

  const handleClick = (index) => {
    setCurrentIndex(index);
  };

  const handleClose = () => {
    setCurrentIndex(null);
  };

  return (
    <div className="gallery-container">
      {images.map((image, index) => (
        <GalleryItem
          key={index}
          src={image.src}
          alt={image.alt}
          onClick={() => handleClick(index)}
        />
      ))}
      {currentIndex !== null && (
        <Modal
          src={images[currentIndex].src}
          alt={images[currentIndex].alt}
          onClose={handleClose}
          onNext={() => setCurrentIndex((currentIndex + 1) % images.length)}
          onPrev={() => setCurrentIndex((currentIndex + images.length - 1) % images.length)}
        />
      )}
    </div>
  );
}

function GalleryItem({ src, alt, onClick }) {
  return (
    <div className="gallery-item">
      <img src={src} alt={alt} onClick={onClick} />
    </div>
  );
}

function Modal({ src, alt, onClose, onNext, onPrev }) {
  return (
    <div className="modal-overlay">
      <div className="modal">
        <img src={src} alt={alt} />
        <div className="modal-caption">{alt}</div>
        <button className="prev-button" onClick={onPrev}>
          &lt;
        </button>
        <button className="next-button" onClick={onNext}>
          &gt;
        </button>
        <button className="close-button" onClick={onClose}>
          X
        </button>
      </div>
    </div>
  );
}

export default App;
