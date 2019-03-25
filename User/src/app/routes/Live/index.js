import React from 'react';

const Live = ({match}) => {
  return (
    
    <div className="app-wrapper">
    <section>
      <h1>Live</h1>
      <iframe title="live" src="https://player.vimeo.com/video/281107187" width="840" height="560" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>
    </section>
  </div>
  );
};

export default Live;




