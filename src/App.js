import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  // State to hold the images array and current index of the image being viewed
  const [images, setImages] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(null);

  useEffect(() => {
    // Fetch images data from images.json file when component mounts
    fetch('/images.json')
      .then(response => response.json())
      .then(data => {
        setImages(data.images);
      })
      .catch(error => console.error(error));
  }, []);

  // Function to set the current index of the image clicked on in the gallery
  const handleClick = (index) => {
    setCurrentIndex(index);
  };

  // Function to close the modal
  const handleClose = () => {
    setCurrentIndex(null);
  };

  return (
    <div className="gallery-container">
      {/* Render gallery items using map */}
      {images.map((image, index) => (
        <GalleryItem
          key={index}
          src={image.src}
          alt={image.alt}
          onClick={() => handleClick(index)}
        />
      ))}
      {/* Render modal if current index is not null */}
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

// Component for rendering gallery items
function GalleryItem({ src, alt, onClick }) {
  return (
    <div className="gallery-item">
      <img src={src} alt={alt} onClick={onClick} />
    </div>
  );
}

// Component for rendering the modal
function Modal({ src, alt, onClose, onNext, onPrev }) {
  const [zoom, setZoom] = useState(1);

  const handleZoomIn = (factor) => {
    setZoom(zoom + factor);
  };

  const handleZoomOut = (factor) => {
    setZoom(zoom - factor);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      {/* Close modal on click outside */}
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <img
          src={src}
          alt={alt}
          style={{ transform: `scale(${zoom})`, maxWidth: "100%", maxHeight: "100%" }}
        />
        <div className="modal-caption">{alt}</div>
        <button className="prev-button" onClick={onPrev}>
          &lt;
        </button>
        <button className="next-button" onClick={onNext}>
          &gt;
        </button>
        <button className="zoom-in-button" onClick={() => handleZoomIn(0.1)}>
          +
        </button>
        <button className="zoom-out-button" onClick={() => handleZoomOut(0.1)}>
          -
        </button>
        <button className="close-button" onClick={onClose}>
          X
        </button>
      </div>
    </div>
  );
}



export default App;
