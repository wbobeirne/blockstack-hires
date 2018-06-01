import React from 'react';
import { Button } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import './FourOhFour.scss';

export default () => (
  <div className="FourOhFour">
    <h1 className="FourOhFour-title">
      Sorry, we couldn't find that page
    </h1>

    <Link to="/">
      <Button primary size="huge">
        Back to home
      </Button>
    </Link>
  </div>
);
