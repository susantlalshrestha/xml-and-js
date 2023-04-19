const apiKey = `JC9pjP1z8rqmKYTJNd4lA`;
const baseUrl = `https://www.carboninterface.com/api/v1`;

let estimates = [];

const getAllEstimates = async () => {
  const result = await fetch(`${baseUrl}/estimates`, {
    method: "GET",
    headers: { Authorization: `Bearer ${apiKey}` },
  });
  const data = await result.json();
  return data
    .map(({ data }) => data)
    .map((data) => {
      let emittedFrom = "";
      if (data.attributes.electricity_unit) emittedFrom = "Electricity";
      else if (data.attributes.legs) emittedFrom = "Flight";
      else if (data.attributes.transport_method) emittedFrom = "Shipping";
      else if (data.attributes.vehicle_model_id) emittedFrom = "Vehicle";
      else if (data.attributes.fuel_source_type) emittedFrom = "Fuel";
      else emittedFrom = "Others";
      return { ...data, emittedFrom };
    });
};

const loadEstimates = async (filters) => {
  if (estimates.length === 0) estimates = await getAllEstimates();
  if (filters) {
    return estimates.filter(
      ({ emittedFrom }) =>
        (filters.electricity && emittedFrom === "Electricity") ||
        (filters.flight && emittedFrom === "Flight") ||
        (filters.shipping && emittedFrom === "Shipping") ||
        (filters.vehicle && emittedFrom === "Vehicle") ||
        (filters.fuel && emittedFrom === "Fuel")
    );
  }
  return estimates;
};

const onSubmitShowEstimates = (event) => {
  event.preventDefault();
  const electricity = event.target.electricity.checked;
  const flight = event.target.flight.checked;
  const shipping = event.target.shipping.checked;
  const vehicle = event.target.vehicle.checked;
  const fuel = event.target.fuel.checked;

  if (electricity || flight || shipping || vehicle || fuel)
    renderEstimates({ electricity, flight, shipping, vehicle, fuel });
  else renderEstimates();
};

const onResetShowEstimates = () => {
  renderEstimates();
};

const renderEstimates = (filters) => {
  loadEstimates(filters).then((estimates) => {
    let html = "";
    estimates.forEach(
      ({
        emittedFrom,
        attributes: { carbon_g, carbon_lb, carbon_kg, carbon_mt, estimated_at },
      }) => {
        html += `
          <div class="estimates-row">
            <p>${emittedFrom}</p>
            <p>${carbon_g}</p>
            <p>${carbon_lb}</p>
            <p>${carbon_kg}</p>
            <p>${carbon_mt}</p>
            <p>${estimated_at}</p>
          </div>
        `;
      }
    );
    document.getElementById("estimates-body").innerHTML = html;
  });
};

renderEstimates();
