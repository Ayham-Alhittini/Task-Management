import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Copyright from './Copyright'
import { Link } from 'react-router-dom';
import { useFormik } from 'formik';
import * as yub from 'yup';

const singInSchema = yub.object().shape({
  email: yub.string().email("Please enter a valid email").required("Required"),
  password: yub.string().required("Required")
});

export default function SignIn() {

  const onSubmit = async (event) => {
    await new Promise(resolve => setTimeout(() => resolve(), 3000));
    console.log(values)
  };

  const { values, errors, touched, isSubmitting, handleChange, handleBlur, handleSubmit } = useFormik({
    initialValues: {
      email: '',
      password: ''
    },
    validationSchema: singInSchema,
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
        Sign in
      </Typography>
      <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
        <TextField
          margin="normal"
          value={values.email}
          onChange={handleChange}
          onBlur={handleBlur}
          fullWidth
          id="email"
          label="Email Address"
          name="email"
          autoComplete="email"
          autoFocus
          error={errors.email && touched.email}
          helperText={errors.email && touched.email ? errors.email : ''}
        />

        <TextField
          margin="normal"
          value={values.password}
          onChange={handleChange}
          onBlur={handleBlur}
          fullWidth
          name="password"
          label="Password"
          type="password"
          id="password"
          autoComplete="current-password"
          error={errors.password && touched.password}
          helperText={errors.password && touched.password ? errors.password : ''}
        />
        <FormControlLabel
          control={<Checkbox value="remember" color="primary" />}
          label="Remember me"
        />

        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
          disabled={isSubmitting}
        >
          Sign In
        </Button>

        <Grid container>
          <Grid item>
            <Link to={'/auth/signup'} variant="body2">
              {"Don't have an account? Sign Up"}
            </Link>
          </Grid>
        </Grid>
        <Copyright sx={{ mt: 5 }} />
      </Box>
    </Box>
  );
}