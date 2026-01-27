import { Button } from '@components/shared/ui';
import { GoDotFill } from 'react-icons/go';
import { earningData, SparklineAreaData, stackedChartData } from '@data/dummy';
import { SparkLineChart } from '@components/shared/ui/charts/SparkLineChart';
import { ChartBarStacked } from '@components/shared/ui/charts/Bar';
const Ecommerce = () => {
  return (
    <div className="mt-12">
      <div className="flex flex-wrap lg:flex-nowrap justify-center ">
        <div className="bg-white dark:text-gray-200 dark:bg-secondary-dark-bg h-44 rounded-xl w-full lg:w-80 p-8 pt-9 m-3 bg-[url(/assets/images/welcome-bg.svg)] bg-no-repeat bg-cover bg-center ">
          <div className="flex justify-between items-center">
            <div>
              <p className="font-bold text-gray-400">Earnings</p>
              <p className="text-2xl">$63,4483.78</p>
            </div>
          </div>
          <div className="mt-6">
            <Button> Button</Button>
          </div>
        </div>
        <div className="flex m-2 flex-wrap justify-center gap-1 items-center">
          {earningData.map((item) => (
            <div
              key={item.title}
              className="bg-white dark:text-gray-200 dark:bg-secondary  md:w-56 p-4 pt-9 rounded-2xl"
            >
              <button
                style={{ color: item.iconColor, backgroundColor: item.iconBg }}
                className={` rounded-full p-4 opacity-90 text-2xl hover:drop-shadow-2xl `}
              >
                {item.icon}
              </button>
              <p className="mt-3">
                <span className="text-lg font-semibold">{item.amount}</span>
                <span
                  style={{ color: item.pcColor }}
                  className={`text-sm  ml-2`}
                >
                  {item.percentage}
                </span>
              </p>
              <p className="text-sm text-gray-400 mt-1">{item.title}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="flex gap-10 flex-wrap justify-center ">
        <div className="bg-white dark:text-gray-200 dark:bg-secondary-dark-bg m-3 p-4 rounded-2xl w-full max-w-[1200px]">
          <div className="flex justify-between items-center">
            <p className="font-semibold text-xl">Revenue Updates</p>
            <div className="flex items-center gap-4">
              <p className="flex items-center gap-2 text-gray-600">
                <span>
                  <GoDotFill />
                </span>
                <span>Expense</span>
              </p>
              <p className="flex items-center gap-2 text-green-400">
                <span>
                  <GoDotFill />
                </span>
                <span>Budget</span>
              </p>
            </div>
          </div>

          {/* Flex Container for Stats and Charts */}
          <div className="mt-10 flex flex-col lg:flex-row gap-10 justify-center">
            {/* Stats Section (Budget/Expense) */}
            <div className="border-color lg:border-r-1 pr-0 lg:pr-10 w-full">
              <div>
                <p>
                  <span className="text-3xl font-semibold">$93,438</span>
                  <span className="cursor-pointer text-white bg-green-400 ml-3 rounded-full p-1.5 text-xs">
                    23%
                  </span>
                </p>
                <p className="text-gray-500 mt-1">Budget</p>
              </div>
              <div className="mt-8">
                <p className="text-3xl font-semibold">$48,438</p>
                <p className="text-gray-500 mt-1">Expense</p>
              </div>

              <div className="flex flex-col md:flex-row gap-2.5 items-center  w-full">
                <div className=" flex-1 mt-5 w-full">
                  <SparkLineChart chartData={SparklineAreaData} />
                </div>

                <div className="w-full  mt-5 flex-1">
                  <ChartBarStacked data={stackedChartData} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Ecommerce;
