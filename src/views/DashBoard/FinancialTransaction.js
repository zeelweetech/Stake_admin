import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, ArcElement, Title, Tooltip, Legend } from "chart.js";
import { useSelector } from "react-redux";
import React, { useState } from "react";

ChartJS.register(CategoryScale, LinearScale, ArcElement, Title, Tooltip, Legend);

function FinancialTransaction() {
    const { dashboardData } = useSelector((state) => state.dashBoard);
    const [selectedWeek, setSelectedWeek] = useState("Current Week");

    const data = {
        labels: ["Credited", "Debited"],
        datasets: [
            {
                label: selectedWeek,
                data: selectedWeek === "Current Week" ? [
                    dashboardData?.currentWeekFinancialTranasactionData?.creditedData || "0",
                    dashboardData?.currentWeekFinancialTranasactionData?.debitedData || "0",
                ] : [
                    dashboardData?.lastWeekFinancialTransactionData?.creditedData || "0",
                    dashboardData?.lastWeekFinancialTransactionData?.debitedData || "0",
                ],
                backgroundColor: [
                    "rgba(54, 162, 235, 0.6)",
                    "rgba(255, 99, 132, 0.6)"
                ],
                borderColor: [
                    "rgba(54, 162, 235, 1)",
                    "rgba(255, 99, 132, 1)"
                ],
                borderWidth: 1,
            }
        ],
    };

    return (
        <div>
            {/* Dropdown Section */}
            <div className="flex justify-end py-2">
                <select
                    className="bg-[#4d718768] text-white p-2 rounded-md"
                    value={selectedWeek}
                    onChange={(e) => setSelectedWeek(e.target.value)}
                >
                    <option value="Current Week">Current Week</option>
                    <option value="Last Week">Last Week</option>
                </select>
            </div>

            {/* Chart Section */}
            <div className="flex flex-col items-center space-y-4 xl:w-[350px] mx-auto">
                {/* Chart */}
                <div className="w-full px-6">
                    <Pie data={data} />
                </div>
                {/* Chart Label */}
                <p className="text-base font-semibold text-[#b1bad3] text-center">
                    Financial Transaction
                </p>
            </div>
        </div>


    );
}

export default FinancialTransaction;
