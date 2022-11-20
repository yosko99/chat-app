import React from 'react';

import { Button, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import EmailInput from '../inputs/EmailInput';
import PasswordInput from '../inputs/PasswordInput';
import CenteredItems from '../styles/CenteredItems';

const LoginPage = () => {
  return (
    <CenteredItems>
      <Form>
        <p className='fs-1 text-uppercase'>Login to Messaging App</p>
        <EmailInput />
        <PasswordInput />

        <div className='d-flex justify-content-between'>
          <Button variant="primary" className='me-2' type="submit">
            Login
          </Button>
          <Link to='/register'>
            <Button variant="info">
              Register
            </Button>
          </Link>
        </div>
      </Form>
    </CenteredItems>
  );
};

export default LoginPage;
