import 'chart.js/auto';
import { Bar } from 'react-chartjs-2';
import type { ChartProps } from 'react-chartjs-2';
import { Depense } from '../pages/Depenses';

interface Props {
    depenses: Depense[];
}

  const options: Omit<ChartProps<"bar", unknown, unknown>, "type">["options"] = {
    responsive: true,
    plugins: {
        legend: {
            display: false,
        },
    },
  };

const DepensesBarChart: React.FC<Props> = ({depenses}) => {
    const generateChartData = () => {
        const data: number[] = [];
        const labels: string[] = [];

        depenses.forEach((depense) => {
            data.push(depense.montant);
            labels.push(new Intl.DateTimeFormat('fr', {dateStyle: 'full'}).format(new Date(depense.date)));
        });

        return {
            labels,
            datasets: [
                {
                    label: 'Dépenses',
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

export default DepensesBarChart;