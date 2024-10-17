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
import { setWeeklyBetsAmount } from "../../../../features/users/userInformationSlice";

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
  const { userInformation, weeklyBetsAmount } = useSelector(
    (state) => state?.userInformation
  );

  const BetsData = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: [
      {
        label: "Weekly Bets",
        data:
          weeklyBetsAmount === "Current Week"
            ? [
                userInformation?.currentWeekDailyTotals?.Mon?.bets,
                userInformation?.currentWeekDailyTotals?.Tue?.bets,
                userInformation?.currentWeekDailyTotals?.Wed?.bets,
                userInformation?.currentWeekDailyTotals?.Thu?.bets,
                userInformation?.currentWeekDailyTotals?.Fri?.bets,
                userInformation?.currentWeekDailyTotals?.Sat?.bets,
                userInformation?.currentWeekDailyTotals?.Sun?.bets,
              ]
            : [
                userInformation?.lastWeekDailyTotals?.Mon?.bets,
                userInformation?.lastWeekDailyTotals?.Tue?.bets,
                userInformation?.lastWeekDailyTotals?.Wed?.bets,
                userInformation?.lastWeekDailyTotals?.Thu?.bets,
                userInformation?.lastWeekDailyTotals?.Fri?.bets,
                userInformation?.lastWeekDailyTotals?.Sat?.bets,
                userInformation?.lastWeekDailyTotals?.Sun?.bets,
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
                userInformation?.currentWeekDailyTotals?.Mon?.amount,
                userInformation?.currentWeekDailyTotals?.Tue?.amount,
                userInformation?.currentWeekDailyTotals?.Wed?.amount,
                userInformation?.currentWeekDailyTotals?.Thu?.amount,
                userInformation?.currentWeekDailyTotals?.Fri?.amount,
                userInformation?.currentWeekDailyTotals?.Sat?.amount,
                userInformation?.currentWeekDailyTotals?.Sun?.amount,
              ]
            : [
                userInformation?.lastWeekDailyTotals?.Mon?.amount,
                userInformation?.lastWeekDailyTotals?.Tue?.amount,
                userInformation?.lastWeekDailyTotals?.Wed?.amount,
                userInformation?.lastWeekDailyTotals?.Thu?.amount,
                userInformation?.lastWeekDailyTotals?.Fri?.amount,
                userInformation?.lastWeekDailyTotals?.Sat?.amount,
                userInformation?.lastWeekDailyTotals?.Sun?.amount,
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
          className="bg-[#4d718768] text-white p-2 rounded-md"  
          name="week"
          value={weeklyBetsAmount}
          onChange={(e) => dispatch(setWeeklyBetsAmount(e.target.value))}
        >
          <option value="Current Week">Current Week</option>
          <option value="Last Week">Last Week</option>
        </select>
      </div>
      <div className="space-y-10 xl:w-[600px] lg:w-[430px]" style={{ margin: "0 auto" }}>
        <Bar data={BetsData} options={options} />
        <Bar data={AmountData} options={options} />
      </div>
    </div>
  );
}

export default WeeklyBetsAmount;
