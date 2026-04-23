const API_URL = "https://fedskillstest.coalitiontechnologies.workers.dev";

const API_USERNAME = process.env.REACT_APP_API_USERNAME || "coalition";
const API_PASSWORD = process.env.REACT_APP_API_PASSWORD || "skills-test";

export async function fetchPatients(signal) {
  const credentials = window.btoa(`${API_USERNAME}:${API_PASSWORD}`);

  const response = await fetch(API_URL, {
    method: "GET",
    headers: {
      Authorization: `Basic ${credentials}`,
    },
    signal,
  });

  if (!response.ok) {
    throw new Error(`Unable to fetch patients (${response.status})`);
  }

  return response.json();
}
