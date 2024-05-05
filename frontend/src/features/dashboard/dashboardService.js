import axios from "axios";

import { API_URL } from "../../apiConfig";

const getDashboardCounts = async () => {
    const user = JSON.parse(localStorage.getItem("user"));
    const config = {
        headers: {
            Authorization: `Bearer ${user.access}`,
        },
    };
    const response = await axios.get(
        `${API_URL}/api/v1/consultation_report/statistics/`,
        config
    );
    return response.data;
};

const dashboardService = {
    getDashboardCounts,
};

export default dashboardService;
