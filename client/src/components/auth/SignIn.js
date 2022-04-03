import React from "react";
import { Link } from "react-router-dom";
import * as yup from "yup";
import { Form, Formik } from "formik";
import userService from "../../services/user";
import utils from "../../utils";
import Input from "../common/Input";

const validationSchema = yup.object().shape({
  email: yup
    .string()
    .trim()
    .email("Please enter valid email")
    .required("Required"),
  password: yup
    .string()
    .trim()
    .min(8, "Minimum 8 characters")
    .max(25, "Maximum 25 characters")
    .required("Required"),
});
const initialValues = utils.initialValuesObject(validationSchema);
// for demo
initialValues.email = "guestuser@host.com";
initialValues.password = "abcd1234";

export default function SignIn({ user, history, spinner }) {
  const onSubmit = async (values, actions) => {
    spinner.setLoading(true);
    const { setSubmitting, setFieldError, resetForm } = actions;
    const res = await userService.handleSignIn(values);
    if (res.status) {
      resetForm();
      setSubmitting(false);
      user.setUserToken(res.token);
      history.replace("/dashboard");
    } else {
      setFieldError(res.field, res.msg);
      setSubmitting(false);
    }
    spinner.setLoading(false);
  };

  return (
    <div className="cs-form">
      <h4 className="py-2">Sign in</h4>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {({ isSubmitting }) => (
          <Form className="row g-2" noValidate>
            <Input label="Email" name="email" type="email" />
            <Input label="Password" name="password" type="password" />
            <div className="mt-3">
              <button
                type="submit"
                className="btn btn-primary w-100"
                disabled={isSubmitting}
              >
                Sign in
              </button>
            </div>
          </Form>
        )}
      </Formik>
      <div className="text-center mt-3">
        <Link to="/forgot-password">Forgot password?</Link> <br />
        No account? <Link to="/signup">Create one</Link>
      </div>
    </div>
  );
}
