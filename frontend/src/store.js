import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/auth/authSlice";
import dashboardReducer from "./features/dashboard/dashboardSlice";
import reportsReducer from "./features/reports/reportsSlice";

const store = configureStore({
    reducer: {
        auth: authReducer,
        dashboard: dashboardReducer,
        reports: reportsReducer,
    },
});

export default store;
