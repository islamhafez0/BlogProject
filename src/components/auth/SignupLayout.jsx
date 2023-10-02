import React, { useContext } from 'react'
import { Button, Card, Form } from 'react-bootstrap'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { AuthContext } from '../../context/AuthContext'
import { Link } from 'react-router-dom'
const SignupLayout = () => {
  const { signup } = useContext(AuthContext)
  const formik = useFormik({
    validateOnMount: true,
    initialValues: {
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
      chechbox: false
    },
    validationSchema: Yup.object().shape({
      username: Yup.string().required(),
      email: Yup.string().required().email(),
      password: Yup.string().required().min(6),
      confirmPassword: Yup.string().required().oneOf([Yup.ref('password')], 'Password must be match'),
      chechbox: Yup.boolean().oneOf([true], 'Required')
    }),
    onSubmit: (values) => {
      console.log(values)
      if(formik.isValid) {
        try {
          signup({email: values.email, password: values.password})
        } catch (error) {
          alert(error.message)
        }
      }
    }
  })


  return (
    <Card className='p-4 bg-light form_card'>
      <Form onSubmit={formik.handleSubmit}>
      <Form.Group className="mb-3" controlId="formBasicUsername">
          <Form.Label>Username</Form.Label>
          <Form.Control 
            type="text" 
            placeholder="Username" 
            name='username'
            isInvalid={formik.errors.username && formik.touched.username}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
            {formik.errors.username && formik.touched.username ? (
              <Form.Text className="text-danger">
                {formik.errors.username}
              </Form.Text>
            ) : null}
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control 
            type="email" 
            placeholder="Email"
            isInvalid={formik.errors.email && formik.touched.email}
            name='email'
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.errors.email && formik.touched.email ? (
            <Form.Text className="text-danger">
              {formik.errors.email}
            </Form.Text>
          ): null}
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control 
            type="password" 
            placeholder="Password" 
            isInvalid={formik.errors.password && formik.touched.password}
            name='password'
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.errors.password && formik.touched.password ? (
            <Form.Text className="text-danger">
              {formik.errors.password}
            </Form.Text>
          ): null}
        </Form.Group>


        <Form.Group className="mb-3" controlId="formBasicConfirmPassword">
          <Form.Label>Confirm password</Form.Label>
          <Form.Control 
            type="password" 
            placeholder="Confirm password" 
            name='confirmPassword'
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.errors.confirmPassword && formik.touched.confirmPassword ? (
            <Form.Text className="text-danger">
              {formik.errors.confirmPassword}
            </Form.Text>
          ): null}
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicCheckbox">
          <Form.Check 
            type="checkbox" 
            label="I agree for the terms and conditions"
            name='chechbox'
            className={formik.errors.chechbox && formik.touched.chechbox ? 'text-danger' : ''}
            onChange={formik.handleChange}
          />
          {formik.errors.chechbox && formik.touched.chechbox ? (
            <Form.Text className="text-danger">
              {formik.errors.chechbox}
            </Form.Text>
          ): null}
        </Form.Group>

        <Button variant="primary" type="submit" className='w-100'>
          Signup
        </Button>
      </Form>
        <Link to='/' className='mt-3'>
          home
        </Link>
    </Card>
  )
}

export default SignupLayout
