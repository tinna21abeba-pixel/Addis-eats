const initialSeedOrders = [
  {
    id: "ORD-1001",
    userId: "seed_user_1",
    name: "Abebe Bikila",
    phone: "0911223344",
    address: "Bole, Ring Road Area",
    neighbourhood: "Bole",
    note: "Call on arrival",
    items: [
      { dishId: 1, name: "Kitfo", price: 350, quantity: 2 },
      { dishId: 2, name: "Doro Wat", price: 400, quantity: 1 }
    ],
    total: 1100,
    status: "delivered",
    createdAt: "2026-10-09T08:30:00.000Z"
  },
  {
    id: "ORD-1002",
    userId: "seed_user_2",
    name: "Tigist Assefa",
    phone: "0911334455",
    address: "Kazanchis, Guinea Conakry St",
    neighbourhood: "Kazanchis",
    note: "",
    items: [
      { dishId: 3, name: "Beyaynetu", price: 500, quantity: 2 },
      { dishId: 6, name: "Shiro", price: 250, quantity: 1 }
    ],
    total: 1250,
    status: "delivered",
    createdAt: "2026-10-09T12:15:00.000Z"
  },
  {
    id: "ORD-1003",
    userId: "seed_user_3",
    name: "Haile Gebrselassie",
    phone: "0911445566",
    address: "Bole, Atlas Hotel Area",
    neighbourhood: "Bole",
    note: "Extra spiced butter",
    items: [
      { dishId: 4, name: "Tibs", price: 350, quantity: 3 },
      { dishId: 7, name: "Asa Tibs", price: 600, quantity: 1 }
    ],
    total: 1650,
    status: "delivered",
    createdAt: "2026-10-09T18:45:00.000Z"
  },
  {
    id: "ORD-1004",
    userId: "seed_user_4",
    name: "Almaz Ayana",
    phone: "0911556677",
    address: "Piazza, Churchill Ave",
    neighbourhood: "Piazza",
    note: "",
    items: [
      { dishId: 2, name: "Doro Wat", price: 400, quantity: 2 }
    ],
    total: 800,
    status: "delivered",
    createdAt: "2026-10-10T09:20:00.000Z"
  },
  {
    id: "ORD-1005",
    userId: "seed_user_5",
    name: "Kenenisa Bekele",
    phone: "0911667788",
    address: "Sarbet, South Africa St",
    neighbourhood: "Sarbet",
    note: "Ring doorbell",
    items: [
      { dishId: 1, name: "Kitfo", price: 350, quantity: 4 }
    ],
    total: 1400,
    status: "delivered",
    createdAt: "2026-10-10T13:00:00.000Z"
  },
  {
    id: "ORD-1006",
    userId: "seed_user_6",
    name: "Derartu Tulu",
    phone: "0911778899",
    address: "CMC, Road 4",
    neighbourhood: "CMC",
    note: "",
    items: [
      { dishId: 3, name: "Beyaynetu", price: 500, quantity: 3 },
      { dishId: 5, name: "Fasolia", price: 400, quantity: 1 }
    ],
    total: 1900,
    status: "delivered",
    createdAt: "2026-10-10T19:30:00.000Z"
  },
  {
    id: "ORD-1007",
    userId: "seed_user_7",
    name: "Meseret Defar",
    phone: "0911889900",
    address: "Kirkos, Meskel Square",
    neighbourhood: "Kirkos",
    note: "",
    items: [
      { dishId: 6, name: "Shiro", price: 250, quantity: 2 },
      { dishId: 8, name: "Miser Wot", price: 350, quantity: 1 }
    ],
    total: 850,
    status: "delivered",
    createdAt: "2026-10-11T10:15:00.000Z"
  },
  {
    id: "ORD-1008",
    userId: "seed_user_8",
    name: "Sileshi Sihine",
    phone: "0911990011",
    address: "Gerji, Imperial Area",
    neighbourhood: "Gerji",
    note: "Leave at front desk",
    items: [
      { dishId: 4, name: "Tibs", price: 350, quantity: 2 },
      { dishId: 1, name: "Kitfo", price: 350, quantity: 1 }
    ],
    total: 1050,
    status: "delivered",
    createdAt: "2026-10-11T13:40:00.000Z"
  },
  {
    id: "ORD-1009",
    userId: "seed_user_9",
    name: "Tirunesh Dibaba",
    phone: "0912112233",
    address: "Bole, Medhanialem Area",
    neighbourhood: "Bole",
    note: "",
    items: [
      { dishId: 7, name: "Asa Tibs", price: 600, quantity: 3 }
    ],
    total: 1800,
    status: "delivered",
    createdAt: "2026-10-11T17:50:00.000Z"
  },
  {
    id: "ORD-1010",
    userId: "seed_user_10",
    name: "Mulugeta Wendimu",
    phone: "0912223344",
    address: "Arada, Posta Bet",
    neighbourhood: "Arada",
    note: "",
    items: [
      { dishId: 2, name: "Doro Wat", price: 400, quantity: 1 },
      { dishId: 9, name: "Gomen", price: 400, quantity: 1 }
    ],
    total: 800,
    status: "delivered",
    createdAt: "2026-10-11T20:10:00.000Z"
  },
  {
    id: "ORD-1011",
    userId: "seed_user_11",
    name: "Senbere Teferi",
    phone: "0912334455",
    address: "Kazanchis, Intercontinental Area",
    neighbourhood: "Kazanchis",
    note: "Warm injera please",
    items: [
      { dishId: 1, name: "Kitfo", price: 350, quantity: 2 },
      { dishId: 3, name: "Beyaynetu", price: 500, quantity: 2 }
    ],
    total: 1700,
    status: "delivered",
    createdAt: "2026-10-12T09:05:00.000Z"
  },
  {
    id: "ORD-1012",
    userId: "seed_user_12",
    name: "Berhane Adere",
    phone: "0912445566",
    address: "Piazza, De Gaulle Square",
    neighbourhood: "Piazza",
    note: "",
    items: [
      { dishId: 4, name: "Tibs", price: 350, quantity: 4 }
    ],
    total: 1400,
    status: "delivered",
    createdAt: "2026-10-12T12:30:00.000Z"
  },
  {
    id: "ORD-1013",
    userId: "seed_user_13",
    name: "Gudaf Tsegay",
    phone: "0912556677",
    address: "Sarbet, Near Vatican Embassy",
    neighbourhood: "Sarbet",
    note: "",
    items: [
      { dishId: 6, name: "Shiro", price: 250, quantity: 3 },
      { dishId: 10, name: "Kik Alicha", price: 350, quantity: 1 }
    ],
    total: 1100,
    status: "delivered",
    createdAt: "2026-10-12T15:20:00.000Z"
  },
  {
    id: "ORD-1014",
    userId: "seed_user_14",
    name: "Tamirat Tola",
    phone: "0912667788",
    address: "CMC, Near Michael",
    neighbourhood: "CMC",
    note: "Extra chili",
    items: [
      { dishId: 2, name: "Doro Wat", price: 400, quantity: 3 }
    ],
    total: 1200,
    status: "delivered",
    createdAt: "2026-10-12T19:00:00.000Z"
  },
  {
    id: "ORD-1015",
    userId: "seed_user_15",
    name: "Selemon Barega",
    phone: "0912778899",
    address: "Bole, Rwanda Embassy Area",
    neighbourhood: "Bole",
    note: "",
    items: [
      { dishId: 7, name: "Asa Tibs", price: 600, quantity: 2 },
      { dishId: 3, name: "Beyaynetu", price: 500, quantity: 2 }
    ],
    total: 2200,
    status: "delivered",
    createdAt: "2026-10-13T08:45:00.000Z"
  },
  {
    id: "ORD-1016",
    userId: "seed_user_16",
    name: "Letesenbet Gidey",
    phone: "0912889900",
    address: "Kazanchis, UN ECA Gate",
    neighbourhood: "Kazanchis",
    note: "Call upon arrival",
    items: [
      { dishId: 1, name: "Kitfo", price: 350, quantity: 3 },
      { dishId: 5, name: "Fasolia", price: 400, quantity: 1 }
    ],
    total: 1450,
    status: "delivered",
    createdAt: "2026-10-13T11:55:00.000Z"
  },
  {
    id: "ORD-1017",
    userId: "seed_user_17",
    name: "Amane Beriso",
    phone: "0912990011",
    address: "Kirkos, Gotera Interchange",
    neighbourhood: "Kirkos",
    note: "",
    items: [
      { dishId: 4, name: "Tibs", price: 350, quantity: 2 }
    ],
    total: 700,
    status: "delivered",
    createdAt: "2026-10-13T14:10:00.000Z"
  },
  {
    id: "ORD-1018",
    userId: "seed_user_18",
    name: "Yomif Kejelcha",
    phone: "0913112233",
    address: "Gerji, Roba Bakery Area",
    neighbourhood: "Gerji",
    note: "",
    items: [
      { dishId: 2, name: "Doro Wat", price: 400, quantity: 2 },
      { dishId: 8, name: "Miser Wot", price: 350, quantity: 2 }
    ],
    total: 1500,
    status: "delivered",
    createdAt: "2026-10-13T18:25:00.000Z"
  },
  {
    id: "ORD-1019",
    userId: "seed_user_19",
    name: "Worknesh Degefa",
    phone: "0913223344",
    address: "Piazza, Habte Giyorgis Bridge",
    neighbourhood: "Piazza",
    note: "No onions",
    items: [
      { dishId: 6, name: "Shiro", price: 250, quantity: 2 },
      { dishId: 9, name: "Gomen", price: 400, quantity: 1 }
    ],
    total: 900,
    status: "delivered",
    createdAt: "2026-10-13T21:00:00.000Z"
  },
  {
    id: "ORD-1020",
    userId: "seed_user_20",
    name: "Lamecha Girma",
    phone: "0913334455",
    address: "Bole, Dembel City Center Area",
    neighbourhood: "Bole",
    note: "",
    items: [
      { dishId: 1, name: "Kitfo", price: 350, quantity: 2 },
      { dishId: 7, name: "Asa Tibs", price: 600, quantity: 2 }
    ],
    total: 1900,
    status: "delivered",
    createdAt: "2026-10-14T09:15:00.000Z"
  },
  {
    id: "ORD-1021",
    userId: "seed_user_21",
    name: "Ejgayehu Taye",
    phone: "0913445566",
    address: "Sarbet, Old Airport Road",
    neighbourhood: "Sarbet",
    note: "Please deliver hot",
    items: [
      { dishId: 3, name: "Beyaynetu", price: 500, quantity: 4 }
    ],
    total: 2000,
    status: "delivered",
    createdAt: "2026-10-14T12:40:00.000Z"
  },
  {
    id: "ORD-1022",
    userId: "seed_user_22",
    name: "Muktar Edris",
    phone: "0913556677",
    address: "Arada, Arat Kilo",
    neighbourhood: "Arada",
    note: "",
    items: [
      { dishId: 4, name: "Tibs", price: 350, quantity: 3 }
    ],
    total: 1050,
    status: "delivered",
    createdAt: "2026-10-14T14:50:00.000Z"
  },
  {
    id: "ORD-1023",
    userId: "seed_user_23",
    name: "Freweyni Hailu",
    phone: "0913667788",
    address: "CMC, Ayat Junction",
    neighbourhood: "CMC",
    note: "",
    items: [
      { dishId: 2, name: "Doro Wat", price: 400, quantity: 2 },
      { dishId: 6, name: "Shiro", price: 250, quantity: 2 }
    ],
    total: 1300,
    status: "delivered",
    createdAt: "2026-10-14T17:35:00.000Z"
  },
  {
    id: "ORD-1024",
    userId: "seed_user_24",
    name: "Tadese Takele",
    phone: "0913778899",
    address: "Kazanchis, Kazanchis Total",
    neighbourhood: "Kazanchis",
    note: "Extra mitmita",
    items: [
      { dishId: 1, name: "Kitfo", price: 350, quantity: 3 },
      { dishId: 4, name: "Tibs", price: 350, quantity: 2 }
    ],
    total: 1750,
    status: "delivered",
    createdAt: "2026-10-14T20:20:00.000Z"
  },
  {
    id: "ORD-1025",
    userId: "seed_user_25",
    name: "Lemlem Hailu",
    phone: "0913889900",
    address: "Bole, Edna Mall Area",
    neighbourhood: "Bole",
    note: "",
    items: [
      { dishId: 7, name: "Asa Tibs", price: 600, quantity: 4 }
    ],
    total: 2400,
    status: "delivered",
    createdAt: "2026-10-15T08:10:00.000Z"
  },
  {
    id: "ORD-1026",
    userId: "seed_user_26",
    name: "Berihu Aregawi",
    phone: "0913990011",
    address: "Piazza, Municipal Hall Area",
    neighbourhood: "Piazza",
    note: "",
    items: [
      { dishId: 3, name: "Beyaynetu", price: 500, quantity: 2 },
      { dishId: 10, name: "Kik Alicha", price: 350, quantity: 2 }
    ],
    total: 1700,
    status: "ready",
    createdAt: "2026-10-15T09:30:00.000Z"
  },
  {
    id: "ORD-1027",
    userId: "seed_user_27",
    name: "Dawit Seyaum",
    phone: "0914112233",
    address: "Kirkos, Lancia Area",
    neighbourhood: "Kirkos",
    note: "",
    items: [
      { dishId: 1, name: "Kitfo", price: 350, quantity: 2 },
      { dishId: 2, name: "Doro Wat", price: 400, quantity: 1 }
    ],
    total: 1100,
    status: "ready",
    createdAt: "2026-10-15T10:45:00.000Z"
  },
  {
    id: "ORD-1028",
    userId: "seed_user_28",
    name: "Tsigie Gebreselama",
    phone: "0914223344",
    address: "Gerji, Unity University Area",
    neighbourhood: "Gerji",
    note: "Fast delivery requested",
    items: [
      { dishId: 4, name: "Tibs", price: 350, quantity: 3 },
      { dishId: 5, name: "Fasolia", price: 400, quantity: 1 }
    ],
    total: 1450,
    status: "preparing",
    createdAt: "2026-10-15T11:20:00.000Z"
  },
  {
    id: "ORD-1029",
    userId: "seed_user_29",
    name: "Hagos Gebrhiwet",
    phone: "0914334455",
    address: "Sarbet, Pushkin Square",
    neighbourhood: "Sarbet",
    note: "",
    items: [
      { dishId: 6, name: "Shiro", price: 250, quantity: 2 },
      { dishId: 8, name: "Miser Wot", price: 350, quantity: 1 }
    ],
    total: 850,
    status: "preparing",
    createdAt: "2026-10-15T12:05:00.000Z"
  },
  {
    id: "ORD-1030",
    userId: "seed_user_30",
    name: "Diribe Welteji",
    phone: "0914445566",
    address: "Bole, Brass Hospital Area",
    neighbourhood: "Bole",
    note: "",
    items: [
      { dishId: 1, name: "Kitfo", price: 350, quantity: 2 },
      { dishId: 3, name: "Beyaynetu", price: 500, quantity: 1 }
    ],
    total: 1200,
    status: "pending",
    createdAt: "2026-10-15T12:50:00.000Z"
  },
  {
    id: "ORD-1031",
    userId: "seed_user_31",
    name: "Getnet Wale",
    phone: "0914556677",
    address: "Kazanchis, Hilton Hotel Area",
    neighbourhood: "Kazanchis",
    note: "Include cutlery",
    items: [
      { dishId: 2, name: "Doro Wat", price: 400, quantity: 2 },
      { dishId: 4, name: "Tibs", price: 350, quantity: 1 }
    ],
    total: 1150,
    status: "pending",
    createdAt: "2026-10-15T13:15:00.000Z"
  },
  {
    id: "ORD-1032",
    userId: "seed_user_32",
    name: "Meskerem Mamo",
    phone: "0914667788",
    address: "Piazza, Cinema Empire Area",
    neighbourhood: "Piazza",
    note: "",
    items: [
      { dishId: 6, name: "Shiro", price: 250, quantity: 1 }
    ],
    total: 250,
    status: "cancelled",
    createdAt: "2026-10-15T13:40:00.000Z"
  }
];

export default initialSeedOrders;
