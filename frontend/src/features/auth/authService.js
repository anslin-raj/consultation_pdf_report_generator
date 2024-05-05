import axios from "axios";

import { API_URL } from "../../apiConfig";

const register = async (userData) => {
    const response = await axios.post(
        `${API_URL}/api/v1/user/register/`,
        userData
    );

    if (response.data) {
        localStorage.setItem("user", JSON.stringify(response.data));
    }

    return response.data;
};

const login = async (userData) => {
    const response = await axios.post(
        `${API_URL}/api/v1/user/token/`,
        userData
    );

    if (response.data.access) {
        localStorage.setItem("user", JSON.stringify(response.data));
    }

    return response.data;
};

const getUserProfile = async () => {
    const user = JSON.parse(localStorage.getItem("user"));
    const config = {
        headers: {
            Authorization: `Bearer ${user.access}`,
        },
    };
    const response = await axios.get(`${API_URL}/api/v1/user/`, config);
    return response.data;
};

const logout = () => {
    localStorage.removeItem("user");
};

const authService = {
    register,
    login,
    logout,
    getUserProfile,
};

export default authService;
