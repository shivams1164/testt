import {
  CategoryScale,
  Chart as ChartJS,
  Filler,
  Legend,
  LineElement,
  LinearScale,
  PointElement,
  Tooltip,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend, Filler);

function BloodPressureCard({ history }) {
  const recentHistory = history.slice(-6);

  const labels = recentHistory.map((item) => `${item.month}, ${item.year}`);
  const systolicValues = recentHistory.map((item) => item.blood_pressure?.systolic?.value || 0);
  const diastolicValues = recentHistory.map((item) => item.blood_pressure?.diastolic?.value || 0);

  const latest = recentHistory[recentHistory.length - 1]?.blood_pressure;

  const data = {
    labels,
    datasets: [
      {
        label: "Systolic",
        data: systolicValues,
        borderColor: "#d66fe1",
        backgroundColor: "rgba(214, 111, 225, 0.18)",
        pointBackgroundColor: "#d66fe1",
        pointRadius: 4,
        tension: 0.35,
      },
      {
        label: "Diastolic",
        data: diastolicValues,
        borderColor: "#7f69e1",
        backgroundColor: "rgba(127, 105, 225, 0.12)",
        pointBackgroundColor: "#7f69e1",
        pointRadius: 4,
        tension: 0.35,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      y: {
        min: 50,
        max: 180,
        ticks: {
          color: "#7f8696",
        },
        grid: {
          color: "rgba(145, 153, 171, 0.2)",
        },
      },
      x: {
        ticks: {
          color: "#7f8696",
          maxRotation: 0,
          minRotation: 0,
        },
        grid: {
          display: false,
        },
      },
    },
  };

  return (
    <section className="blood-pressure-card">
      <div className="chart-header-row">
        <h3>Blood Pressure</h3>
        <p>Last 6 months</p>
      </div>

      <div className="chart-layout">
        <div className="chart-canvas-wrap">
          <Line data={data} options={options} />
        </div>

        <aside className="chart-stats">
          <div className="chart-stat-item">
            <span className="dot systolic" />
            <p className="stat-title">Systolic</p>
            <p className="stat-value">{latest?.systolic?.value ?? "-"}</p>
            <p className="stat-note">{latest?.systolic?.levels ?? ""}</p>
          </div>

          <div className="chart-stat-item">
            <span className="dot diastolic" />
            <p className="stat-title">Diastolic</p>
            <p className="stat-value">{latest?.diastolic?.value ?? "-"}</p>
            <p className="stat-note">{latest?.diastolic?.levels ?? ""}</p>
          </div>
        </aside>
      </div>
    </section>
  );
}

export default BloodPressureCard;
