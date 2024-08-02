import { Avatar, Box, Button, Grid, TextField, Typography } from '@mui/material'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import React from 'react'
import { Link } from 'react-router-dom'
import Copyright from './Copyright';
import { useFormik } from 'formik';
import * as yub from 'yup';

const passwordRules = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}$/;
// min 6 characters, 1 upper case letter, 1 lower case letter, 1 numeric digit

const singUpSchema = yub.object().shape({
  firstName: yub.string().required("Required"),
  lastName: yub.string().required("Required"),
  email: yub.string().email("Please enter a valid email").required("Required"),
  password: yub.string().min(6).matches(passwordRules, { message: "Please create a stronger password." }).required("Required")
});

function SignUp() {

  const onSubmit = async (event) => {
    await new Promise(resolve => setTimeout(() => resolve(), 3000));
    console.log(values)
  };

  const { values, errors, touched, isSubmitting, handleChange, handleBlur, handleSubmit } = useFormik({
    initialValues: {
      email: '',
      password: ''
    },
    validationSchema: singUpSchema,
    onSubmit
  })

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
      <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              value={values.firstName}
              onChange={handleChange}
              onBlur={handleBlur}
              autoComplete="given-name"
              name="firstName"
              required
              fullWidth
              id="firstName"
              label="First Name"
              autoFocus
              error={errors.firstName && touched.firstName}
              helperText={errors.firstName && touched.firstName ? errors.firstName : ''}
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
              error={errors.lastName && touched.lastName}
              helperText={errors.lastName && touched.lastName ? errors.lastName : ''}
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
              error={errors.email && touched.email}
              helperText={errors.email && touched.email ? errors.email : ''}
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
              error={errors.password && touched.password}
              helperText={errors.password && touched.password ? errors.password : ''}
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
  )
}

export default SignUp