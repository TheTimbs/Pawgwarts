import React from 'react';
import { useFormikContext } from 'formik';

import Button from '../Button';

function SubmitButton({ title , color }) {
  const { handleSubmit } = useFormikContext();

  return <Button title={title} onPress={handleSubmit} color={color} />;
}

export default SubmitButton;
