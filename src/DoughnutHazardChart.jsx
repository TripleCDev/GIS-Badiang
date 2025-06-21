import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const DoughnutHazardChart = () => {
  const data = {
    labels: ['Low Risk', 'Medium Risk', 'High Risk'],
    datasets: [
      {
        label: 'Families at Risk',
        data: [0, 0, 25], // Total across all puroks
        backgroundColor: ['#A0AEC0', '#F6AD55', '#F56565'],
        borderColor: ['#EDF2F7', '#FBD38D', '#FEB2B2'],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="w-full max-w-sm mx-auto bg-white p-6 rounded-xl shadow">
      <h3 className="text-xl font-bold text-center mb-4">Families at Risk (Typhoon/Flood)</h3>
      <Doughnut data={data} />
    </div>
  );
};

export default DoughnutHazardChart;
