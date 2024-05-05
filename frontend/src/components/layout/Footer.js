import React from "react";
import {
    Box,
    Container,
    Grid,
    Typography,
    IconButton,
    Link,
} from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";

const Footer = () => {
    return (
        <Box
            component="footer"
            bgcolor="primary.main"
            color="primary.contrastText"
            py={3}
        >
            <Container maxWidth="lg">
                <Grid container spacing={3}>
                    <Grid item xs={12} md={6}>
                        <Typography variant="h6">About Us</Typography>
                        <Typography variant="body1">
                            We are a company dedicated to providing high-quality
                            products and services to our customers. Our mission
                            is to make your life easier and more enjoyable.
                        </Typography>
                    </Grid>
                    <Grid item xs={12} md={3}>
                        <Typography variant="h6">Quick Links</Typography>
                        <Box component="nav">
                            <Link
                                href="/"
                                color="inherit"
                                underline="hover"
                                variant="body1"
                            >
                                Dashboard
                            </Link>{" "}
                            <Link
                                href="/about"
                                color="inherit"
                                underline="hover"
                                variant="body1"
                            >
                                About
                            </Link>{" "}
                            <Link
                                href="/services"
                                color="inherit"
                                underline="hover"
                                variant="body1"
                            >
                                Services
                            </Link>{" "}
                            <Link
                                href="/contact"
                                color="inherit"
                                underline="hover"
                                variant="body1"
                            >
                                Contact
                            </Link>
                        </Box>
                    </Grid>
                    <Grid item xs={12} md={3}>
                        <Typography variant="h6">Follow Us</Typography>
                        <Box>
                            <IconButton color="inherit" aria-label="Facebook">
                                <FacebookIcon />
                            </IconButton>
                            <IconButton color="inherit" aria-label="Twitter">
                                <TwitterIcon />
                            </IconButton>
                            <IconButton color="inherit" aria-label="Instagram">
                                <InstagramIcon />
                            </IconButton>
                        </Box>
                    </Grid>
                </Grid>
                <Box mt={3}>
                    <Typography variant="body2" color="inherit" align="center">
                        &copy; 2024 Anslin Raj | Anil Health. All rights
                        reserved.
                    </Typography>
                </Box>
            </Container>
        </Box>
    );
};

export default Footer;
