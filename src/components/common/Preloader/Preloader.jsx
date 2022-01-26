import React from 'react';

import preloader from '../../../assets/images/loading.gif';

let Preloader = (props) => {
  return (
    <div>
        <img src={preloader} style={{ width: "80px" }} />
    </div>
  );
};

export default Preloader;