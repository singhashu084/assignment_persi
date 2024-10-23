import React from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

interface ChartProps {
  data: { name: string; price: number }[];
}

const Charts: React.FC<ChartProps> = ({ data }) => {
  const chartOptions = {
    chart: {
      type: "column",
    },
    title: {
      text: "Products in selected Category",
    },
    xAxis: {
      categories: data.map((item) => item.name),
      title: {
        text: "Products",
      },
    },
    yAxis: {
      title: {
        text: "Price (USD)",
      },
    },
    series: [
      {
        name: "Price",
        data: data.map((item) => item.price),
      },
    ],
  };
  return <HighchartsReact highcharts={Highcharts} options={chartOptions} />;
};

export default Charts;
