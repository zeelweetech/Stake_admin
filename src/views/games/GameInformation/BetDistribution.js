import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { useSelector } from "react-redux";

ChartJS.register(ArcElement, Tooltip, Legend);

function BetDistribution() {
  const { gameInformation } = useSelector((state) => state?.crashGame);

  const data = {
    labels: ["High (> $100) Bet", "Medium ($10 - $100) Bet", "Low (< $10) Bet"],
    datasets: [
      {
        label: "# of Votes",
        data: [
          gameInformation?.betSizeDistribution?.High,
          gameInformation?.betSizeDistribution?.Medium,
          gameInformation?.betSizeDistribution?.Low,
        ],
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(75, 192, 192, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(75, 192, 192, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div>
      <div className="flex justify-center xl:w-[570px] lg:w-[370px] xl:h-[400px] lg:h-[320px]">
        <Doughnut data={data} />
      </div>
      <p className="text-m font-semibold text-[#b1bad3] flex justify-center py-5">
        Bet Distribution
      </p>
    </div>
  );
}

export default BetDistribution;
