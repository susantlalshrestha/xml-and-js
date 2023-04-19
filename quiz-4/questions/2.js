/**
 * Function to get array of all active users (not suspended users)
 * - should return a promise
 * @param {*} data - see shape in ../../data.example.json
 * @returns Array of users
 */
const getActiveUsers = async (data) => {
  return data.filter(({ isSuspended }) => !isSuspended);
};

module.exports = getActiveUsers;
