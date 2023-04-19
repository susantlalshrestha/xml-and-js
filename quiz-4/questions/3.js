/**
 * Function to get username and total age of user's vehicles
 * - should return a promise
 * @param {*} data - see shape in ../../data.example.json
 * @returns Array of objects:
 * [{
 *  userName - string,
 *  totalAgent - number
 * }]
 */
const getUserNameAndVehicleAge = async (data) => {
  return data.map(({ userName, vehicle }) => {
    const totalAge = vehicle.reduce((a, c) => a + c.age, 0);
    return { userName, totalAge };
  });
};

module.exports = getUserNameAndVehicleAge;
