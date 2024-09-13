import { useState } from "react";
import Wrapper from "../assets/wrappers/ChartsContainer";
import { useAppContext } from "../context/AppContext";
import BarChats from "./BarCharts";
import AreaCharts from "./AreaCharts";

const ChartsContainer = () => {
  const [barChart, setBarChart] = useState(true);

  const { monthlyApplications: data } = useAppContext();

  return (
    <Wrapper>
      <h4>Monthly Applications</h4>
      <button type="button" onClick={() => setBarChart(!barChart)}>
        {barChart ? "AreaChart" : "BarChart"}
      </button>
      {barChart ? <BarChats data={data} /> : <AreaCharts data={data} />}
    </Wrapper>
  );
};
export default ChartsContainer;
