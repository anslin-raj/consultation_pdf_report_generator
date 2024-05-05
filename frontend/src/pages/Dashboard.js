import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
    Box,
    Typography,
    Grid,
    Card,
    CardContent,
    IconButton,
} from "@mui/material";
import { getUserProfile } from "../features/auth/authSlice";
import { getDashboardCounts } from "../features/dashboard/dashboardSlice";
import ReportsChart from "../components/charts/ReportsChart";
import HomeSpeedDial from "../components/shared/SpeedDial";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {
        userData,
        isLoading: authLoading,
        isError: authError,
    } = useSelector((state) => state.auth);
    const {
        reportCount,
        physicianCount,
        patientCount,
        clinicCount,
        lastReport,
        reportCountsLast7Days,
        lastReportCreatedAt,
        mostCommonComplaint,
        isLoading: dashboardLoading,
        isError: dashboardError,
    } = useSelector((state) => state.dashboard);

    useEffect(() => {
        dispatch(getUserProfile());
        dispatch(getDashboardCounts());
    }, [dispatch]);

    if (authLoading || dashboardLoading) {
        return <div>Loading...</div>;
    }

    if (authError || dashboardError) {
        return <div>Error occurred while fetching data.</div>;
    }

    return (
        <>
            <Box p={4}>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={9}>
                        <Typography variant="h4" gutterBottom>
                            Welcome,{" "}
                            {userData?.username?.charAt(0).toUpperCase() +
                                userData?.username?.slice(1)}
                            !
                        </Typography>
                    </Grid>
                    <Grid
                        item
                        xs={12}
                        sm={3}
                        justifyContent="flex-end"
                        display="flex"
                        marginBottom={"10px"}
                    >
                        <Button
                            variant="contained"
                            onClick={() => navigate("/add_report")}
                            endIcon={<AddCircleIcon />}
                        >
                            Add Report
                        </Button>
                    </Grid>
                </Grid>
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={6} md={3}>
                        <Card>
                            <CardContent>
                                <Typography variant="h5" gutterBottom>
                                    Reports
                                </Typography>
                                <Typography variant="h4">
                                    {reportCount}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        <Card>
                            <CardContent>
                                <Typography variant="h5" gutterBottom>
                                    Physicians
                                </Typography>
                                <Typography variant="h4">
                                    {physicianCount}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        <Card>
                            <CardContent>
                                <Typography variant="h5" gutterBottom>
                                    Patients
                                </Typography>
                                <Typography variant="h4">
                                    {patientCount}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        <Card>
                            <CardContent>
                                <Typography variant="h5" gutterBottom>
                                    Clinics
                                </Typography>
                                <Typography variant="h4">
                                    {clinicCount}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Card>
                            <CardContent>
                                <Typography variant="h5" gutterBottom>
                                    Last Report Created
                                </Typography>
                                <Typography variant="h6">
                                    {lastReport}
                                </Typography>
                                <Typography variant="body2">
                                    Created at: {lastReportCreatedAt}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Card>
                            <CardContent>
                                <Typography variant="h5" gutterBottom>
                                    Most Common Complaint
                                </Typography>
                                <Typography variant="h6">
                                    {mostCommonComplaint?.chief_complaint}
                                </Typography>
                                <Typography variant="body2">
                                    Occurrences: {mostCommonComplaint?.count}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={12} md={12}>
                        <ReportsChart reportCounts={reportCountsLast7Days} />
                    </Grid>
                </Grid>
            </Box>
            {/* <HomeSpeedDial/> */}
        </>
    );
};

export default Dashboard;
