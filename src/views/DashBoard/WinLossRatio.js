import React from "react";
import { Bar } from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";
import { useSelector } from "react-redux";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

function WinLossRatio() {

    const { dashboardData } = useSelector((state) => state?.dashBoard);


    const PlayerRatio = {
        labels: ["Total Losses", "Total Wins", "Win/Loss Ratio"],
        datasets: [
            {
                label: "Player Ratio",
                data: [
                    dashboardData?.overallWinLossRatio?.totalLosses,
                    dashboardData?.overallWinLossRatio?.totalWins,
                    dashboardData?.overallWinLossRatio?.winLossRatio,
                ],
                backgroundColor: [
                    "rgba(255, 99, 132, 0.2)",
                    "rgba(54, 162, 235, 0.2)",
                    "rgba(255, 206, 86, 0.2)",
                ],
                borderColor: [
                    "rgba(255, 99, 132, 1)",
                    "rgba(54, 162, 235, 1)",
                    "rgba(255, 206, 86, 1)",
                ],
                borderWidth: 1,
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            title: {
                display: true,
                // text: "Player Win/Loss Ratio",
                font: {
                    weight: 'bold',
                },
            },
            tooltip: {
                callbacks: {
                    label: function (tooltipItem) {
                        return tooltipItem.raw;
                    },
                },
            },
        },
        scales: {
            y: {
                beginAtZero: true,
            },
        },
    };

    return (
        <div>
            <p className="text-xl font-bold text-center py-4 text-[#b1bad3]">
                Win Loss Ratio
            </p>
            <div className="flex justify-center p-2 py-2 pt-2">
                <div className="flex justify-center">
                    <div className="w-full xl:w-[480px] bg-[#0f212e] shadow-lg shadow-[#0f212e] p-2">
                        <Bar data={PlayerRatio} options={options} />
                    </div>
                </div>
            </div>
        </div>
    );

}

export default WinLossRatio;
