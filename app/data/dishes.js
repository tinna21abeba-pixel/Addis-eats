// Authentic Ethiopian dishes menu data
// Each dish directly contains its image path from the public/images folder

const dishes = [
  {
    id: 1,
    name: "Doro Wat",
    amharic: "ዶሮ ወጥ",
    price: 240,
    category: "Meat Dishes",
    description:
      "Our signature dish: slow-cooked chicken in our secret family berbere spice blend, served with traditional ayib and hard-boiled eggs.",
    spice: 3,
    prep: "35 min",
    popular: true,
    image: "/images/dishes/doro-wat.jpg",
  },

  {
    id: 2,
    name: "Kitfo",
    amharic: "ክትፎ",
    price: 350,
    category: "Meat Dishes",
    description:
      "Finely minced prime lean beef seasoned with fiery mitmita chili powder and rich spiced herbal butter (niter kibbeh), served with ayibe cheese and collard greens.",
    spice: 2,
    prep: "20 min",
    popular: true,
    image: "/images/dishes/kitfo.jpg",
  },
  {
    id: 3,
    name: "Tibs",
    amharic: "ጥብስ",
    price: 300,
    category: "Meat Dishes",
    description:
      "Succulent lamb cubed and sautéed at high heat with red onions, garlic, fresh rosemary and sliced jalapeño peppers, served sizzling hot on injera.",
    spice: 1,
    prep: "25 min",
    popular: true,
    image: "/images/dishes/tibs.jpg",
  },
  {
    id: 4,
    name: "Shiro",
    amharic: "ሽሮ",
    price: 150,
    category: "Vegetarian",
    description:
      "Silky, aromatic chickpea and broad bean stew seasoned with minced garlic, onions, and berbere. Ethiopia's beloved everyday comfort food.",
    spice: 2,
    prep: "20 min",
    popular: true,
    image: "/images/dishes/shiro.jpg",
  },
  {
    id: 5,
    name: "Beyaynetu",
    amharic: "በያይነቱ",
    price: 280,
    category: "Vegetarian",
    description:
      "A vibrant fasting feast platter featuring an assortment of vegetarian and lentil stews, including misir wot, kik alicha, gomen, and salad over fresh injera.",
    spice: 1,
    prep: "30 min",
    popular: true,
    image: "/images/dishes/beyaynetu.jpg",
  },
  {
    id: 6,
    name: "Kik Alicha",
    amharic: "ክክ አልጫ",
    price: 180,
    category: "Vegetarian",
    description:
      "Mild yellow split-pea stew gently simmered with turmeric, freshly grated ginger, garlic, and sweet onions. Comforting, flavorful, and gentle on spice.",
    spice: 0,
    prep: "25 min",
    popular: false,
    image: "/images/dishes/kik-alicha.jpg",
  },
  {
    id: 7,
    name: "Gomen",
    amharic: "ጎመን",
    price: 140,
    category: "Vegetarian",
    description:
      "Chopped collard greens slow-steamed with sweet garlic, ginger, and aromatic spices, accompanied by fresh homemade ayibe cheese.",
    spice: 0,
    prep: "25 min",
    popular: false,
    image: "/images/dishes/gomen.jpg",
  },
];

export const categories = ["All Dishes", ...new Set(dishes.map((d) => d.category))];
export const popularDishes = dishes.filter((d) => d.popular);
export const getDish = (id) => dishes.find((d) => String(d.id) === String(id));

export default dishes;
