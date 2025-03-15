import React from "react";
import { IToolData } from "./ChatWindows";
import { cleanAndParseData } from "../utils/parseToolData";


interface AppointmentConfirmationDataProps {
    data: IToolData | null;
}


const AppointmentConfirmation: React.FC<AppointmentConfirmationDataProps> = ({data}) => {
    if (!data) return null;

    const parsedResult = cleanAndParseData(data.output);
    const confirmationData =
    parsedResult && typeof parsedResult === "object" ? parsedResult : null;

    return (
        <div className="p-4 bg-purple-50 text-purple-900 rounded-lg shadow">
      <h2 className="text-xl font-bold mb-2">Date is confirmed!</h2>
      {confirmationData ? (
        <div className="space-y-1">
          {Object.entries(confirmationData).map(([key, value]) => (
            <div key={key} className="flex">
              <span className="font-semibold capitalize w-40">
                {key.replace(/_/g, " ")}:
              </span>
              <span>{value || "N/A"}</span>
            </div>
          ))}
        </div>
      ) : (
        <p>{data.output}</p>
      )}
    </div>
      );
}


export default AppointmentConfirmation;