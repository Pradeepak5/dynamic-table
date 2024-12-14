export const data = [
  {
    id: "electronics",
    label: "Electronics",
    value: 1400, // This value will be dynamically calculated from its children
    children: [
      {
        id: "phones",
        label: "Phones",
        value: 800,
      },
      {
        id: "laptops",
        label: "Laptops",
        value: 700,
      },
    ],
  },
  {
    id: "furniture",
    label: "Furniture",
    value: 1000, // This value will be dynamically calculated from its children
    children: [
      {
        id: "tables",
        label: "Tables",
        value: 300,
      },
      {
        id: "chairs",
        label: "Chairs",
        value: 700,
      },
    ],
  },
];
