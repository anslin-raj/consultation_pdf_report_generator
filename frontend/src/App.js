import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";

import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import Reports from "./pages/Reports";
import Dashboard from "./pages/Dashboard";
import ReportForm from "./pages/ReportForm";
import LoginForm from "./components/auth/LoginForm";
import PrivateRoute from "./components/auth/PrivateRoute";
import NotFoundPage from "./pages/NotFoundPage";

const App = () => {
    const { user } = useSelector((state) => state.auth);

    return (
        <Router>
            <div className="App">
                <Header />
                <Routes>
                    <Route path="/" element={<LoginForm />} />
                    <Route path="/login" element={<LoginForm />} />
                    <Route path="/dashboard" element={<PrivateRoute />}>
                        <Route path="/dashboard" element={<Dashboard />} />
                    </Route>
                    <Route path="/reports" element={<PrivateRoute />}>
                        <Route path="/reports" element={<Reports />} />
                    </Route>
                    <Route path="/add_report" element={<PrivateRoute />}>
                        <Route path="/add_report" element={<ReportForm />} />
                    </Route>
                    <Route path="*" element={<NotFoundPage />} />
                </Routes>
                <Footer />
            </div>
        </Router>
    );
};

export default App;
