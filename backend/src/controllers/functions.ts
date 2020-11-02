import sensor_data, {
  roundTimestamp,
  createRandomSensorData,
} from "../console/sensor_data";
import Condition from "../models/base/Condition";
import { ObjectId } from "mongodb";
import SensorData from "../models/SensorData";
import moment from "moment";

function findAverage(rows: any) {
  // Average data
  const average = {
    temperature: 0,
    co2: 0,
    humidity: 0,
    pressure: 0,
  };
  rows.forEach((row: any) => {
    average["temperature"] += row.temperature.value;
    average["co2"] += row.co2.value;
    average["humidity"] += row.humidity.value;
    average["pressure"] += row.pressure.value;
  });

  average.temperature = average.temperature / rows.length;
  average.co2 = average.co2 / rows.length;
  average.humidity = average.humidity / rows.length;
  average.pressure = average.pressure / rows.length;
  return average;
}

export async function statsForUserWithInterval(
  user_id: string,
  startTimeStamp: any,
  endTimeStamp: any
) {
  const data = createRandomSensorData();
  const timestamp = roundTimestamp(1000 * 60); // 1 min
  const condition = new Condition({
    where: {
      user_id: new ObjectId(user_id),
      timestamp: {
        $gte: parseInt(startTimeStamp),
        $lte: parseInt(endTimeStamp),
      },
    },
  });
  const model = new SensorData({ user_id, data, timestamp });
  await model.read(condition);
  console.log("RESPONSE:", model.response, condition);
  // Average data
  const average = {
    temperature: 0,
    co2: 0,
    humidity: 0,
    pressure: 0,
  };
  // Weekly, daily averages, consupmtion number of hours on per day, week, month
  const weeks: any = {};
  const days: any = {};
  if (model.response.success) {
    model.response.data.forEach((sensor_data: any) => {
      const { data, timestamp } = sensor_data;
      const weekNumber = moment(timestamp).week();
      const dayNumber = moment(timestamp).date();
      console.log(weekNumber, dayNumber);
      average["temperature"] += data.temperature.value;
      average["co2"] += data.co2.value;
      average["humidity"] += data.humidity.value;
      average["pressure"] += data.pressure.value;
      if (days[dayNumber]) {
        days[dayNumber].push(data);
      } else {
        days[dayNumber] = [data];
      }

      if (weeks[weekNumber]) {
        weeks[weekNumber].push(data);
      } else {
        weeks[weekNumber] = [data];
      }
    });
    average.temperature = average.temperature / model.response.data.length;
    average.co2 = average.co2 / model.response.data.length;
    average.humidity = average.humidity / model.response.data.length;
    average.pressure = average.pressure / model.response.data.length;

    Object.keys(weeks).forEach((weekNumber: any) => {
      const average = findAverage(weeks[weekNumber]);
      weeks[weekNumber] = { average };
    });

    Object.keys(days).forEach((dayNumber: any) => {
      const average = findAverage(days[dayNumber]);
      days[dayNumber] = { average };
    });
  }

  const stats = { average, weeks, days };
  return stats;
}

export function getInteval(duration: string) {
  let startTimeStamp, endTimeStamp;
  let from_date: any, to_date: any;
  const today = moment();

  switch (duration) {
    case "week":
      from_date = today.clone().startOf("isoWeek");
      to_date = today.clone().endOf("isoWeek");
      break;
    case "month":
      from_date = today.clone().startOf("month");
      to_date = today.clone().endOf("month");
      break;
    case "day":
      from_date = today.clone().startOf("day");
      to_date = today.clone().endOf("day");
      break;
  }

  startTimeStamp = from_date.unix() * 1000;
  endTimeStamp = to_date.unix() * 1000;

  console.log({
    startTimeStamp,
    endTimeStamp,
    start: from_date.toString(),
    end: to_date.toString(),
  });

  return { startTimeStamp, endTimeStamp };
}

getInteval("month");

// Weekly average -done
// Daily
