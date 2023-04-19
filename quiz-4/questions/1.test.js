const getAllStates = require("./1");

const data = [
  {
    address: [
      {
        state: "California",
      },
    ],
  },
  {
    address: [
      {
        state: "Minnesota",
      },
    ],
  },
  {
    address: [
      {
        state: "New Hampshire",
      },
    ],
  },
];

const expected = ["California", "Minnesota", "New Hampshire"];

describe(`question 1. getAllStates`, () => {
  test(`is a promise`, () => {
    const result = getAllStates(data);
    expect(result instanceof Promise).toBeTruthy();
  });

  test(`returns states`, async () => {
    const result = await getAllStates(data);
    expect(result).toStrictEqual(expected);
  });

  test(`check for duplicates`, async () => {
    const result = await getAllStates([...data, ...data]);
    expect(result).toStrictEqual(expected);
  });
});
