var data = {};
var historicData = [];
// Your web app's Firebase configuration - ALI
const firebaseConfig2 = {
  apiKey: "AIzaSyAD2NGFLbN8DiwjuAknJ8veLSN4LG50VjY",
  authDomain: "iot-sensors-data.firebaseapp.com",
  databaseURL: "https://iot-sensors-data.firebaseio.com",
  projectId: "iot-sensors-data",
  storageBucket: "iot-sensors-data.appspot.com",
  messagingSenderId: "469619601022",
  appId: "1:469619601022:web:d410d8a49049c46f41322f",
  measurementId: "G-55BF16R4Z9",
};
// Your web app's Firebase configuration - REACT
var firebaseConfig = {
  apiKey: "AIzaSyAzKwB5AcIED54V4toqf5Icvn6Cx5GhgIc",
  authDomain: "hkr-iot-lab1.firebaseapp.com",
  databaseURL: "https://hkr-iot-lab1.firebaseio.com",
  projectId: "hkr-iot-lab1",
  storageBucket: "hkr-iot-lab1.appspot.com",
  messagingSenderId: "689144959624",
  appId: "1:689144959624:web:9571d87e2e5cd41298853d",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

var mydb = firebase.database().ref().child("mydb");
mydb.on("child_added", function (snap) {
  data = snap.val();
  console.log("Chart", snap.val());
  displayData(snap.val());
});

function displayData(data) {
  document.getElementById("temperature").innerHTML = data.temperature;

  if (data && data.color) {
    const div = document.createElement("h5");
    div.style.backgroundColor =
      "rgb(" +
      (data.color.red % 255) +
      "," +
      (data.color.green % 255) +
      "," +
      (data.color.blue % 255) +
      ")";
    div.style.display = "table-cell";
    data.color = rgbToHex(
      data.color.red % 255,
      data.color.green % 255,
      data.color.blue % 255
    );
    div.innerText = data.color;
  }

  if (data && data.heading) {
    data.heading = data.heading.toFixed(2);
    //document.getElementById('rotation').innerHTML = data.rotation.m_11.toFixed(3);
    //data.rotation = data.rotation.m_11.toFixed(3);
  }

  historicData.push(data);
  const dataToShow = historicData.slice(-5);
  showDataInTable(dataToShow.reverse());

  console.log("Chart reversed data ", dataToShow.reverse());
  drawChart("temperature", dataToShow.reverse());

  // ['temperature', 'pressure', 'eco2', 'humidity', 'tvoc', 'heading', 'rotation', 'color'].forEach(id => showHistoricData(historicData, id))
}

function showHistoricData(hData, id) {
  var data = hData.slice(-3);
  var temp = document.getElementById(id + "-list");
  temp.innerHTML = "";
  data.forEach((da) => {
    var li = document.createElement("li");
    li.className = "list-inline-item";
    if (id === "color") li.style.backgroundColor = da[id];
    li.innerText = da[id];
    temp.appendChild(li);
  });
}

function componentToHex(c) {
  var hex = c.toString(16);
  return hex.length == 1 ? "0" + hex : hex;
}

function rgbToHex(r, g, b) {
  return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}

function showDataInTable(d) {}

function drawChart(elementId, d) {
  let labels = ["time"];

  window.d = d;
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
    high: max + 10, // creative tim: we recommend you to set the high sa the biggest value + something for a better look
    chartPadding: {
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
    },
    showArea: true,
    showLine: false,
    showPoint: false,
    fullWidth: true,
  };

  var ds = new Chartist.Line(
    "#" + elementId + "Chart",
    dataTemperatureChart,
    optionsTemperatureChart
  );
  let historySeries = [];
}
