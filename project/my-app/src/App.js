import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import {
  Button,
  FormHelperText,
  Grid,
  IconButton,
  InputAdornment,
  TextField,
};
// import Link from "next/link";
import { ErrorMessage, Form, Formik, FormikValues } from "formik";
import * as Yup from "yup";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import Slider from "../../src/components/auth/slider";
import { Routes } from "../../src/shared/utils/routes";
import authService from "../../src/services/auth/authService";
import { RegisterRequest } from "../../src/services/types/auth";
import { ApiResponseStatus } from "../../src/shared/enums/apiResponseStatus";
import { Visibility, VisibilityOff } from "@mui/icons-material";

const RegisterPage = () => {
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const validationSchema = Yup.object().shape({
    firstname: Yup.string().required("First name is required"),
    lastname: Yup.string().required("Last name is required"),
    phone: Yup.string()
      .required("Phone number is required")
      .matches(
        /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/,
        "Phone number is not valid"
      )
      .min(10, "Phone number must be of 10 digits")
      .max(10, "Phone number must be of 10 digits"),
    email: Yup.string().required("Email is required").email("Email is invalid"),
    password: Yup.string()
      .required("Password is required")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,16}$/,
        "Password must have minimum 8 characters, maximum 16 characters, at least one uppercase letter, one lowercase letter, one number and one special character"
      ),
    confirmPassword: Yup.string()
      .required("Confirm your password")
      .oneOf([Yup.ref("password"), ""], "Passwords do not match"),
  });

  const handleSubmit = async (values: FormikValues) => {
    try {
      const payload: RegisterRequest = {
        firstName: values.firstname,
        lastName: values.lastname,
        phoneNumber: values.phone,
        email: values.email,
        password: values.password,
      };
      const response = await authService.Register(payload);
      if (response.data.status === ApiResponseStatus.Error) {
        toast.error(response.data.message);
      } else {
        toast.success(response.data.message);
        router.push(Routes.Login);
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <Grid container>
      <Grid item xs={12} md={8}>
        <Slider />
      </Grid>
      <Grid item xs={12} md={4}>
        <div className="d-flex flex-column justify-content-center h-100">
          <div className="p-5">
            <Formik
              initialValues={{
                firstname: "",
                lastname: "",
                phone: "",
                email: "",
                password: "",
                confirmPassword: "",
              }}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {({ values, handleChange, handleBlur, errors, touched }) => (
                <Form>
                  <TextField
                    value={values.firstname}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={!!(errors.firstname && touched.firstname)}
                    label="First Name"
                    variant="outlined"
                    name="firstname"
                    fullWidth
                  />
                  <FormHelperText error>
                    <ErrorMessage name="firstname" />
                  </FormHelperText>

                  <TextField
                    value={values.lastname}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={!!(errors.lastname && touched.lastname)}
                    label="Last Name"
                    variant="outlined"
                    name="lastname"
                    fullWidth
                    className="mt-3"
                  />
                  <FormHelperText error>
                    <ErrorMessage name="lastname" />
                  </FormHelperText>

                  <TextField
                    value={values.phone}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={!!(errors.phone && touched.phone)}
                    label="Phone No"
                    variant="outlined"
                    name="phone"
                    fullWidth
                    className="mt-3"
                  />
                  <FormHelperText error>
                    <ErrorMessage name="phone" />
                  </FormHelperText>

                  <TextField
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={!!(errors.email && touched.email)}
                    label="Email Address"
                    variant="outlined"
                    name="email"
                    fullWidth
                    className="mt-3"
                  />
                  <FormHelperText error>
                    <ErrorMessage name="email" />
                  </FormHelperText>

                  <TextField
                    value={values.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={!!(errors.password && touched.password)}
                    label="Password"
                    variant="outlined"
                    name="password"
                    fullWidth
                    className="mt-3"
                    type={showPassword ? "text" : "password"}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            onClick={() => setShowPassword(!showPassword)}
                          >
                            {showPassword ? (
                              <VisibilityOff />
                            ) : (
                              <Visibility />
                            )}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                  <FormHelperText error>
                    <ErrorMessage name="password" />
                  </FormHelperText>

                  <TextField
                    value={values.confirmPassword}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={!!(errors.confirmPassword && touched.confirmPassword)}
                    label="Confirm Password"
                    variant="outlined"
                    name="confirmPassword"
                    fullWidth
                    className="mt-3"
                    type={showConfirmPassword ? "text" : "password"}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          >
                            {showConfirmPassword ? (
                              <VisibilityOff />
                            ) : (
                              <Visibility />
                            )}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                  <FormHelperText error>
                    <ErrorMessage name="confirmPassword" />
                  </FormHelperText>

                  <Button
                    variant="outlined"
                    type="submit"
                    fullWidth
                    className="login-button mt-5"
                  >
                    Register
                  </Button>
                </Form>
              )}
            </Formik>
            <div className="text-center mt-2">
              <span>
                Have an account?{" "}
                <Link href={Routes.Login}>Login Account</Link>
              </span>
            </div>
          </div>
        </div>
      </Grid>
    </Grid>
  );
};

export default RegisterPage;
