/* Source of this React Component SignIn: free template taken with modifications
from MUI (mui.com) under MIT-licence (see the licence at the bottom of this file */

import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import {createTheme, ThemeProvider} from '@mui/material/styles';
import {useNavigate} from "react-router-dom";
import {handleLogin} from "../service/authentication.js";
import {stylingTextfield} from "../data/stylingElements.js";
import {useState} from "react";

function LabelEndOfPage(props) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props} style={{marginTop: "150px"}}>
            {'Virus Spread Simulations '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const defaultTheme = createTheme();

export default function SignIn() {
    const [isSignInFailed, setIsSignInFailed] = useState(false);
    const navigate = useNavigate();

    return (
        <ThemeProvider theme={defaultTheme}>
            <Grid container component="main" sx={{height: '100vh'}}>
                <CssBaseline/>
                <Grid
                    item
                    xs={false}
                    sm={4}
                    md={7}
                    sx={{
                        backgroundImage: 'url(\'/pexels-bo-ponomari.jpg\')',
                        backgroundRepeat: 'no-repeat',
                        backgroundColor: (t) =>
                            t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }}
                />
                <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square
                      className="signin-right-side">
                    <Box
                        sx={{
                            my: 8,
                            mx: 4,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center'
                        }}
                    >
                        <Typography component="h1" variant="h5"
                                    style={{
                                        marginBottom: '5px',
                                        fontSize: '50px',
                                        marginTop: '180px',
                                        color: '#1a2c20',
                                        fontWeight: '800'
                                    }}>
                            Virus Spread Simulations
                        </Typography>
                        <Typography component="h1" variant="h5"
                                    style={{
                                        fontSize: '40px',
                                        marginTop: '0px',
                                        marginBottom: '70px',
                                        color: '#a07e68',
                                        fontWeight: '800'
                                    }}>
                            among monkeys
                        </Typography>
                        <Typography
                            style={{marginBottom: '10px', fontSize: '40px', color: '#1a2c20', fontWeight: '800'}}>
                            Sign in
                        </Typography>
                        {isSignInFailed && <Typography
                            style={{marginBottom: '10px', fontSize: '20px', color: '#d5b50c', fontWeight: '800'}}>
                            Sign in did not work. Please try again!
                        </Typography>}
                        <Box component="form" noValidate
                             onSubmit={event => handleLogin(event, navigate, setIsSignInFailed)}
                             sx={{mt: 1}} style={{width: "500px"}}>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                                autoFocus
                                sx={stylingTextfield}
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                                sx={stylingTextfield}
                            />
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{
                                    mt: 3,
                                    mb: 2,
                                    borderRadius: '15px',
                                    color: '#1a2c20',
                                    borderColor: '#1a2c20',
                                    backgroundColor: '#a07e68',
                                    "&:focus": {backgroundColor: '#a07e68', borderColor: '#1a2c20'},
                                    "&:hover": {backgroundColor: '#e5c6b2', borderColor: '#1a2c20'}
                                }}
                            >
                                Sign In
                            </Button>
                            <Grid container className="link-to-register">
                                <Grid item className="link-to-register-grid">
                                    <Link href="/register" variant="body1" sx={{color: '#1a2c20'}}>
                                        {"You don't have an account? Register now!"}
                                    </Link>
                                </Grid>
                            </Grid>
                            <LabelEndOfPage sx={{mt: 5, color: '#1a2c20'}}/>
                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </ThemeProvider>
    );
}

/*
The MIT License (MIT)

Copyright (c) 2014 Call-Em-All

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/