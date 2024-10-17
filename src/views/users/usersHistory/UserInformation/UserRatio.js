import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { useSelector } from "react-redux";  

ChartJS.register(ArcElement, Tooltip, Legend);

function UserRatio() {
  const { userInformation } = useSelector((state) => state?.userInformation);

  const data = {
    labels: ["Win Ratio", "Loss Ratio"],
    datasets: [
      {
        label: "Colors Distribution",
        data: [userInformation?.winRatio, userInformation?.lossRatio],
        backgroundColor: [
          "rgba(255, 206, 86, 0.2)",
          "rgba(153, 102, 255, 0.2)",
        ],
        borderColor: ["rgba(255, 206, 86, 1)", "rgba(153, 102, 255, 1)"],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div>
      <div className="flex justify-center m-auto w-[500px] h-[300px]">
        <Pie data={data} />
      </div>
      <p className="text-m font-semibold text-[#b1bad3] flex justify-center py-5">
        User Win And Loss Ratio
      </p>
    </div>
  );
}

export default UserRatio;
