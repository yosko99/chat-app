import React from 'react';

import { Button, Form } from 'react-bootstrap';

import EmailInput from '../inputs/EmailInput';
import FileInput from '../inputs/FileInput';
import PasswordInput from '../inputs/PasswordInput';
import UsernameInput from '../inputs/UsernameInput';
import CenteredItems from '../styles/CenteredItems';

const RegisterPage = () => {
  return (
    <CenteredItems>
      <Form className='shadow-lg p-5'>
        <p className='fs-1 text-uppercase'>Register to Messaging app</p>

        <EmailInput />
        <UsernameInput />
        <PasswordInput />
        <FileInput />

        <Button variant="primary" className='w-100' type="submit">
          Register
        </Button>
      </Form>
    </CenteredItems>
  );
};

export default RegisterPage;
