import { useState, useRef, useEffect } from "react";
import { IP } from "./types";
import { getIpData } from "./api/getIPData";

const ShowIPDetails = () => {
  const [data, setData] = useState<IP | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const getIPDetails = async () => {
    const query = inputRef.current?.value.trim(); // Get input value

    setLoading(true);
    setError(null);
    setData(null);

    try {
      const response = await getIpData(query);
      if (response) {
        setData(response); // Set fetched data
      } else {
        setError("Failed to fetch data.");
      }
    } catch (err) {
      if (err instanceof Error) {
        setError("Error fetching data: " + err.message);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getIPDetails();
  }, []);

  const { city, country, query: ip, timezone, as, regionName } = data || {};

  return (
    <div>
      <div>
        <input
          type="text"
          placeholder="Search IP or domain"
          ref={inputRef}
          style={{ padding: "8px", marginRight: "8px" }}
        />
        <button
          onClick={getIPDetails}
          style={{
            padding: "8px 16px",
            backgroundColor: "blue",
            color: "white",
            border: "none",
            cursor: "pointer",
          }}
        >
          Search
        </button>
      </div>

      {loading && <div>Loading....</div>}
      {error && <div style={{ color: "red" }}>Error: {error}</div>}

      {data && (
        <div>
          <h2>IP Details:</h2>
          <p>
            <strong>City:</strong> {city}
          </p>
          <p>
            <strong>Country:</strong> {country}
          </p>
          <p>
            <strong>IP:</strong> {ip}
          </p>
          <p>
            <strong>Timezone:</strong> {timezone}
          </p>
          <p>
            <strong>AS:</strong> {as}
          </p>
          <p>
            <strong>Region:</strong> {regionName}
          </p>
        </div>
      )}
    </div>
  );
};

export default ShowIPDetails;
