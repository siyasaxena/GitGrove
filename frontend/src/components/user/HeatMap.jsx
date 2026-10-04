import { useEffect, useState } from "react";
import HeatMap from "@uiw/react-heat-map";

// function to generate random activity
const generateActivityData = (startDate, endDate) => {
  const data = [];
  let currentDate = new Date(startDate);
  const end = new Date(endDate);

  while (currentDate <= end) {
    // Generate random activity for each day
    const count = Math.floor(Math.random() * 50);
    data.push({
      date: currentDate.toISOString().split("T")[0], // Format date as YYYY-MM-DD
      value: count,
    });
    currentDate.setDate(currentDate.getDate() + 1);
  }
  return data;
};
const getPanelColors = (maxCount) => {
  const colors = {};
  for (let i = 0; i <= maxCount; i++) {
    const greenValue = Math.floor((i / maxCount) * 255);
    colors[i] = `rgb(0, ${greenValue}, 0)`;
  }
  return colors;
};

const HeatMapProfile = () => {
  const [activityData, setActivityData] = useState([]);
  const [panelColors, setPanelColors] = useState({});
  useEffect(() => {
    const fetchData = async () => {
      const startDate = "2001-01-01";
      const endDate = "2023-01-31";
      const data = generateActivityData(startDate, endDate);
      setActivityData(data);
      const maxCount = Math.max(...data.map((d) => d.value));
      setPanelColors(getPanelColors(maxCount));
    };

    fetchData();
  }, []);

  return (
    <div style={{ width: "100%", height: "100%" }}>
      <h4>Recent Contributions</h4>
      <HeatMap
        className="HeatMapProfile"
        style={{ maxWidth: "700px", height: "200px", color: "white" }}
        value={activityData}
        weekLabels={["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]}
        startDate={new Date("2001-01-01")}
        rectSize={15}
        space={3}
        panelColors={panelColors}
      />
    </div>
  );
};

export default HeatMapProfile;
