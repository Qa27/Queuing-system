import "./Chart.css";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Filler,
} from "chart.js";
ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Filler);

export const Chart: React.FC = () => {
  const data = {
    labels: ["1", "2", "3", "4", "5", "6", "7"],
    datasets: [
      {
        data: [3900, 5200, 1850, 2648, 5421, 687, 5555],
        backgroundColor: "#CEDDFF",
        borderColor: "#5185F7",
        tension: 0.5,
        fill: true,
      },
    ],
  };
  const options: any = {
    plugins: {
      legend: false,
    },
    scales: {
      x: {
        grid: { display: false },
      },
      y: {
        min: 0,
        max: 6000,
        grid: {
          borderDash: [10],
        },
      },
    },
  };

  return (
    <div className="chart">
      <Line data={data} options={options}></Line>
    </div>
  );
};

