function getData(appId) {
  const data = fetch(appId ? `https://openexchangerates.org/api/latest.json?app_id=${appId}` : '../data/data.json')
    .then(response => response.json())
    .catch(() => {
      console.error("Fetch error");
      getData('10284746b3fa4fe4a302af5c239afb47');
    })
  return data;
}

export default getData;