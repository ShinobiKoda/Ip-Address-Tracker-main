import { useState, useRef, useEffect } from "react";
import { IP } from "./types";
import { getIpData } from "./api/getIPData";
import HeaderImage from "./components/HeaderImage";
import GetMap from "./api/getMap";

const ShowIPDetails = () => {
  const [data, setData] = useState<IP | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null); // Input reference

  const getIPDetails = async (query?: string) => {
    setLoading(true);
    setData(null);

    try {
      const response = await getIpData(query?.trim() || ""); // Default to current location if no query
      if (response) {
        console.log(response);
        setData(response); // Set fetched data
      }
    } catch (err) {
      if (err instanceof Error) {
        console.log("Error fetching data");
      }
    } finally {
      setLoading(false);
    }
  };

  // Fetch current location details on page load
  useEffect(() => {
    getIPDetails();
  }, []);

  const handleSearch = () => {
    const query = inputRef.current?.value; // Get input value
    if (!query || !query.trim()) {
      return;
    }
    getIPDetails(query); // Call API with input value
  };

  const { regionName, query: ip, timezone, isp, lat, lon } = data || {};

  return (
    <div className="flex flex-col min-h-screen">
      {/* Pass inputRef and handleSearch to HeaderImage */}
      <HeaderImage inputRef={inputRef} handleSearch={handleSearch} />
      <div className="w-full px-5 relative z-20 top-[-4rem] max-w-[1440px] mx-auto">
        <div className="w-full bg-white rounded-xl py-6 flex flex-col gap-4 items-center text-center justify-center mobile-details">
          <div className="flex flex-col gap-1">
            <h3 className="font-bold text-[#c2c2c2] text-sm -tracking-[-0.2rem]">
              IP ADDRESS
            </h3>
            <p className="font-bold text-lg">{loading ? "-----" : ip}</p>
          </div>
          <div className="flex flex-col gap-1">
            <h3 className="font-bold text-[#c2c2c2] -tracking-[-0.2rem]">
              LOCATION
            </h3>
            <p className="font-bold text-lg">
              {loading ? "-----" : regionName}
            </p>
          </div>
          <div className="flex flex-col gap-1">
            <h3 className="font-bold text-[#c2c2c2] -tracking-[-0.2rem]">
              TIMEZONE
            </h3>
            <p className="font-bold text-lg">{loading ? "-----" : timezone}</p>
          </div>
          <div className="flex flex-col gap-1">
            <h3 className="font-bold text-[#c2c2c2] -tracking-[-0.2rem]">
              ISP
            </h3>
            <p className="font-bold text-lg">{loading ? "-----" : isp}</p>
          </div>
        </div>
        <div className="w-full bg-white rounded-xl desktop-details py-16 px-6 items-center justify-between text-center gap-4">
          <div className="flex flex-col gap-1 flex-1">
            <h3 className="font-bold text-[#c2c2c2] text-sm -tracking-[-0.2rem]">
              IP ADDRESS
            </h3>
            <p className="font-bold text-2xl">{loading ? "-----" : ip}</p>
          </div>
          <div className="self-stretch w-[2px] bg-black"></div>
          <div className="flex flex-col gap-1 flex-1">
            <h3 className="font-bold text-[#c2c2c2] text-sm -tracking-[-0.2rem]">
              LOCATION
            </h3>
            <p className="font-bold text-2xl">
              {loading ? "-----" : regionName}
            </p>
          </div>
          <div className="self-stretch w-[2px] bg-black"></div>
          <div className="flex flex-col gap-1 flex-1">
            <h3 className="font-bold text-[#c2c2c2] text-sm -tracking-[-0.2rem]">
              TIMEZONE
            </h3>
            <p className="font-bold text-2xl">{loading ? "-----" : timezone}</p>
          </div>
          <div className="self-stretch w-[2px] bg-black"></div>
          <div className="flex flex-col gap-1 flex-1">
            <h3 className="font-bold text-[#c2c2c2] text-sm -tracking-[-0.2rem]">
              ISP
            </h3>
            <p className="font-bold text-2xl">{loading ? "-----" : isp}</p>
          </div>
        </div>
      </div>

      {/* Map Component */}
      {lat && lon && (
        <div className="w-full relative z-10 map-container">
          <GetMap latitude={lat} longitude={lon} />
        </div>
      )}
    </div>
  );
};

export default ShowIPDetails;
