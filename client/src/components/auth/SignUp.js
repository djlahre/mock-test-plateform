import React from "react";
import { Link } from "react-router-dom";
import * as yup from "yup";
import { Form, Formik } from "formik";
import userService from "../../services/user";
import utils from "../../utils";
import Input from "../common/Input";

const validationSchema = yup.object().shape({
  firstName: yup
    .string()
    .trim()
    .max(20, "Must be 20 characters or less")
    .required("Required"),
  lastName: yup
    .string()
    .trim()
    .max(20, "Must be 20 characters or less")
    .required("Required"),
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
  confirmPassword: yup
    .string()
    .trim()
    .test("confirmPassword", "Passwords must match", function (value) {
      return this.parent.password === value;
    }),
});
const initialValues = utils.initialValuesObject(validationSchema);

export default function SignUp({ history, spinner }) {
  const onSubmit = async (values, actions) => {
    spinner.setLoading(true);
    const { setSubmitting, setFieldError, resetForm } = actions;
    const res = await userService.handleSignUp(values);
    if (res.status) {
      resetForm();
      setSubmitting(false);
      alert(res.data.msg);
      history.replace("/signin");
    } else {
      setFieldError(res.field, res.msg);
      setSubmitting(false);
    }
    spinner.setLoading(false);
  };

  return (
    <div className="cs-form">
      <h4 className="py-2">Create your account</h4>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {({ isSubmitting }) => (
          <Form className="row g-2" noValidate>
            <Input label="First name" name="firstName" type="text" />
            <Input label="Last name" name="lastName" type="text" />
            <Input label="Email" name="email" type="email" />
            <Input label="Password" name="password" type="password" />
            <Input
              label="Confirm password"
              name="confirmPassword"
              type="password"
            />
            <div className="mt-3">
              <button
                type="submit"
                className="btn btn-primary w-100"
                disabled={isSubmitting}
              >
                Sign up
              </button>
            </div>
          </Form>
        )}
      </Formik>
      <div className="text-center mt-3">
        Already have an account? <Link to="/signin">Sign in</Link>
      </div>
    </div>
  );
}
