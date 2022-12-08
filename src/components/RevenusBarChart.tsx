import 'chart.js/auto';
import { Bar } from 'react-chartjs-2';
import type { ChartProps } from 'react-chartjs-2';
import { Revenu } from '../pages/Revenus';

interface Props {
    revenus: Revenu[];
}

  const options: Omit<ChartProps<"bar", unknown, unknown>, "type">["options"] = {
    responsive: true,
    plugins: {
        legend: {
            display: false,
        },
    },
  };

const RevenusBarChart: React.FC<Props> = ({revenus}) => {
    const generateChartData = () => {
        const data: number[] = [];
        const labels: string[] = [];

        revenus.forEach((revenu) => {
            data.push(revenu.montant);
            labels.push(revenu.date);
        });

        return {
            labels,
            datasets: [
                {
                    label: 'Revenus',
                    data,
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(153, 102, 255, 0.2)',
                        'rgba(255, 159, 64, 0.2)',
                    ],
                    borderColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgba(255, 159, 64, 1)',
                    ],
                    borderWidth: 1,
                },
            ],
        };
    };

    return <Bar data={generateChartData()} options={options} />;
};

export default RevenusBarChart;