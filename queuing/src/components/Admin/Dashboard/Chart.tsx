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
import { useEffect, useState } from "react";
import { Timestamp, collection, getDocs } from "firebase/firestore/lite";
import { db } from "../../../Server/firebase";
ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Filler);

interface Number {
  id: string;
  sttN: string;
  timeN: Timestamp;
}

export const Chart: React.FC = () => {
  const [number, setNumber] = useState<Number[]>([]);
  const [sttN1, setSttN1] = useState<number>(0);

  const today = new Date();
  const pastWeek = [...Array(7)]
    .map((_, i) => {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      return date.toLocaleDateString();
    })
    .reverse();

  async function getNumbers(db: any) {
    const citiesCol = collection(db, "number");
    const citySnapshot = await getDocs(citiesCol);
    const cityList = citySnapshot.docs.map((doc) => ({
      ...(doc.data() as Number),
      id: doc.id,
      timeN: Timestamp.fromDate(new Date()),
    }));
    setNumber(cityList);
    console.log(cityList);
  }

  useEffect(() => {
    async function fetchData() {
      await getNumbers(db);
    }

    fetchData();
  }, []);

  useEffect(() => {
    const filteredNumbers = number.filter((item) => {
      const itemDate = item.timeN.toDate();
      return (
        itemDate.getDate() === today.getDate() &&
        itemDate.getMonth() === today.getMonth() &&
        itemDate.getFullYear() === today.getFullYear()
      );
    });
    const sttN1Count = filteredNumbers.filter(
      (item) => item.sttN === "Đã sử dụng"
    ).length;
    setSttN1(sttN1Count);
  }, [number]);

  const data = {
    labels: pastWeek,
    datasets: [
      {
        data: [sttN1],
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
        max: 10,
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
