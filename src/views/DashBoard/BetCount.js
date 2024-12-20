import React, { useState } from "react";
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

import { useDispatch, useSelector } from "react-redux";
// import { setWeeklyBetsAmount } from "../../../features/games/crashSlice";

ChartJS.register(
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend
);

function BetCount() {
  const dispatch = useDispatch();
  const { dashboardData } = useSelector((state) => state?.dashBoard);
  const [selectedWeek, setSelectedWeek] = useState("Current Week");

  const BetsData = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: [
      {
        label: selectedWeek,
        data:
          selectedWeek === "Last Week"
            ? [
              dashboardData?.lastWeekBetCount?.Mon,
              dashboardData?.lastWeekBetCount?.tue,
              dashboardData?.lastWeekBetCount?.wed,
              dashboardData?.lastWeekBetCount?.thu,
              dashboardData?.lastWeekBetCount?.fri,
              dashboardData?.lastWeekBetCount?.sat,
              dashboardData?.lastWeekBetCount?.sun,
            ]
            : [
              dashboardData?.currentWeekBetCount?.Mon,
              dashboardData?.currentWeekBetCount?.tue,
              dashboardData?.currentWeekBetCount?.wed,
              dashboardData?.currentWeekBetCount?.thu,
              dashboardData?.currentWeekBetCount?.fri,
              dashboardData?.currentWeekBetCount?.sat,
              dashboardData?.currentWeekBetCount?.sun,
            ],
        fill: false,
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 2,
        tension: 0.1,
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
      <div className="flex flex-row pt-5">
        <div className="flex-1 flex justify-center">
          <p className="text-m font-semibold text-[#b1bad3]">
            Bet Count
          </p>
        </div>
        <select
          className="bg-[#4d718768] mr-5 xl-text-white p-2 rounded-md "
          name="week"
          value={selectedWeek}
          onChange={(e) => setSelectedWeek(e.target.value)}
        >
          <option value="Current Week">Current Week</option>
          <option value="Last Week">Last Week</option>
        </select>
      </div>
      <div
        className="space-y-8 xl:w-[600px] lg:w-[430px] lg:h-[430px] w-[500px] p-3"
        style={{ margin: "0 auto" }}
      >
        <Line data={BetsData} options={options} />
      </div>
    </div>
  );
  
}  

export default BetCount;

