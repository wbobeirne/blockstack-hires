import React from 'react';
import './Footer.scss';

export default () => {
  return (
    <footer className="Footer">
      <div>©HiRes {(new Date()).getFullYear()}</div>
      <div>About Us</div>
      <div>Privacy Policy</div>
      <div>Terms of Service</div>
    </footer>
  );
};
