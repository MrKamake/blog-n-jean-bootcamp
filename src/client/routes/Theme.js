import React from 'react';

const Theme = ({ themeHandler }) => {
  return (
    <div>
      <div className='ui-select-box'>
        <div
          className='first-ui-theme'
          onClick={() => themeHandler('first-ui-theme')}
        >
          1st
        </div>
        <div
          className='second-ui-theme'
          onClick={() => themeHandler('second-ui-theme')}
        >
          2nd
        </div>
        <div
          className='third-ui-theme'
          onClick={() => themeHandler('third-ui-theme')}
        >
          3rd
        </div>
      </div>
    </div>
  );
};

export default Theme;
