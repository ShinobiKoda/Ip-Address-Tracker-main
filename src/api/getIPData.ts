export const getIpData = async (query?: string): Promise<any> => {
  try {
    const response = await fetch(`https://ipwhois.app/json/${query || ""}`);
    if (!response.ok) {
      throw new Error("Failed to fetch Data");
    }
    const data = await response.json();
    return data;
  } catch (err) {
    if (err instanceof Error) {
      console.log(err);
    }
    return null;
  }
};
