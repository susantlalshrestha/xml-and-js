const timeout = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const generateRandomNumber = () => Math.floor(Math.random() * 40);

const generateData = async () => {
  await timeout(1000);
  return Array.from({ length: 20 }, generateRandomNumber);
};

const convertToFeet = async (meters) => {
  const feet = meters * 3.2808;
  await timeout(3500);
  return feet;
};

const processData = async (data) => {
  // This implementation printed the output all at once
  // const results = await Promise.all(data.map(convertToFeet));
  // results.forEach((result, index) => logResult(data[index], result));

  // This implementation also printed the output all at once
  // await Promise.all(
  //   data.map(async (value) => {
  //     const result = await convertToFeet(value);
  //     logResult(value, result);
  //   })
  // );

  // This implementation prints the output one by one
  for (const value of data) {
    const result = await convertToFeet(value);
    logResult(value, result);
  }
};

const logResult = (meters, feet) => {
  console.log(`Converted ${meters}m to ${feet}ft`);
};

const main = async () => {
  console.log("Start");
  const data = await generateData();
  await processData(data);
  console.log("Finish");
};

main();
