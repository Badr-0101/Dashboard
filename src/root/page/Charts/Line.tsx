import { ChartLineInteractive } from '@components/shared/ui/charts/LineChart';
const Line = () => {
  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white dark:bg-secondary-dark-bg rounded-3xl">
      <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white mb-8  mt-1">
        Line Chart
      </h1>
      <ChartLineInteractive />
    </div>
  );
};

export default Line;
