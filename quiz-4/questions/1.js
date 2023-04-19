/**
 * Function to get array of all states.
 * - should return a promise
 * @param {*} data - see shape in ../../data.example.json
 * @returns Array of strings, e.g ["value1", "value2"]
 */
const getAllStates = async (data) => {
  return data
    .flatMap(({ address }) => address)
    .map(({ state }) => state)
    .reduce((a, c) => {
      if (!a.includes(c)) a.push(c);
      return a;
    }, []);
};

module.exports = getAllStates;
