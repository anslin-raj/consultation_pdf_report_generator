import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
    TextField,
    Button,
    Box,
    Typography,
    CircularProgress,
} from "@mui/material";

import { login, reset } from "../../features/auth/authSlice";

const LoginForm = () => {
    const [formData, setFormData] = useState({
        username: "",
        password: "",
    });

    const { username, password } = formData;

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { user, isLoading, isError, isSuccess, message } = useSelector(
        (state) => state.auth
    );

    useEffect(() => {
        // if (isError) {
        // }

        if (isSuccess || user) {
            navigate("/dashboard");
        }

        dispatch(reset());
    }, [user, isError, isSuccess, message, navigate, dispatch]);

    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };

    const onSubmit = (e) => {
        e.preventDefault();

        const userData = {
            username,
            password,
        };

        dispatch(login(userData));
    };

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <Box component="section" sx={{ p: 4 }}>
            <Typography variant="h4" gutterBottom>
                Login
            </Typography>
            <form onSubmit={onSubmit}>
                <TextField
                    label="Username"
                    variant="outlined"
                    name="username"
                    value={username}
                    onChange={onChange}
                    fullWidth
                    margin="normal"
                />
                <TextField
                    label="Password"
                    variant="outlined"
                    type="password"
                    name="password"
                    value={password}
                    onChange={onChange}
                    fullWidth
                    margin="normal"
                />
                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    sx={{ mt: 2 }}
                >
                    Login
                </Button>
            </form>
        </Box>
    );
};

export default LoginForm;
