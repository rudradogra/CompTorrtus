import { useState, useEffect } from "react";

const useSizeChart = () => {
  const [showSizeChart, setShowSizeChart] = useState(false);

  const toggleSizeChart = () => setShowSizeChart((prev) => !prev);
  const openSizeChart = () => setShowSizeChart(true);
  const closeSizeChart = () => setShowSizeChart(false);

  useEffect(() => {
    const handleToggleSizeChart = () => toggleSizeChart();
    window.addEventListener("toggleSizeChart", handleToggleSizeChart);

    return () => {
      window.removeEventListener("toggleSizeChart", handleToggleSizeChart);
    };
  }, []);

  return { showSizeChart, openSizeChart, closeSizeChart };
};

export default useSizeChart;
