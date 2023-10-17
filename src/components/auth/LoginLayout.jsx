import { useFormik } from "formik";
import React, { useContext, useEffect, useState } from "react";
import { Button, Card, Form, Alert } from "react-bootstrap"; // Import Alert from react-bootstrap
import * as Yup from "yup";
import { AuthContext } from "../../context/AuthContext";
import { Link } from "react-router-dom";

const LoginLayout = () => {
  const { login, error } = useContext(AuthContext);
  const [showPassword, setShowPasword] = useState(false);
  const formik = useFormik({
    validateOnMount: true,
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object().shape({
      email: Yup.string().required().email(),
      password: Yup.string().required().min(6),
    }),
    onSubmit: async (values) => {
      console.log(values);
      if (formik.isValid) {
        await login({ email: values.email, password: values.password });
      }
    },
  });

  return (
    <Card className="p-4 bg-light form_card">
      <Form onSubmit={formik.handleSubmit}>
        {error && <Alert variant="danger">invalid-login-credentials</Alert>}

        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Email"
            isInvalid={formik.errors.email && formik.touched.email}
            name="email"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.errors.email && formik.touched.email ? (
            <Form.Text className="text-danger">{formik.errors.email}</Form.Text>
          ) : null}
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            isInvalid={formik.errors.password && formik.touched.password}
            name="password"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.errors.password && formik.touched.password ? (
            <Form.Text className="text-danger">
              {formik.errors.password}
            </Form.Text>
          ) : null}
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicCheckbox">
          <Form.Check
            type="checkbox"
            label="Show Password"
            onChange={() => setShowPasword(!showPassword)}
          />
        </Form.Group>

        <Button variant="primary" type="submit" className="w-100 mb-3">
          Login
        </Button>
      </Form>
      <div>
        <Link to="/signup">Don't have an account?</Link>
        <Link className="d-block mt-2" to="/">
          Home
        </Link>
      </div>
    </Card>
  );
};

export default LoginLayout;
