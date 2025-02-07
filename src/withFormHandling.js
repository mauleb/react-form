import React, { useEffect, useContext, useCallback } from 'react';

import FormContext from './FormContext';

const withFormHandling = (
  FormInput, 
  onFormValueChange=() => {}
) => ({
  name,
  defaultValue='',
  ...remainingProps
}) => {
  const { 
    values, setValue,
    errors, setError,
  } = useContext(FormContext);

  const setNamedValue = useCallback((value) => {
    try {
      onFormValueChange(value, remainingProps);  
      setError(name, null);
    } catch (e) {
      const message = e.displayText || e;
      setError(name, message);
    }

    setValue(name, value);
  }, [name]);

  useEffect(() => {
    setNamedValue(defaultValue);
    return () => {
      setValue(name,undefined);
      setError(name,undefined);
    }
  },[name, defaultValue]);

  return (
    <FormInput 
      value={values[name] || ''}
      error={errors[name] || null}
      setValue={setNamedValue}
      name={name}
      {...remainingProps} 
    />
  );
};

export default withFormHandling;