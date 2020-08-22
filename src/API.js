function getData(appId) {
  const data = fetch(appId ? `https://openexchangerates.org/api/latest.json?app_id=${appId}` : '/data/data.json')
    .then(response => response.json())
    .catch(() => console.error("Fetch error"));
  return data;
}

export default getData;