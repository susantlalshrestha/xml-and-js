const apiKey = `JC9pjP1z8rqmKYTJNd4lA`;
const baseUrl = `https://www.carboninterface.com/api/v1`;

let vehicleMakes = [];
let vehicleModels = {};
let fuelSources = [];

const getFuelSources = async () => {
  const result = await fetch(`${baseUrl}/fuel_sources`, {
    method: "GET",
    headers: { Authorization: `Bearer ${apiKey}` },
  });
  const data = await result.json();
  return data.map(({ data }) => data);
};

const getVehicleMakes = async () => {
  const result = await fetch(`${baseUrl}/vehicle_makes`, {
    method: "GET",
    headers: { Authorization: `Bearer ${apiKey}` },
  });
  const data = await result.json();
  return data.map(({ data }) => data);
};

const getVehicleModels = async (vehicleMakeID) => {
  if (!vehicleMakeID) return [];
  const result = await fetch(
    `${baseUrl}/vehicle_makes/${vehicleMakeID}/vehicle_models`,
    {
      method: "GET",
      headers: { Authorization: `Bearer ${apiKey}` },
    }
  );
  const data = await result.json();
  return data.map(({ data }) => data);
};

const createEstimate = async (payload) => {
  const result = await fetch(`${baseUrl}/estimates`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });
  const response = await result.json();
  if (!response.data) throw new Error(response.message);
  return response.data;
};

const loadVehicleMakes = async () => {
  if (vehicleMakes.length === 0) vehicleMakes = await getVehicleMakes();
  return vehicleMakes;
};

const loadVehicleModels = async (vehicleMakeID) => {
  if (!vehicleMakeID) return [];
  if (!vehicleModels[vehicleMakeID])
    vehicleModels[vehicleMakeID] = await getVehicleModels(vehicleMakeID);
  return vehicleModels[vehicleMakeID];
};

const loadFuelSources = async () => {
  if (fuelSources.length === 0) fuelSources = await getFuelSources();
  return fuelSources;
};

const onSubmitShowForm = (event) => {
  event.preventDefault();
  showEstimateForm(event.target.value);
};

const onSubmitElectricityEstimate = (event) => {
  showSuccessResult();
  event.preventDefault();
  const payload = { type: "electricity" };
  payload.country = event.target.country.value;
  payload.state = event.target.state.value;
  payload.electricity_unit = event.target.electricity_unit.value;
  payload.electricity_value = parseFloat(event.target.electricity_value.value);
  createEstimate(payload)
    .then(showSuccessResult)
    .catch(showFailedResult)
    .finally(() => {
      event.target.country.value = "";
      event.target.state.value = "";
      event.target.electricity_unit.value = "";
      event.target.electricity_value.value = "";
    });
};

const onSubmitFlightEstimate = (event) => {
  event.preventDefault();
  const payload = { type: "flight" };
  payload.passengers = parseInt(event.target.passengers.value);
  payload.distance_unit = event.target.distance_unit.value;
  payload.legs = [
    {
      departure_airport: event.target.departure_airport.value,
      destination_airport: event.target.destination_airport.value,
      cabin_class: event.target.cabin_class.value,
    },
  ];
  createEstimate(payload)
    .then(showSuccessResult)
    .catch(showFailedResult)
    .finally(() => {
      event.target.passengers.value = "";
      event.target.departure_airport.value = "";
      event.target.destination_airport.value = "";
    });
};

const onSubmitShippingEstimate = (event) => {
  event.preventDefault();
  const payload = { type: "shipping" };
  payload.weight_value = parseInt(event.target.weight_value.value);
  payload.weight_unit = event.target.weight_unit.value;
  payload.distance_value = parseInt(event.target.distance_value.value);
  payload.distance_unit = event.target.distance_unit.value;
  payload.transport_method = event.target.transport_method.value;
  createEstimate(payload)
    .then(showSuccessResult)
    .catch(showFailedResult)
    .finally(() => {
      event.target.weight_value.value = "";
      event.target.distance_value.value = "";
    });
};

