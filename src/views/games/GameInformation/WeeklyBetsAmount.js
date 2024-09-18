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
import { useDispatch, useSelector } from "react-redux";
import { setWeeklyBetsAmount } from "../../../features/games/crashSlice";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function WeeklyBetsAmount() {
  const dispatch = useDispatch();
  const { gameInformation, weeklyBetsAmount } = useSelector(
    (state) => state?.crashGame
  );

  const BetsData = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: [
      {
        label: "Weekly Bets",
        data:
          weeklyBetsAmount === "Current Week"
            ? [
                gameInformation?.currentWeekDailyTotals?.Mon?.bets,
                gameInformation?.currentWeekDailyTotals?.Tue?.bets,
                gameInformation?.currentWeekDailyTotals?.Wed?.bets,
                gameInformation?.currentWeekDailyTotals?.Thu?.bets,
                gameInformation?.currentWeekDailyTotals?.Fri?.bets,
                gameInformation?.currentWeekDailyTotals?.Sat?.bets,
                gameInformation?.currentWeekDailyTotals?.Sun?.bets,
              ]
            : [
                gameInformation?.lastWeekDailyTotals?.Mon?.bets,
                gameInformation?.lastWeekDailyTotals?.Tue?.bets,
                gameInformation?.lastWeekDailyTotals?.Wed?.bets,
                gameInformation?.lastWeekDailyTotals?.Thu?.bets,
                gameInformation?.lastWeekDailyTotals?.Fri?.bets,
                gameInformation?.lastWeekDailyTotals?.Sat?.bets,
                gameInformation?.lastWeekDailyTotals?.Sun?.bets,
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

  const AmountData = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: [
      {
        label: "Weekly Amount",
        data:
          weeklyBetsAmount === "Current Week"
            ? [
                gameInformation?.currentWeekDailyTotals?.Mon?.amount,
                gameInformation?.currentWeekDailyTotals?.Tue?.amount,
                gameInformation?.currentWeekDailyTotals?.Wed?.amount,
                gameInformation?.currentWeekDailyTotals?.Thu?.amount,
                gameInformation?.currentWeekDailyTotals?.Fri?.amount,
                gameInformation?.currentWeekDailyTotals?.Sat?.amount,
                gameInformation?.currentWeekDailyTotals?.Sun?.amount,
              ]
            : [
                gameInformation?.lastWeekDailyTotals?.Mon?.amount,
                gameInformation?.lastWeekDailyTotals?.Tue?.amount,
                gameInformation?.lastWeekDailyTotals?.Wed?.amount,
                gameInformation?.lastWeekDailyTotals?.Thu?.amount,
                gameInformation?.lastWeekDailyTotals?.Fri?.amount,
                gameInformation?.lastWeekDailyTotals?.Sat?.amount,
                gameInformation?.lastWeekDailyTotals?.Sun?.amount,
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
          className="bg-[#4d718768] text-white p-2"
          name="week"
          value={weeklyBetsAmount}
          onChange={(e) => dispatch(setWeeklyBetsAmount(e.target.value))}
        >
          <option value="Current Week">Current Week</option>
          <option value="Last Week">Last Week</option>
        </select>
      </div>
      <div className="space-y-10" style={{ width: "600px", margin: "0 auto" }}>
        <Bar data={BetsData} options={options} />
        <Bar data={AmountData} options={options} />
      </div>
    </div>
  );
}

export default WeeklyBetsAmount;
