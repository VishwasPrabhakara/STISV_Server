export const API_BASE_URL = (
  process.env.REACT_APP_API_BASE_URL || "https://stisv.onrender.com"
).replace(/\/$/, "");

export function authConfig() {
  const token = sessionStorage.getItem("token");
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
}
