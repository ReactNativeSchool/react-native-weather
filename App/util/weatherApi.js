const apiKey = "1648e403f1e44103b747e25c55f8c2fb";

export const weatherApi = (path, args = {}) => {
  const { zipcode, coords, id } = args;

  let suffix = "";
  if (zipcode) {
    suffix = `zip=${zipcode}`;
  } else if (coords) {
    suffix = `lat=${coords.latitude}&lon=${coords.longitude}`;
  } else if (id) {
    suffix = `id=${id}`;
  }

  return fetch(
    `https://api.openweathermap.org/data/2.5${path}?appid=${apiKey}&units=imperial&${suffix}`
  ).then(res => res.json());
};
