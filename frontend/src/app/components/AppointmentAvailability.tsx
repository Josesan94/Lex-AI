// components/WeatherInfo.tsx
import React from "react";
import { IToolData } from "./ChatWindows";
import { cleanAndParseData } from "../utils/parseToolData";


interface AppointmentAvailabilityDataProps {
    data: IToolData | null;
}



const AppointmentAvailability: React.FC<AppointmentAvailabilityDataProps> = ({data}) => {
    console.log('DATA', data);
    if (!data) return null;

  const parsedResult = cleanAndParseData(data.output);

  const availability = Array.isArray(parsedResult) ? parsedResult : null;
    return (
    <div className="p-3 bg-green-50 text-green-900 rounded-lg shadow">
      <h2 className="text-lg font-semibold">Available times</h2>
      {availability ? (
        <ul className="mt-2 list-disc list-inside">
          {availability?.map((time) => (
            <li key={time}>{time}</li>
          ))}
        </ul>
      ) : (
        <p>{data.output}</p>
      )}
    </div>
      );
}


export default AppointmentAvailability;