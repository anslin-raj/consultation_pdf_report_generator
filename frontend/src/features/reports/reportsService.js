import axios from "axios";

import { API_URL } from "../../apiConfig";

const getReports = async () => {
    const user = JSON.parse(localStorage.getItem("user"));
    const config = {
        headers: {
            Authorization: `Bearer ${user.access}`,
        },
    };
    const response = await axios.get(
        `${API_URL}/api/v1/consultation_report/reports/`,
        config
    );
    return response.data;
};

const getReportPDF = async (report_id) => {
    const user = JSON.parse(localStorage.getItem("user"));
    const config = {
        headers: {
            Authorization: `Bearer ${user.access}`,
        },
    };
    const response = await axios.get(
        `${API_URL}/api/v1/consultation_report/generate/pdf/${report_id}/`,
        config
    );

    const file = new Blob([response.data], { type: "application/pdf" });
    const contentLength = file.size;

    let link_obj = document.createElement("a");
    link_obj.style = "display: none";
    document.body.appendChild(link_obj);
    let url = window.URL.createObjectURL(file);
    link_obj.href = url;
    link_obj.download = "report.pdf";
    link_obj.click();
    window.URL.revokeObjectURL(url);
    return contentLength;
};

const createReport = async (report) => {
    const user = JSON.parse(localStorage.getItem("user"));
    const config = {
        headers: {
            Authorization: `Bearer ${user.access}`,
            "Content-Type": "multipart/form-data",
        },
    };
    const response = await axios.post(
        `${API_URL}/api/v1/consultation_report/reports/`,
        report,
        config
    );
    return response.data;
};

const deleteReport = async (report_id) => {
    const user = JSON.parse(localStorage.getItem("user"));
    const config = {
        headers: {
            Authorization: `Bearer ${user.access}`,
        },
    };
    const response = await axios.post(
        `${API_URL}/api/v1/consultation_report/reports/`,
        config
    );
    return response.data;
};

const reportsService = {
    getReports,
    createReport,
    deleteReport,
    getReportPDF,
};

export default reportsService;
