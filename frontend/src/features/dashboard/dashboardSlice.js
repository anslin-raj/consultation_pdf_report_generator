import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "../auth/authService";
import dashboardService from "./dashboardService";

export const getDashboardCounts = createAsyncThunk(
    "dashboard/getDashboardCounts",
    async (_, thunkAPI) => {
        try {
            const response = await dashboardService.getDashboardCounts();
            return response;
        } catch (error) {
            return thunkAPI.rejectWithValue("Error fetching dashboard counts");
        }
    }
);

const initialState = {
    reportCount: 0,
    physicianCount: 0,
    patientCount: 0,
    clinicCount: 0,
    isLoading: false,
    isError: false,
};

const dashboardSlice = createSlice({
    name: "dashboard",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getDashboardCounts.pending, (state) => {
                state.isLoading = true;
                state.isError = false;
            })
            .addCase(getDashboardCounts.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.reportCount = action.payload.reportCount;
                state.physicianCount = action.payload.physicianCount;
                state.patientCount = action.payload.patientCount;
                state.clinicCount = action.payload.clinicCount;
                state.lastReport = action.payload.lastReport;
                state.reportCountsLast7Days =
                    action.payload.reportCountsLast7Days;
                state.lastReportCreatedAt = action.payload.lastReportCreatedAt;
                state.mostCommonComplaint = action.payload.mostCommonComplaint;
            })
            .addCase(getDashboardCounts.rejected, (state) => {
                state.isLoading = false;
                state.isError = true;
            });
    },
});

export default dashboardSlice.reducer;
