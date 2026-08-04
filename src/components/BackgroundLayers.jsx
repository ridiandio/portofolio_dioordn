import React from 'react';
import './BackgroundLayers.css';

const BackgroundLayers = () => {
  return (
    <div className="bg-layers" aria-hidden="true" style={{ background: '#000000' }}>
      {/* Pure black background for better performance */}
    </div>
  );
};

export default BackgroundLayers;
