import { stackedChartData } from '@data/dummy';
import { ChartBarStacked } from '@components/shared/ui/charts/Bar';
const Bar = () => {
  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white dark:bg-secondary-dark-bg rounded-3xl">
      <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white mb-8  mt-1">
        Bar Chart
      </h1>
      <ChartBarStacked data={stackedChartData} />
    </div>
  );
};

export default Bar;
