import { IP } from "../types";

export const getIpData = async (query?: string | undefined): Promise<IP> => {
  let data;
  try {
    const response = await fetch(`http://ip-api.com/json/${query || ""}`);
    if (!response.ok) {
      throw new Error("Failed to fetch Data");
    }
    data = await response.json();
  } catch (err) {
    if (err instanceof Error) {
      console.log(err);
    }
  }
  return data;
};
