import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../features/auth/authSlice";
import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

const Header = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.auth);

    const { isError: authError } = useSelector((state) => state.auth);
    const { isError: dashboardError } = useSelector((state) => state.dashboard);
    const {
        isError: reportsError,
        newReportId,
        reportPDF,
    } = useSelector((state) => state.reports);

    const [errorMessage, setErrorMessage] = useState("");
    const [alertSeverity, setAlertSeverity] = useState("success");
    const [open, setOpen] = useState(false);

    useEffect(() => {
        if (authError || dashboardError || reportsError) {
            // setErrorMessage(authError || dashboardError || reportsError);
            setErrorMessage("Error occurred while fetching data.");
            setAlertSeverity("error");
            setOpen(true);
        } else if (newReportId) {
            setErrorMessage("Report Created Sucessfully");
            setAlertSeverity("success");
            setOpen(true);
        } else if (reportPDF) {
            setErrorMessage("PDF Generated Sucessfully");
            setAlertSeverity("success");
            setOpen(true);
        }
    }, [authError, dashboardError, reportsError, newReportId]);

    const onLogout = () => {
        dispatch(logout());
        navigate("/login");
    };

    const handleClose = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }
        setOpen(false);
    };

    return (
        <>
            <AppBar position="static">
                <Toolbar>
                    <Box display="flex" alignItems="center" flexGrow={1}>
                        <MenuIcon />
                        <Typography
                            variant="h6"
                            component={Link}
                            to="/dashboard"
                            sx={{
                                textDecoration: "none",
                                color: "inherit",
                                marginLeft: 1,
                            }}
                        >
                            Anil Health
                        </Typography>
                    </Box>
                    <Box>
                        {user ? (
                            <>
                                <Button
                                    color="inherit"
                                    component={Link}
                                    to="/dashboard"
                                >
                                    Dashboard
                                </Button>
                                <Button
                                    color="inherit"
                                    component={Link}
                                    to="/reports"
                                >
                                    Reports
                                </Button>
                                <Button color="inherit" onClick={onLogout}>
                                    Logout
                                </Button>
                            </>
                        ) : (
                            <Button
                                color="inherit"
                                component={Link}
                                to="/login"
                            >
                                Login
                            </Button>
                        )}
                    </Box>
                </Toolbar>
            </AppBar>
            {ReactDOM.createPortal(
                // <ThemeProvider theme={theme}>
                <Snackbar
                    open={open}
                    autoHideDuration={6000}
                    onClose={handleClose}
                    anchorOrigin={{
                        vertical: "top",
                        horizontal: "right",
                    }}
                    style={{ zIndex: 20000 }}
                >
                    <MuiAlert
                        onClose={handleClose}
                        severity={alertSeverity}
                        sx={{
                            width: "100%",
                        }}
                    >
                        {errorMessage}
                    </MuiAlert>
                </Snackbar>,
                // </ThemeProvider>
                document.body
            )}
        </>
    );
};

export default Header;
