import React from 'react';
import './ImageModal.css';

const ImageModal = ({ isOpen, image, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="close-button" onClick={onClose}>X</button>
        <img src={image} alt="Selected" />
      </div>
    </div>
  );
};

export default ImageModal;
