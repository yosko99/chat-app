import React from 'react';

import { Form } from 'react-bootstrap';

const FileInput = () => {
  return (
        <Form.Group className="mb-3">
            <Form.Label>Image</Form.Label>
            <Form.Control type="file"
                name="image"
                required
                className="form-control border"
                accept="image/gif,image/jpeg,image/jpg,image/png" />
        </Form.Group>
  );
};

export default FileInput;
