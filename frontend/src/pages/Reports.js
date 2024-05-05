import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
    Box,
    Typography,
    Grid,
    Card,
    CardContent,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    IconButton,
    CircularProgress,
} from "@mui/material";
import { getUserProfile } from "../features/auth/authSlice";
import { getDashboardCounts } from "../features/dashboard/dashboardSlice";
import ReportsChart from "../components/charts/ReportsChart";
import { getReports, getReportPDF } from "../features/reports/reportsSlice";
import DeleteIcon from "@mui/icons-material/Delete";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import DownloadIcon from "@mui/icons-material/Download";
import EditIcon from "@mui/icons-material/Edit";
import { useNavigate } from "react-router-dom";

const Reports = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {
        reports,
        isLoading: reportsLoading,
        isError: reportsError,
    } = useSelector((state) => state.reports);
    useEffect(() => {
        dispatch(getReports());
    }, [dispatch]);

    return (
        <Box p={4}>
            <Grid item xs={12} md={12}>
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>#</TableCell>
                                <TableCell>Patient</TableCell>
                                <TableCell>Physician</TableCell>
                                <TableCell>Clinic</TableCell>
                                <TableCell align="right">
                                    {reportsLoading ? (
                                        <IconButton
                                            aria-label="delete"
                                            color="primary"
                                        >
                                            <CircularProgress size="1.2rem" />
                                        </IconButton>
                                    ) : (
                                        <IconButton
                                            aria-label="delete"
                                            color="primary"
                                            disabled={reportsLoading}
                                            onClick={() =>
                                                navigate("/add_report")
                                            }
                                        >
                                            <AddCircleIcon />
                                        </IconButton>
                                    )}
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {reports?.length === 0 && (
                                <TableRow>
                                    <TableCell>~</TableCell>
                                    <TableCell>
                                        It seems the user table is empty.
                                    </TableCell>
                                    <TableCell></TableCell>
                                    <TableCell></TableCell>
                                    <TableCell align="right">
                                        <IconButton
                                            aria-label="download"
                                            color="primary"
                                            disabled
                                        >
                                            <DownloadIcon />
                                        </IconButton>
                                        <IconButton
                                            aria-label="edit"
                                            color="primary"
                                            disabled
                                        >
                                            <EditIcon />
                                        </IconButton>
                                        <IconButton
                                            aria-label="delete"
                                            color="primary"
                                            disabled
                                        >
                                            <DeleteIcon />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            )}
                            {reports?.map((report_obj, index) => (
                                <TableRow key={index}>
                                    <TableCell>{index + 1}</TableCell>
                                    <TableCell>
                                        {report_obj?.patient_first_name}
                                    </TableCell>
                                    <TableCell>
                                        {report_obj?.physician_name}
                                    </TableCell>
                                    <TableCell>
                                        {report_obj?.clinic_name}
                                    </TableCell>
                                    <TableCell align="right">
                                        <IconButton
                                            aria-label="download"
                                            color="primary"
                                            disabled={reportsLoading}
                                            onClick={() =>
                                                dispatch(
                                                    getReportPDF(report_obj?.id)
                                                )
                                            }
                                        >
                                            <DownloadIcon />
                                        </IconButton>
                                        <IconButton
                                            aria-label="edit"
                                            color="primary"
                                            disabled={reportsLoading}
                                        >
                                            <EditIcon />
                                        </IconButton>
                                        <IconButton
                                            aria-label="delete"
                                            color="primary"
                                            disabled={reportsLoading}
                                        >
                                            <DeleteIcon />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Grid>
        </Box>
    );
};

export default Reports;
