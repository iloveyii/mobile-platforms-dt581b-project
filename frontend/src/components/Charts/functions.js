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

function formatData(data) {
  const keys7 = data && data.days ? Object.keys(data.days).slice(0, 7) : [];
  const temperatures = [];
  const co2 = [];
  const humidity = [];
  const pressure = [];

  keys7.forEach((k) => {
    temperatures.push(data.days[k]["average"]["temperature"]);
    co2.push(data.days[k]["average"]["co2"]);
    humidity.push(data.days[k]["average"]["humidity"]);
    pressure.push(data.days[k]["average"]["pressure"]);
  });
  const series = [temperatures, co2, humidity, pressure];
  console.log("formatData : ", series, data.days, data);
  return series;
}

export function chartMultiLine(elementId, data) {
  const series = formatData(data);
  console.log("formatData : ", data);

  let labels = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  labels = labels.slice(0, series[0].length);
  var chart = new Chartist.Line(
    "#" + elementId,
    {
      labels: labels,
      series: series,
    },
    {
      low: 0,
      showArea: true,
      showPoint: false,
      fullWidth: true,
      plugins: [
        Chartist.plugins.legend({
          legendNames: ["Temperature", "CO2", "Humidity", "Pressure"],
        }),
      ],
    }
  );

  chart.on("draw", function (data) {
    if (data.type === "line" || data.type === "area") {
      data.element.animate({
        d: {
          begin: 2000 * data.index,
          dur: 2000,
          from: data.path
            .clone()
            .scale(1, 0)
            .translate(0, data.chartRect.height())
            .stringify(),
          to: data.path.clone().stringify(),
          easing: Chartist.Svg.Easing.easeOutQuint,
        },
      });
    }
  });
}

export function chartBar(elementId, data) {
  new Chartist.Bar(
    "#" + elementId,
    {
      labels: ["Quarter 1", "Quarter 2", "Quarter 3", "Quarter 4"],
      series: [
        [5, 4, 3, 7],
        [3, 2, 9, 5],
        [1, 5, 8, 4],
        [2, 3, 4, 6],
        [4, 1, 2, 1],
      ],
    },
    {
      // Default mobile configuration
      fullWidth: true,
      plugins: [
        Chartist.plugins.legend({
          legendNames: ["Temperature", "Pressure", "Humidity"],
        }),
      ],
      stackBars: true,
      axisX: {
        labelInterpolationFnc: function (value) {
          return value
            .split(/\s+/)
            .map(function (word) {
              return word[0];
            })
            .join("");
        },
      },
      axisY: {
        offset: 20,
      },
    },
    [
      // Options override for media > 400px
      [
        "screen and (min-width: 400px)",
        {
          reverseData: true,
          horizontalBars: true,
          axisX: {
            labelInterpolationFnc: Chartist.noop,
          },
          axisY: {
            offset: 60,
          },
        },
      ],
      // Options override for media > 800px
      [
        "screen and (min-width: 800px)",
        {
          stackBars: false,
          seriesBarDistance: 10,
        },
      ],
      // Options override for media > 1000px
      [
        "screen and (min-width: 1000px)",
        {
          reverseData: false,
          horizontalBars: false,
          seriesBarDistance: 15,
        },
      ],
    ]
  );
}
