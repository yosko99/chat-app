import React, { useState } from 'react';

import axios from 'axios';
import { Button, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

import CustomAlert from '../components/utils/CustomAlert';
import EmailInput from '../inputs/EmailInput';
import FileInput from '../inputs/FileInput';
import PasswordInput from '../inputs/PasswordInput';
import UsernameInput from '../inputs/UsernameInput';
import CenteredItems from '../styles/CenteredItems';

const RegisterPage = () => {
  const [alert, setAlert] = useState<React.ReactNode>();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.target as HTMLFormElement);

    axios
      .post('/users/', formData)
      .then((response) => {
        if (response.data.status === 409) {
          setAlert(
            <CustomAlert variant="danger" text={response.data.message} />
          );
        } else {
          setAlert(
            <CustomAlert variant="success" text={response.data.message} />
          );
          setTimeout(() => {
            navigate('/');
          }, 1000);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <CenteredItems>
      <Form className="shadow-lg p-5" onSubmit={(e) => handleSubmit(e)}>
        <p className="fs-1 text-uppercase">Register to Messaging app</p>

        <EmailInput />
        <UsernameInput />
        <PasswordInput />
        <FileInput />

        <Button variant="primary" className="w-100" type="submit">
          Register
        </Button>
        {alert}
      </Form>
    </CenteredItems>
  );
};

export default RegisterPage;
