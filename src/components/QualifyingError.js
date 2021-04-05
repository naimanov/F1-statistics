import React from 'react';
import { Link } from 'react-router-dom';

function QualifaingError() {
  return (
    <div className='message-container'>
      <p className='message'>
        Sorry, but qualifying results are only fully supported from the 2003
        season onwards.
      </p>
      <Link to='/races' className='btn btn-message'>
        Back to races
      </Link>
    </div>
  );
}

export default QualifaingError;
