import React, { useState } from "react";
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
  otp: yup.number(),
  password: yup.string().trim().min(8),
});
const initialValues = utils.initialValuesObject(validationSchema);

export default function ForgotPassword({ spinner, history }) {
  const [otp, setOtp] = useState(null);

  const onSubmit = async (values, actions) => {
    spinner.setLoading(true);
    const { setSubmitting, setFieldError, resetForm } = actions;

    if (!otp) {
      const res = await userService.passwordResetOtp(values);
      if (res.otp) {
        setSubmitting(false);
        setOtp(res.otp);
        alert(res.msg);
      } else {
        setFieldError(res.field, res.msg);
        setSubmitting(false);
      }
    } else {
      if (parseInt(otp) === parseInt(values.otp)) {
        const res = await userService.passwordReset(values);
        alert(res.msg);
        resetForm();
        setSubmitting(false);
        history.replace("/signin");
      } else {
        setFieldError("otp", "Wrong otp");
      }
    }
    spinner.setLoading(false);
  };

  return (
    <div className="cs-form">
      <h4 className="py-2">Reset password</h4>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {({ isSubmitting }) => (
          <Form className="row g-2" noValidate>
            <Input label="Email" name="email" type="email" />
            {otp ? <Input label="OTP" name="otp" type="text" /> : null}
            {otp ? (
              <Input label="New password" name="password" type="password" />
            ) : null}
            <div className="mt-3">
              <button
                type="submit"
                className="btn btn-primary w-100"
                disabled={isSubmitting}
              >
                {otp ? "Verify and submit" : "Get otp"}
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}