const onSubmitVehicleEstimate = (event) => {
  event.preventDefault();
  const payload = { type: "vehicle" };
  payload.distance_value = parseInt(event.target.distance_value.value);
  payload.distance_unit = event.target.distance_unit.value;
  payload.vehicle_model_id = event.target.vehicle_model_id.value;
  createEstimate(payload)
    .then(showSuccessResult)
    .catch(showFailedResult)
    .finally(() => {
      event.target.distance_unit.value = "";
      event.target.distance_value.value = "";
    });
};

const onSubmitFuelEstimate = (event) => {
  event.preventDefault();
  const payload = { type: "fuel_combustion" };
  const fuelSource = fuelSources.find(
    ({ id }) => event.target.fuel_source_type.value === id
  );
  if (!fuelSource) showFailedResult();
  payload.fuel_source_type = fuelSource.attributes.api_name;
  payload.fuel_source_unit = fuelSource.attributes.unit;
  payload.fuel_source_value = parseInt(event.target.fuel_source_value.value);
  createEstimate(payload)
    .then(showSuccessResult)
    .catch(showFailedResult)
    .finally(() => {
      event.target.fuel_source_value.value = "";
    });
};

const onChangeVehicleMake = (event) => {
  event.preventDefault();
  renderVehicleModels(event.target.value);
};

const showEstimateForm = (selected) => {
  hideAllMainContents();
  document.getElementById(`${selected}EstimateForm`).style = "display:flex;";
  if (selected === "vehicle") renderVehicleMakes();
  if (selected === "fuel") renderFuelSources();
};

const showSuccessResult = (result) => {
  hideAllMainContents();
  console.log(result);
  if (result && result.attributes) {
    let html = `<p>id: ${result.id}</p>`;
    Object.getOwnPropertyNames(result.attributes).map((attr) => {
      html += `<p>${attr}: ${result.attributes[attr]}</p>`;
    });
    document.getElementById(`success-response`).innerHTML = html;
    console.log(html);
  }
  document.getElementById(`success`).style = "display:flex";
};

const showFailedResult = (err) => {
  hideAllMainContents();
  document.getElementById(`failed-response`).innerHTML = err?.message || "";
  document.getElementById(`failed`).style = "display:flex";
};

const hideAllMainContents = () => {
  document
    .querySelector("main")
    .childNodes.forEach((e) => (e.style = "display:none;"));
};

const renderVehicleMakes = () => {
  loadVehicleMakes()
    .then((vehicleMakes) => {
      let html = "";
      vehicleMakes.forEach((vehicleMake) => {
        html += `<option value="${vehicleMake.id}">${vehicleMake.attributes.name}</option>`;
      });
      document.getElementById("vehicle-make").innerHTML = html;
      return vehicleMakes;
    })
    .then(() => renderVehicleModels(vehicleMakes[0].id));
};

const renderVehicleModels = (vehicleMakeID) => {
  document.getElementById("vehicle-model").innerHTML = "";
  loadVehicleModels(vehicleMakeID).then((vehicleModels) => {
    let html = "";
    vehicleModels.forEach((model) => {
      html += `<option value="${model.id}">${model.attributes.name}</option>`;
    });
    document.getElementById("vehicle-model").innerHTML = html;
  });
};

const renderFuelSources = () => {
  loadFuelSources()
    .then((sources) => {
      let html = "";
      sources.forEach((source) => {
        html += `<option value="${source.id}">${source.attributes.name}</option>`;
      });
      document.getElementById("fuel-source-type").innerHTML = html;
      return vehicleMakes;
    })
    .then(() => renderVehicleModels(vehicleMakes[0].id));
};

showEstimateForm("electricity");
loadVehicleMakes();
loadFuelSources();
