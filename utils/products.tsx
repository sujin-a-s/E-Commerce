export const products = [
  {
    id: "64a654593e91b8e73a351e9b",
    name: "iphone 14",
    description: "Short description",
    price: 239920, // 2999 * 80
    brand: "apple",
    category: "Phone",
    inStock: true,
    images: [
      {
        color: "White",
        colorCode: "#FFFFFF",
        image: "https://m.media-amazon.com/images/I/71p-tHQ0u1L._AC_SX679_.jpg",
      },
      {
        color: "Gray",
        colorCode: "#808080",
        image: "https://m.media-amazon.com/images/I/417tEj3iJ8L._AC_.jpg",
      },
    ],
    reviews: [],
  },
  {
    id: "64a4ebe300900d44bb50628a",
    name: "Logitech MX Keys Advanced Wireless Illuminated Keyboard",
    description:
      "PERFECT STROKE KEYS - Spherically-dished keys match the shape of your fingertips, offering satisfying feedback with every tap",
    price: 8239.20, // 102.99 * 80
    brand: "logitech",
    category: "Accesories",
    inStock: true,
    images: [
      {
        color: "Black",
        colorCode: "#000000",
        image: "https://m.media-amazon.com/images/I/71gOLg2-kqL.__AC_SX300_SY300_QL70_FMwebp_.jpg",
      },
    ],
    reviews: [
      {
        id: "64a65a6158b470c6e06959ee",
        userId: "6475af156bad4917456e6e1e",
        productId: "64a4ebe300900d44bb50628a",
        rating: 5,
        comment: "good",
        createdDate: "2023-07-06T06:08:33.067Z",
        user: {
          id: "6475af156bad4917456e6e1e",
          name: "Charles",
          email: "example@gmail.com",
          image: "https://lh3.googleusercontent.com/a/AAcHTteOiCtILLBWiAoolIW9PJH-r5825pBDl824_8LD=s96-c",
        },
      },
    ],
  },
  {
    id: "648437b38c44d52b9542e340",
    name: "Apple iPhone 13, 64GB",
    description:
      'The product is refurbished, fully functional, and in excellent condition.',
    price: 3200, // 40 * 80
    brand: "Apple",
    category: "Phone",
    inStock: true,
    images: [
      {
        color: "Black",
        colorCode: "#000000",
        image: "https://m.media-amazon.com/images/I/61g+McQpg7L._AC_SX679_.jpg",
      },
      {
        color: "Blue",
        colorCode: "#0000FF",
        image: "https://m.media-amazon.com/images/I/713Om9vCHUL._AC_SX679_.jpg",
      },
      {
        color: "Red",
        colorCode: "#FF0000",
        image: "https://m.media-amazon.com/images/I/61thdjmfHcL.__AC_SX300_SY300_QL70_FMwebp_.jpg",
      },
    ],
    reviews: [
      {
        id: "6499b4887402b0efd394d8f3",
        userId: "6499b184b0e9a8c8709821d3",
        productId: "648437b38c44d52b9542e340",
        rating: 4,
        comment: "good enough. I like the camera and casing.",
        createdDate: "2023-06-26T15:53:44.483Z",
        user: {
          id: "6499b184b0e9a8c8709821d3",
          name: "Chaoo",
          email: "example1@gmail.com",
          image: "https://lh3.googleusercontent.com/a/AAcHTtcuRLwWi1vPKaQOcJlUurlhRAIIq2LgYccE8p32=s96-c",
        },
      },
      {
        id: "6499a110efe4e4de451c7edc",
        userId: "6475af156bad4917456e6e1e",
        productId: "648437b38c44d52b9542e340",
        rating: 5,
        comment: "I really liked it!!",
        createdDate: "2023-06-26T14:30:40.998Z",
        user: {
          id: "6475af156bad4917456e6e1e",
          name: "Charles",
          email: "example@gmail.com",
          image: "https://lh3.googleusercontent.com/a/AAcHTteOiCtILLBWiAoolIW9PJH-r5825pBDl824_8LD=s96-c",
        },
      },
    ],
  },
  {
    id: "64a4e9e77e7299078334019f",
    name: "Logitech MX Master 2S Wireless Mouse",
    description:
      "Cross computer control: Game changing capacity to navigate seamlessly on 3 computers.",
    price: 5600, // 70 * 80
    brand: "logitech",
    category: "Accesories",
    inStock: true,
    images: [
      {
        color: "Graphite",
        colorCode: "#383838",
        image: "https://m.media-amazon.com/images/I/61ni3t1ryQL.__AC_SX300_SY300_QL70_FMwebp_.jpg",
      },
    ],
    reviews: [],
  },
  {
    id: "649d775128b6744f0f497040",
    name: 'Smart Watch, 1.85" Smartwatch for Men Women',
    description:
      'Bluetooth Call and Message Reminder: The smart watch is equipped with HD speaker.',
    price: 4000, // 50 * 80
    brand: "Nerunsa",
    category: "Watch",
    inStock: true,
    images: [
      {
        color: "Black",
        colorCode: "#000000",
        image: "https://m.media-amazon.com/images/I/71s4mjiit3L.__AC_SX300_SY300_QL70_FMwebp_.jpg",
      },
      {
        color: "Silver",
        colorCode: "#C0C0C0",
        image: "https://m.media-amazon.com/images/I/71zbWSRMaYL.__AC_SX300_SY300_QL70_FMwebp_.jpg",
      },
    ],
    reviews: [],
  },
];