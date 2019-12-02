import React from "react";
import {
  Input as SemanticInput,
  Label as SemanticLabel
} from "semantic-ui-react";
import { Field, ErrorMessage as FormikErrorMessage } from "formik";

const Input = props => {
  const { type, ...rest } = props;

  return (
    <>
      <Field
        {...rest}
        render={fieldProps => (
          <SemanticInput {...fieldProps.field} type={type} />
        )}
      />
      <FormikErrorMessage
        {...rest}
        render={error => <SemanticLabel color="red">{error}</SemanticLabel>}
      />
    </>
  );
};

export default Input;
