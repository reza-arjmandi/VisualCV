import * as React from 'react';
import Title from './Title';
import Button from '@mui/material/Button';

function preventDefault(event: React.MouseEvent) {
  event.preventDefault();
}

export default function Deposits() {
  return (
    <React.Fragment>
      <Title>Original image</Title>
      <img src="" alt="" width="100%" height="100%" />

      <div>
        <Button color="secondary" variant='contained' onClick={preventDefault}>
          Open an image
        </Button>
      </div>
    </React.Fragment>
  );
}