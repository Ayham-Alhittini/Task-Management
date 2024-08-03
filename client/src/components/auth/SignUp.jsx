import * as React from 'react';
import { Alert, Avatar, Box, Button, Grid, TextField, Typography } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { Link, useNavigate } from 'react-router-dom';
import Copyright from './Copyright';
import { useFormik } from 'formik';
import * as yup from 'yup';

import authService from '../../services/AuthService';

const passwordRules = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}$/;

const signUpSchema = yup.object().shape({
  firstName: yup.string().required("Required"),
  lastName: yup.string().required("Required"),
  email: yup.string().email("Please enter a valid email").required("Required"),
  password: yup.string().min(6).matches(passwordRules, { message: "Please create a stronger password." }).required("Required")
});

function SignUp() {

  const navigate = useNavigate();
  const [serverError, setServerError] = React.useState();

  const onSubmit = async () => {
    try {
      await authService.singUp(values);
      navigate('/auth/signin');
    } catch (error) {
      setServerError(error.response.data.message);
    }
  };

  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: ''
    },
    validationSchema: signUpSchema,
    onSubmit
  });

  const { values, errors, touched, isSubmitting, handleChange, handleBlur, handleSubmit } = formik;

  return (
    <Box
      sx={{
        my: 8,
        mx: 4,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
        <LockOutlinedIcon />
      </Avatar>
      <Typography component="h1" variant="h5">
        Sign up
      </Typography>

      {serverError && <Alert severity="error" sx={{ my: '10px' }} onClose={() => setServerError(undefined)}>{serverError}</Alert>}

      <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              value={values.firstName}
              onChange={handleChange}
              onBlur={handleBlur}
              autoComplete="given-name"
              name="firstName"
              fullWidth
              id="firstName"
              label="First Name"
              error={touched.firstName && Boolean(errors.firstName)}
              helperText={touched.firstName && errors.firstName}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              value={values.lastName}
              onChange={handleChange}
              onBlur={handleBlur}
              fullWidth
              id="lastName"
              label="Last Name"
              name="lastName"
              autoComplete="family-name"
              error={touched.lastName && Boolean(errors.lastName)}
              helperText={touched.lastName && errors.lastName}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              error={touched.email && Boolean(errors.email)}
              helperText={touched.email && errors.email}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="new-password"
              error={touched.password && Boolean(errors.password)}
              helperText={touched.password && errors.password}
            />
          </Grid>
        </Grid>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
          disabled={isSubmitting}
        >
          Sign Up
        </Button>
        <Link to={'/auth/signin'} variant="body2">
          Already have an account? Sign in
        </Link>
        <Copyright sx={{ mt: 5 }} />
      </Box>
    </Box>
  );
}

export default SignUp;
