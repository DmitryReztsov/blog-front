import React, { FC } from 'react';
import Container from '../../Container/Container';

const Editor: FC = () => {
  return (
    <div className={'Editor'}>
      <Container>
        <div className={'Editor-body'}>
          <form className={'Editor-form form'}></form>
        </div>
      </Container>
    </div>
  );
};

export default Editor;
