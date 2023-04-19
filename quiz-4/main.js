const fetch = require("node-fetch");

const getAllStates = require("./questions/1");
const getActiveUsers = require("./questions/2");
const getUserNameAndVehicleAge = require("./questions/3");
const getByVIN = require("./questions/4");

const loadData = async () => {
  /**
   * fetch data from https://6253799f90266e3d0e0373e6.mockapi.io/ok/user
   *
   * this function should be asyncronous
   * and return array of data fetch from the endpoint
   *
   * fix this function to return data
   */
  const data = await fetch(
    `https://6253799f90266e3d0e0373e6.mockapi.io/ok/user`
  );

  const result = await data.json();

  return result;
};

const main = async () => {
  const data = await loadData();

  console.log(`-----------------------------`);
  console.log(`Question 1: getAllStates`);
  console.log(`-----------------------------`);
  const states = await getAllStates(data);
  console.log(states);

  console.log(`-----------------------------`);
  console.log(`Question 2: getActiveUsers`);
  console.log(`-----------------------------`);
  const activeUsers = await getActiveUsers(data);
  console.log(activeUsers);

  console.log(`-----------------------------`);
  console.log(`Question 3: getUserNameAndVehicleAge`);
  console.log(`-----------------------------`);
  const userWithVehicleAge = await getUserNameAndVehicleAge(data);
  console.log(userWithVehicleAge);

  console.log(`-----------------------------`);
  console.log(`Question 4: getByVIN`);
  console.log(`-----------------------------`);
  const vehicle = await getByVIN(data, `XVHR864VB5CL27070`);
  console.log(vehicle);
};

main();
