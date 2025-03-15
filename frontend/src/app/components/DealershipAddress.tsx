// components/WeatherInfo.tsx
import React from "react";
import { IToolData } from "./ChatWindows";


interface DealershipDataProps {
    data: IToolData | null;
}

const DealershipAddress: React.FC<DealershipDataProps> = ({data}) => {
    return (
        <div className="p-3 bg-green-50 text-green-900 rounded-lg shadow">
          <p className="mt-1">
            The dealership address is: {data?.output}
          </p>
        </div>
      );
}


export default DealershipAddress;