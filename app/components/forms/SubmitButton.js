import React from 'react';
import { useFormikContext } from 'formik';

import Button from '../Button';

function SubmitButton({ title, color = 'primary' }) {
  const { handleSubmit } = useFormikContext();

  return <Button title={title} color={color} onPress={handleSubmit} />;
}

export default SubmitButton;
