const getActiveUsers = require("./2");

const data = [
  {
    createdAt: "2022-04-10T19:06:49.155Z",
    userName: "Lucius11",
    isSuspended: true,
    email: "Maximo_Blick@gmail.com",
    id: "1",
    address: [
      {
        country: "TF",
        state: "California",
        city: "North Lilyhaven",
        zipCode: "95974-7870",
        id: "1",
        userId: "1",
      },
    ],
    vehicle: [
      {
        vin: "R5APVAX399RP61264",
        manufacturer: "Volkswagen",
        model: "A8",
        type: "Crew Cab Pickup",
        age: 26,
        id: "1",
        userId: "1",
      },
      {
        vin: "UZ41EWD4F3K270847",
        manufacturer: "Hyundai",
        model: "Fortwo",
        type: "Extended Cab Pickup",
        age: 79,
        id: "51",
        userId: "1",
      },
      {
        vin: "64KZCNEK15FS57248",
        manufacturer: "Jaguar",
        model: "Malibu",
        type: "Crew Cab Pickup",
        age: 78,
        id: "75",
        userId: "1",
      },
    ],
  },
  {
    createdAt: "2022-04-10T14:27:49.570Z",
    userName: "Nicolas.Mayer48",
    isSuspended: false,
    email: "Melba.Torp38@gmail.com",
    id: "2",
    address: [
      {
        country: "AO",
        state: "Minnesota",
        city: "Hempstead",
        zipCode: "67028-2668",
        id: "2",
        userId: "2",
      },
    ],
    vehicle: [
      {
        vin: "Z4KY2UPAKYFF20274",
        manufacturer: "Rolls Royce",
        model: "Volt",
        type: "Hatchback",
        age: 23,
        id: "2",
        userId: "2",
      },
    ],
  },
  {
    createdAt: "2022-04-10T09:03:09.694Z",
    userName: "Demetris_Weissnat77",
    isSuspended: false,
    email: "Vivianne.Blick@gmail.com",
    id: "3",
    address: [
      {
        country: "IQ",
        state: "New Hampshire",
        city: "North Rubyland",
        zipCode: "95151-0807",
        id: "3",
        userId: "3",
      },
    ],
    vehicle: [
      {
        vin: "F4WDADF7VGN124196",
        manufacturer: "Audi",
        model: "Golf",
        type: "Extended Cab Pickup",
        age: 3,
        id: "3",
        userId: "3",
      },
    ],
  },
];

describe(`question 2. getActiveUsers`, () => {
  test(`is a promise`, () => {
    const result = getActiveUsers(data);
    expect(result instanceof Promise).toBeTruthy();
  });

  test(`returns only suspended`, async () => {
    const result = await getActiveUsers(data);
    expect(result).toHaveLength(2);
  });

  test(`returns full user object`, async () => {
    const expected = [
      {
        createdAt: "2022-04-10T14:27:49.570Z",
        userName: "Nicolas.Mayer48",
        isSuspended: false,
        email: "Melba.Torp38@gmail.com",
        id: "2",
        address: [
          {
            country: "AO",
            state: "Minnesota",
            city: "Hempstead",
            zipCode: "67028-2668",
            id: "2",
            userId: "2",
          },
        ],
        vehicle: [
          {
            vin: "Z4KY2UPAKYFF20274",
            manufacturer: "Rolls Royce",
            model: "Volt",
            type: "Hatchback",
            age: 23,
            id: "2",
            userId: "2",
          },
        ],
      },
      {
        createdAt: "2022-04-10T09:03:09.694Z",
        userName: "Demetris_Weissnat77",
        isSuspended: false,
        email: "Vivianne.Blick@gmail.com",
        id: "3",
        address: [
          {
            country: "IQ",
            state: "New Hampshire",
            city: "North Rubyland",
            zipCode: "95151-0807",
            id: "3",
            userId: "3",
          },
        ],
        vehicle: [
          {
            vin: "F4WDADF7VGN124196",
            manufacturer: "Audi",
            model: "Golf",
            type: "Extended Cab Pickup",
            age: 3,
            id: "3",
            userId: "3",
          },
        ],
      },
    ];
    const result = await getActiveUsers(data);
    expect(result).toStrictEqual(expected);
  });
});
