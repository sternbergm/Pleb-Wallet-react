import react from "react";
import LineChart from "react-linechart";
import "../../node_modules/react-linechart/dist/styles.css";
import "./Chart.css";

const Chart = ({chartData}) => {
    if (!chartData && !chartData?.length) return null;

    const data = [
        {
            color: "steelblue",
            points: chartData,
        },
    ];

    return (
        <div className="chart-container">
            {chartData && chartData.length <= 1 ? (

                <p>Loading</p>
            ) : (
                <LineChart
                    xLabel="Time"
                    height={300}
                    width={550}
                    data={data}
                    onPointHover={(obj) => `price: $${obj.y}<br />time: ${obj.x}`}
                    ticks={4}
                    hideYLabel={true}
                    hiddeXLabel={true}
                    xDisplay={ (timestamp) => 
                        new Date (timestamp).toLocaleTimeString("en-US")
                    }
                />
            )}
        </div>
    );
};

export default Chart;