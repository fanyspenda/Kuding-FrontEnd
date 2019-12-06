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
          <SemanticInput {...fieldProps.field} type={type} fluid />
        )}
      />
      <FormikErrorMessage
        {...rest}
        render={error => (
          <SemanticLabel basic color="red" pointing="above">
            {error}
          </SemanticLabel>
        )}
      />
    </>
  );
};

export default Input;
