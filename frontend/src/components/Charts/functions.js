export function drawChart(elementId, d, label) {
  let labels = [];

  let max = 0;
  var series0 = [];
  d.forEach((data) => {
    max = max > data[elementId] ? max : data[elementId];
    series0.push(data[elementId]);
    labels.push(data[elementId]);
  });
  var series = [series0];
  const dataTemperatureChart = {
    labels: labels,
    series: series,
  };

  const optionsTemperatureChart = {
    lineSmooth: Chartist.Interpolation.cardinal({
      tension: 0,
    }),
    low: 0,
    high: max + 10, // we recommend you to set the high sa the biggest value + something for a better look
    chartPadding: {
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
    },
    showArea: false, // Shows a light shade area below line
    showLine: true, // Shows a prominant line
    showPoint: true, // Marks edges as points
    fullWidth: true,
  };

  var ds = new Chartist.Line(
    "#" + elementId + "Chart",
    dataTemperatureChart,
    optionsTemperatureChart
  );
  let historySeries = [];
}

export const data = [
  {
    color: "#f6cdc7",
    eco2: 1497,
    heading: "80.00",
    humidity: 37,
    pressure: 1362,
    temperature: 1200,
  },
  {
    color: "#aab0d0",
    eco2: 708,
    heading: "91.00",
    humidity: 34,
    pressure: 665,
    temperature: 450,
  },
  {
    color: "#fb4710",
    eco2: 681,
    heading: "8.00",
    humidity: 24,
    pressure: 999,
    temperature: 2400,
  },
  {
    color: "#435ffc",
    eco2: 452,
    heading: "210.00",
    humidity: 34,
    pressure: 1297,
    temperature: 750,
  },
  {
    color: "#6217a9",
    eco2: 1011,
    heading: "348.00",
    humidity: 29,
    pressure: 637,
    temperature: 1100,
  },
];
