
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { useSelector } from "react-redux";

ChartJS.register(ArcElement, Tooltip, Legend);

function WalletStats() {
    const { dashboardData } = useSelector((state) => state?.dashBoard);

    const data = {
        labels: ["averageCurrentBalance", "maxBalance", "minBalance", "totalBalance"],
        datasets: [
            {
                label: "Wallet Stats",
                data: [
                    dashboardData?.walletStats?.averageCurrentBalance,
                    dashboardData?.walletStats?.maxBalance,
                    dashboardData?.walletStats?.minBalance,
                    dashboardData?.walletStats?.totalBalance,
                ],
                backgroundColor: [
                    "rgba(255, 99, 132, 0.2)",
                    "rgba(54, 162, 235, 0.2)",
                    "rgba(75, 192, 192, 0.2)",
                    "rgba(255, 159, 64, 0.2)",
                ],
                borderColor: [
                    "rgba(255, 99, 132, 1)",
                    "rgba(54, 162, 235, 1)",
                    "rgba(75, 192, 192, 1)",
                    "rgba(255, 159, 64, 1)",
                ],
                borderWidth: 1,
            },
        ],
    };
    // console.log("data::::::::", data);

    return (
        <div>
            <div className="flex justify-center xl:w-[480px] xl:h-[320px]">
                <Doughnut data={data} />
            </div>
            <p className="text-m font-semibold text-[#b1bad3] flex justify-center py-5">
                Wallet Stats
            </p>
        </div>
    )
}

export default WalletStats