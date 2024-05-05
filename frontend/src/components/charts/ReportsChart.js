import * as React from "react";
import { LineChart } from "@mui/x-charts/LineChart";

const ReportsChart = ({ reportCounts }) => {
    if (!reportCounts) {
        return <div>Loading data...</div>;
    }
    const reversedReportCounts = [...reportCounts].reverse();
    const dates = reversedReportCounts.map((item) => item.date);
    const counts = reversedReportCounts.map((item) => item.count);
    return (
        <LineChart
            xAxis={[{ data: dates, label: "Date", scaleType: "point" }]}
            yAxis={[
                {
                    data: [...counts].sort().reverse(),
                    label: "Report count",
                    scaleType: "point",
                },
            ]}
            series={[
                {
                    data: counts,
                    // area: true,
                    color: "#1976D2",
                },
            ]}
            height={300}
        />
    );
};

export default ReportsChart;
