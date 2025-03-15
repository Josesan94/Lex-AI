
import React from "react";
import { IToolData } from "./ChatWindows";


interface WheaterDataProps {
    data: IToolData | null;
}

const WeatherInfo: React.FC<WheaterDataProps> = ({data}) => {
    return (
        <div className="p-3 bg-blue-50 text-blue-900 rounded-lg shadow">
            <h2 className="text-lg font-semibold">{data?.output} </h2>
        </div>
    );
}


export default WeatherInfo;