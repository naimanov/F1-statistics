import React from 'react';
import { Link } from 'react-router-dom';

function Error() {
  return (
    <div className='message-container'>
      <h1>404</h1>
      <p className='message'>Sorry, the page you tried cannot be found</p>
      <Link to='/' className='btn-message'>
        Back home
      </Link>
    </div>
  );
}

export default Error;
