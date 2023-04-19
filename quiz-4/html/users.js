const loadData = async () => {
  /**
   * load data from https://6253799f90266e3d0e0373e6.mockapi.io/ok/user
   */
  const data = await fetch(
    `https://6253799f90266e3d0e0373e6.mockapi.io/ok/user`
  );
  const result = await data.json();
  return result;
};

loadData().then((data) => {
  /**
   * render data in html table
   */
  const html = data.map(createElement).join("");
  document.getElementById("data-container").innerHTML = html;
});

const createElement = ({
  id,
  userName,
  email,
  isSuspended,
  address,
  vehicle,
}) => `
<tr>
  <td>${id}</td>
  <td>${userName}</td>
  <td>${email}</td>
  <td>${isSuspended}</td>
  <td>
    <table border="1">
      <tr>
        <th>ID</th>
        <th>Country</th>
        <th>State</th>
        <th>City</th>
        <th>ZipCode</th>
      </tr>
      ${address.map(createAddressElement).join("")}
    </table>
  </td>
  <td>
    <table border="1">
      <tr>
        <th>ID</th>
        <th>Vin</th>
        <th>Manufacturer</th>
        <th>Model</th>
        <th>Type</th>
        <th>Age</th>
      </tr>
      ${vehicle.map(createVechicleElement).join("")}
    </table>
  </td>
</tr>
`;

const createAddressElement = ({ id, country, state, city, zipCode }) => `
<tr>
  <td>${id}</td>
  <td>${country}</td>
  <td>${state}</td>
  <td>${city}</td>
  <td>${zipCode}</td>
</tr>
`;

const createVechicleElement = ({ id, vin, manufacturer, model, type, age }) => `
<tr>
  <td>${id}</td>
  <td>${vin}</td>
  <td>${manufacturer}</td>
  <td>${model}</td>
  <td>${type}</td>
  <td>${age}</td>
</tr>
`;
