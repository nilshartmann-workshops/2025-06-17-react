export const foodtrucks = [
    { id: "1", name: "Burger Beast" },
    { id: "2", name: "Curry Cruiser" },
    { id: "3", name: "Pizza Palace" },
    { id: "4", name: "Tasty Tacos" },
    {
      id: "5", name: "Wrap it Up"
    }
]

export const reservations = [
  {
    id:              '1',
    foodTruck:       'Tasty Tacos',
    customerName:    'Jonas Berg',
    timeRange:       {
      start: '2025-06-01T11:00:00+02:00',
      end:   '2025-06-01T15:00:00+02:00',
    },
    expectedGuests: 40,
    specialRequests: 'Gluten-free options',
    status:          'Requested',
  },
  {
    id:           '2',
    foodTruck:    'Burger Beast',
    customerName: 'Alice Johnson',
    timeRange:    {
      start: '2025-06-02T12:00:00+02:00',
      end:   '2025-06-02T18:00:00+02:00',
    },
    expectedGuests: 75,
    status:       'Confirmed',
  },
  {
    id:              '3',
    foodTruck:       'Pizza Palace',
    customerName:    'Carla Mendes',
    timeRange:       {
      start: '2025-06-03T17:00:00+02:00',
      end:   '2025-06-03T22:00:00+02:00',
    },
    expectedGuests: 120,
    specialRequests: 'Extra napkins, vegetarian pizza',
    status:          'Confirmed',
  },
  {
    id:           '4',
    foodTruck:    'Wrap it Up',
    customerName: 'Laura Schmidt',
    timeRange:    {
      start: '2025-06-04T10:00:00+02:00',
      end:   '2025-06-04T14:00:00+02:00',
    },
    expectedGuests: 65,
    status:       'Rejected',
  },
  {
    id:              '5',
    foodTruck:       'Tasty Tacos',
    customerName:    'Felix Müller',
    timeRange:       {
      start: '2025-06-05T09:00:00+02:00',
      end:   '2025-06-05T12:00:00+02:00',
    },
    expectedGuests: 25,
    specialRequests: 'Outdoor service setup',
    status:          'Confirmed',
  },
  {
    id:           '6',
    foodTruck:    'Burger Beast',
    customerName: 'Clara Meier',
    timeRange:    {
      start: '2025-06-06T14:00:00+02:00',
      end:   '2025-06-06T20:00:00+02:00',
    },
    expectedGuests: 200,
    status:       'Requested',
  },
  {
    id:           '7',
    foodTruck:    'Pizza Palace',
    customerName: 'Greta Lorenz',
    timeRange:    {
      start: '2025-06-07T16:00:00+02:00',
      end:   '2025-06-07T21:00:00+02:00',
    },
    expectedGuests: 30,
    status:       'Confirmed',
  },
  {
    id:              '8',
    foodTruck:       'Wrap it Up',
    customerName:    'Isabelle Dupont',
    timeRange:       {
      start: '2025-06-08T11:00:00+02:00',
      end:   '2025-06-08T16:00:00+02:00',
    },
    specialRequests: 'Halal options',
    expectedGuests: 50,
    status:          'Requested',
  },
  {
    id:              '9',
    foodTruck:       'Curry Cruiser',
    customerName:    'Hassan Ali',
    timeRange:       {
      start: '2025-06-09T13:00:00+02:00',
      end:   '2025-06-09T19:00:00+02:00',
    },
    specialRequests: 'Spicy level medium',
    expectedGuests: 70,
    status:          'Confirmed',
  },
  {
    id:           '10',
    foodTruck:    'Curry Cruiser',
    customerName: 'Elena Bauer',
    timeRange:    {
      start: '2025-06-10T10:00:00+02:00',
      end:   '2025-06-10T14:00:00+02:00',
    },
    expectedGuests: 15,
    status:       'Rejected',
  },
];

