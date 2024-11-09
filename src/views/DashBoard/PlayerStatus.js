import { BarElement, CategoryScale, Chart as ChartJs, Legend, LinearScale, scales, Title, Tooltip } from "chart.js"
import { useDispatch, useSelector } from "react-redux";
import { setDashBoardData, setPullPlayerStats } from "../../features/DashBoard/DashBoardSlice";
import { Bar } from "react-chartjs-2";

ChartJs.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

function PullPlayerStatus() {
    const dispatch = useDispatch();
    const { dashboardData, pullPlayerStats } = useSelector((state) => state?.dashBoard);

    // console.log("Pull player status::::::::", pullPlayerStats);

    const PullData = {
        labels: ["Bet", "Losers", "Players", "WinAmount", "Winners"],
        datasets: [
            {
                labels: "Player Daily Stats",
                data:
                    pullPlayerStats === "Daily Stats"
                        ? [
                            dashboardData?.pullPlayerDailyStats?.[0]?.totalAmountBet,
                            dashboardData?.pullPlayerDailyStats?.[0]?.totalLosers,
                            dashboardData?.pullPlayerWeeklyStats?.[0]?.totalPlayers,
                            dashboardData?.pullPlayerWeeklyStats?.[0]?.totalWinAmount,
                            dashboardData?.pullPlayerWeeklyStats?.[0]?.totalWinners,
                        ] : [
                            dashboardData?.pullPlayerWeeklyStats?.[0]?.totalAmountBet,
                            dashboardData?.pullPlayerWeeklyStats?.[0]?.totalLosers,
                            dashboardData?.pullPlayerWeeklyStats?.[0]?.totalPlayers,
                            dashboardData?.pullPlayerWeeklyStats?.[0]?.totalWinAmount,
                            dashboardData?.pullPlayerWeeklyStats?.[0]?.totalWinners,

                        ],
                backgroundColor: [
                    "rgba(255, 99, 132, 0.2)",
                    "rgba(54, 162, 235, 0.2)",
                    "rgba(255, 206, 86, 0.2)",
                    "rgba(75, 192, 192, 0.2)",
                    "rgba(153, 102, 255, 0.2)",
                    "rgba(255, 159, 64, 0.2)",
                ],
                borderColor: [
                    "rgba(255, 99, 132, 1)",
                    "rgba(54, 162, 235, 1)",
                    "rgba(255, 206, 86, 1)",
                    "rgba(75, 192, 192, 1)",
                    "rgba(153, 102, 255, 1)",
                    "rgba(255, 159, 64, 1)",
                ],
                borderWidth: 1,

            },
        ],


    };
    // console.log("PullData:::::::::", PullData);

    const options = {
        scales: {
            y: {
                beginAtZero: true,
            },
        },
    };

    return (
        <div>
            <div className="flex justify-end">
                <select
                    className="bg-[#4d718768] text-white p-2 rounded-md"
                    name="player"
                    value={pullPlayerStats}
                    onChange={(e) => dispatch(setPullPlayerStats(e.target.value))}>

                    <option value="Daily Stats">Daily Stats</option>
                    <option value="Weekly Stats">Weekly Stats</option>
                </select>
            </div>
            <div className="space-y-10 xl:w-[600px] lg:w-[430px]" style={{ margin: "0 auto" }}>
                <Bar data={PullData} options={options} />
            </div>
        </div>
    );
}
export default PullPlayerStatus