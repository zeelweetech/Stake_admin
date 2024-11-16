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
            <div className=" bg-[#0f212e] shadow-lg shadow-[#0f212e] p-2 h-full xl:w-[490px] xl:h-[490] mr-[-150rem] -mt-2">
               
                <div className="flex justify-end mb-0 mt-[-0.5rem]">
                    <select
                        className="bg-[#4d718768] text-white p-2 sm:ml-6"
                        value={selectedWeek}
                        onChange={(e) => setSelectedWeek(e.target.value)}
                    >
                        <option value="Current Week">Current Week</option>
                        <option value="Last Week">Last Week</option>
                    </select>
                </div>
                <div className="flex justify-center bg-[#0f212e] p-2 mt-[-25px] xl:h-[300px]">
                    <Pie data={data} width={500} height={500} />
                </div>
                <p className="text-m font-semibold text-[#b1bad3] flex justify-center py-4">
                    FinancialTransaction
                </p>
                
            </div>
        </div>

    );
}

export default FinancialTransaction;
