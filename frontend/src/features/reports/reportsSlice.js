import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "../auth/authService";
import reportsService from "./reportsService";

export const getReports = createAsyncThunk(
    "reports/getReports",
    async (_, thunkAPI) => {
        try {
            const response = await reportsService.getReports();
            return response;
        } catch (error) {
            return thunkAPI.rejectWithValue("Error fetching dashboard counts");
        }
    }
);

export const getReportPDF = createAsyncThunk(
    "reports/getReportPDF",
    async (report_id, thunkAPI) => {
        try {
            const response = await reportsService.getReportPDF(report_id);
            return response;
        } catch (error) {
            return thunkAPI.rejectWithValue("Error fetching dashboard counts");
        }
    }
);

export const createReport = createAsyncThunk(
    "reports/createReport",
    async (report, thunkAPI) => {
        try {
            const response = await reportsService.createReport(report);
            return response;
        } catch (error) {
            return thunkAPI.rejectWithValue("Error fetching dashboard counts");
        }
    }
);

export const deleteReport = createAsyncThunk(
    "reports/deleteReport",
    async (report_id, thunkAPI) => {
        try {
            const response = await reportsService.deleteReport(report_id);
            return response;
        } catch (error) {
            return thunkAPI.rejectWithValue("Error fetching dashboard counts");
        }
    }
);

const initialState = {
    reports: [],
    newReportId: "",
    reportPDF: "",
    isLoading: false,
    isError: false,
};

const reportsSlice = createSlice({
    name: "reports",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getReports.pending, (state) => {
                state.isLoading = true;
                state.isError = false;
            })
            .addCase(getReports.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.reports = action.payload;
            })
            .addCase(getReports.rejected, (state) => {
                state.isLoading = false;
                state.isError = true;
            })
            .addCase(getReportPDF.pending, (state) => {
                state.isLoading = true;
                state.isError = false;
            })
            .addCase(getReportPDF.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.reportPDF = action.payload;
            })
            .addCase(getReportPDF.rejected, (state) => {
                state.isLoading = false;
                state.isError = true;
            })
            .addCase(createReport.pending, (state) => {
                state.isLoading = true;
                state.isError = false;
            })
            .addCase(createReport.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.newReportId = action.payload.id;
            })
            .addCase(createReport.rejected, (state) => {
                state.isLoading = false;
                state.isError = true;
            })
            .addCase(deleteReport.pending, (state) => {
                state.isLoading = true;
                state.isError = false;
            })
            .addCase(deleteReport.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                // state.newReportId = action.payload.id;
            })
            .addCase(deleteReport.rejected, (state) => {
                state.isLoading = false;
                state.isError = true;
            });
    },
});

export default reportsSlice.reducer;
