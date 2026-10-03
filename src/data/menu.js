// Official Tea Talk Menu Data
// Extracted 100% directly from all uploaded Tea Talk menu card images (97 Items Across 16 Categories)

export const menuCategories = [
  { id: 'all', name: 'All Items' },
  { id: 'special-teas', name: 'Special Teas' },
  { id: 'black-teas', name: 'Black Teas' },
  { id: 'coffees-hots', name: 'Coffees & Hots' },
  { id: 'burgers', name: 'Burgers' },
  { id: 'sandwiches', name: 'Sandwiches' },
  { id: 'rolls-wraps', name: 'Rolls & Wraps' },
  { id: 'momos', name: 'Momos' },
  { id: 'loaded-fries', name: 'Loaded Fries' },
  { id: 'bunnies', name: 'Bunnies' },
  { id: 'salads', name: 'Salads' },
  { id: 'combos', name: 'Combos' },
  { id: 'starters', name: 'Starters' },
  { id: 'fresh-juices', name: 'Fresh Juices' },
  { id: 'shakes', name: 'Shakes' },
  { id: 'mojitos', name: 'Mojitos' },
  { id: 'faloodas-desserts', name: 'Faloodas & Desserts' }
];

export const menuItems = [
  // SPECIAL TEAS
  {
    id: 101,
    name: "Regular Tea",
    category: "special-teas",
    price: "₹20",
    description: "Classic everyday hot brewed tea prepared with milk.",
    popular: true,
    image: "https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=600&q=80",
    tags: ["Classic", "Daily Favorite"]
  },
  {
    id: 102,
    name: "TeaTalk Signature Tea",
    category: "special-teas",
    price: "₹40",
    description: "Our special recipe slow-steeped signature tea with aromatic spices.",
    popular: true,
    image: "https://images.unsplash.com/photo-1597481499750-3e6b22637e12?auto=format&fit=crop&w=600&q=80",
    tags: ["Signature", "Best Seller"]
  },
  {
    id: 103,
    name: "Tea Talk Saffron Tea",
    category: "special-teas",
    price: "₹60",
    description: "Luxurious tea infused with pure saffron strands for a royal flavor.",
    popular: true,
    image: "https://images.unsplash.com/photo-1544787219-7f47ccb76574?auto=format&fit=crop&w=600&q=80",
    tags: ["Royal", "Saffron"]
  },
  {
    id: 104,
    name: "Dilli Tea",
    category: "special-teas",
    price: "₹40",
    description: "Rich North Indian style spiced kadak chai.",
    popular: false,
    image: "https://images.unsplash.com/photo-1561336313-0bd5e0b27ec8?auto=format&fit=crop&w=600&q=80",
    tags: ["Kadak"]
  },
  {
    id: 105,
    name: "Cinnamon",
    category: "special-teas",
    price: "₹30",
    description: "Fragrant Ceylon cinnamon steeped with premium tea leaves.",
    popular: false,
    image: "https://images.unsplash.com/photo-1571934811356-5cc061b6821f?auto=format&fit=crop&w=600&q=80",
    tags: ["Spiced"]
  },
  {
    id: 106,
    name: "Cardamom Tea",
    category: "special-teas",
    price: "₹40",
    description: "Aromatic Wayanad cardamom blended chai.",
    popular: true,
    image: "https://images.unsplash.com/photo-1597481499750-3e6b22637e12?auto=format&fit=crop&w=600&q=80",
    tags: ["Elaichi", "Aromatic"]
  },
  {
    id: 107,
    name: "Caramel Tea",
    category: "special-teas",
    price: "₹35",
    description: "Smooth caramel notes balanced with hot brewed tea.",
    popular: false,
    image: "https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=600&q=80",
    tags: ["Sweet Caramel"]
  },
  {
    id: 108,
    name: "Chocolate",
    category: "special-teas",
    price: "₹40",
    description: "Rich cocoa infused milk tea delight.",
    popular: false,
    image: "https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=600&q=80",
    tags: ["Chocolate Blend"]
  },
  {
    id: 109,
    name: "Badam Tea",
    category: "special-teas",
    price: "₹35",
    description: "Nourishing almond flavor infused tea.",
    popular: false,
    image: "https://images.unsplash.com/photo-1544787219-7f47ccb76574?auto=format&fit=crop&w=600&q=80",
    tags: ["Almond"]
  },
  {
    id: 110,
    name: "Masala Tea",
    category: "special-teas",
    price: "₹40",
    description: "Authentic Whole Spice blend with ginger, clove, and cardamom.",
    popular: true,
    image: "https://images.unsplash.com/photo-1561336313-0bd5e0b27ec8?auto=format&fit=crop&w=600&q=80",
    tags: ["Masala"]
  },
  {
    id: 111,
    name: "Rose Tea",
    category: "special-teas",
    price: "₹45",
    description: "Delicate fragrant rose petal extract with milk tea.",
    popular: false,
    image: "https://images.unsplash.com/photo-1597481499750-3e6b22637e12?auto=format&fit=crop&w=600&q=80",
    tags: ["Floral"]
  },
  {
    id: 112,
    name: "Mango Tea",
    category: "special-teas",
    price: "₹50",
    description: "Sweet mango flavor notes blended into smooth tea.",
    popular: false,
    image: "https://images.unsplash.com/photo-1556679343-c7306c1976bc?auto=format&fit=crop&w=600&q=80",
    tags: ["Fruity"]
  },
  {
    id: 113,
    name: "Assam Tea",
    category: "special-teas",
    price: "₹30",
    description: "Strong, full-bodied Assam leaf single origin tea.",
    popular: false,
    image: "https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=600&q=80",
    tags: ["Strong"]
  },
  {
    id: 114,
    name: "Karak Chai",
    category: "special-teas",
    price: "₹40",
    description: "Strong boiled Arabian-style Karak tea.",
    popular: true,
    image: "https://images.unsplash.com/photo-1597481499750-3e6b22637e12?auto=format&fit=crop&w=600&q=80",
    tags: ["GCC Favorite"]
  },
  {
    id: 115,
    name: "Earlgrey Tea",
    category: "special-teas",
    price: "₹40",
    description: "Classic Bergamot infused black tea.",
    popular: false,
    image: "https://images.unsplash.com/photo-1571934811356-5cc061b6821f?auto=format&fit=crop&w=600&q=80",
    tags: ["Bergamot"]
  },
  {
    id: 116,
    name: "Thulasi Tea",
    category: "special-teas",
    price: "₹40",
    description: "Holy Basil (Tulsi) herbal wellness tea infusion.",
    popular: false,
    image: "https://images.unsplash.com/photo-1556679343-c7306c1976bc?auto=format&fit=crop&w=600&q=80",
    tags: ["Herbal"]
  },
  {
    id: 117,
    name: "Passion Fruit Tea",
    category: "special-teas",
    price: "₹50",
    description: "Tangy tropical passion fruit notes with hot tea.",
    popular: false,
    image: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=600&q=80",
    tags: ["Tropical"]
  },

  // BLACK TEAS
  {
    id: 201,
    name: "Classic Black Tea",
    category: "black-teas",
    price: "₹12",
    description: "Crisp black tea steeped without milk.",
    popular: true,
    image: "https://images.unsplash.com/photo-1571934811356-5cc061b6821f?auto=format&fit=crop&w=600&q=80",
    tags: ["Kattan"]
  },
  {
    id: 202,
    name: "Classic Black Coffee",
    category: "black-teas",
    price: "₹20",
    description: "Pure dark black coffee brew.",
    popular: false,
    image: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=600&q=80",
    tags: ["Black Coffee"]
  },
  {
    id: 203,
    name: "Lemon Tea",
    category: "black-teas",
    price: "₹20",
    description: "Refreshing black tea with fresh lemon squeeze.",
    popular: true,
    image: "https://images.unsplash.com/photo-1556679343-c7306c1976bc?auto=format&fit=crop&w=600&q=80",
    tags: ["Citrus"]
  },
  {
    id: 204,
    name: "Mint Tea",
    category: "black-teas",
    price: "₹20",
    description: "Black tea infused with garden fresh mint leaves.",
    popular: false,
    image: "https://images.unsplash.com/photo-1597481499750-3e6b22637e12?auto=format&fit=crop&w=600&q=80",
    tags: ["Minty"]
  },
  {
    id: 205,
    name: "Passion Fruit Tea",
    category: "black-teas",
    price: "₹35",
    description: "Tangy black tea with natural passion fruit extract.",
    popular: false,
    image: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=600&q=80",
    tags: ["Tangy"]
  },
  {
    id: 206,
    name: "Sulaimani Pot Tea (4 Person)",
    category: "black-teas",
    price: "₹59",
    description: "Malabar classic digestive black tea pot serving 4 people.",
    popular: true,
    image: "https://images.unsplash.com/photo-1571934811356-5cc061b6821f?auto=format&fit=crop&w=600&q=80",
    tags: ["Sulaimani Pot", "Group Serving"]
  },
  {
    id: 207,
    name: "Ginger Tea",
    category: "black-teas",
    price: "₹25",
    description: "Zesty black tea with crushed ginger root.",
    popular: true,
    image: "https://images.unsplash.com/photo-1561336313-0bd5e0b27ec8?auto=format&fit=crop&w=600&q=80",
    tags: ["Ginger"]
  },
  {
    id: 208,
    name: "Cinnamon Tea",
    category: "black-teas",
    price: "₹30",
    description: "Warm cinnamon bark infused black tea.",
    popular: false,
    image: "https://images.unsplash.com/photo-1571934811356-5cc061b6821f?auto=format&fit=crop&w=600&q=80",
    tags: ["Spiced"]
  },
  {
    id: 209,
    name: "Cardamom Tea",
    category: "black-teas",
    price: "₹40",
    description: "Elaichi black tea without milk.",
    popular: false,
    image: "https://images.unsplash.com/photo-1597481499750-3e6b22637e12?auto=format&fit=crop&w=600&q=80",
    tags: ["Elaichi Black"]
  },
  {
    id: 210,
    name: "Rose Tea-",
    category: "black-teas",
    price: "₹30",
    description: "Aromatic rose black tea.",
    popular: false,
    image: "https://images.unsplash.com/photo-1556679343-c7306c1976bc?auto=format&fit=crop&w=600&q=80",
    tags: ["Rose"]
  },
  {
    id: 211,
    name: "Assam Tea",
    category: "black-teas",
    price: "₹25",
    description: "Pure Assam black leaf tea.",
    popular: false,
    image: "https://images.unsplash.com/photo-1571934811356-5cc061b6821f?auto=format&fit=crop&w=600&q=80",
    tags: ["Assam"]
  },
  {
    id: 212,
    name: "Munthiri Kattan",
    category: "black-teas",
    price: "₹40",
    description: "Raisin infused Kerala special black tea.",
    popular: true,
    image: "https://images.unsplash.com/photo-1571934811356-5cc061b6821f?auto=format&fit=crop&w=600&q=80",
    tags: ["Kerala Special"]
  },

  // BURGERS
  {
    id: 901,
    name: "TeaTalk Kiddy Burger",
    category: "burgers",
    price: "₹49",
    description: "Perfect single patty burger for quick bites.",
    popular: true,
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=600&q=80",
    tags: ["Value Pick", "Kiddy Burger"]
  },
  {
    id: 902,
    name: "Zinger Burger",
    category: "burgers",
    price: "₹110",
    description: "Crispy fried chicken fillet burger with lettuce & mayo.",
    popular: true,
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=600&q=80",
    tags: ["Zinger", "Crispy"]
  },
  {
    id: 903,
    name: "Thai Chicken Burger",
    category: "burgers",
    price: "₹120",
    description: "Zesty Thai spiced chicken burger with house special sauce.",
    popular: false,
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=600&q=80",
    tags: ["Thai Spiced"]
  },
  {
    id: 904,
    name: "Zinger cheesy burgur",
    category: "burgers",
    price: "₹130",
    description: "Extra cheesy Zinger chicken burger.",
    popular: true,
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=600&q=80",
    tags: ["Cheesy Zinger"]
  },
  {
    id: 905,
    name: "Signature Beast (Chicken)",
    category: "burgers",
    price: "₹239",
    description: "Grilled chicken patty, cheese, fried egg, crispy chips, pickled vegetables.",
    popular: true,
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=600&q=80",
    tags: ["Signature Beast", "Chicken Monster"]
  },
  {
    id: 906,
    name: "Signature Beast (Beef)",
    category: "burgers",
    price: "₹259",
    description: "Grilled beef patty, cheese, fried egg, crispy chips, pickled vegetables.",
    popular: true,
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=600&q=80",
    tags: ["Signature Beast", "Beef Monster"]
  },

  // SANDWICHES
  {
    id: 1001,
    name: "Veg Sandwich",
    category: "sandwiches",
    price: "₹75",
    description: "Fresh garden vegetable grilled sandwich.",
    popular: false,
    image: "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&w=600&q=80",
    tags: ["Veg"]
  },
  {
    id: 1002,
    name: "Chicken Sandwich",
    category: "sandwiches",
    price: "₹89",
    description: "Spiced chicken filling sandwiched in toasted bread.",
    popular: true,
    image: "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&w=600&q=80",
    tags: ["Chicken"]
  },
  {
    id: 1003,
    name: "Zinger Club Sandwich",
    category: "sandwiches",
    price: "₹165",
    description: "Triple decker club sandwich packed with crispy zinger chicken & cheese.",
    popular: true,
    image: "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&w=600&q=80",
    tags: ["Zinger Club", "Best Seller"]
  },
  {
    id: 1004,
    name: "Veg Club Sandwich",
    category: "sandwiches",
    price: "₹129",
    description: "Loaded double layered vegetable & cheese club sandwich.",
    popular: false,
    image: "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&w=600&q=80",
    tags: ["Veg Club"]
  },

  // ROLLS & WRAPS
  {
    id: 1101,
    name: "Omelette Roll",
    category: "rolls-wraps",
    price: "₹80",
    description: "Fluffy egg omelette wrapped in soft kathi roll.",
    popular: false,
    image: "https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=600&q=80",
    tags: ["Egg Roll"]
  },
  {
    id: 1102,
    name: "Grill Chicken Roll",
    category: "rolls-wraps",
    price: "₹140",
    description: "Char-grilled chicken wrap with garlic mayo & salad.",
    popular: true,
    image: "https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=600&q=80",
    tags: ["Grill Chicken"]
  },
  {
    id: 1103,
    name: "Crispy TT Shawarma Roll",
    category: "rolls-wraps",
    price: "₹140",
    description: "Tea Talk special crispy chicken shawarma roll.",
    popular: true,
    image: "https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=600&q=80",
    tags: ["TT Shawarma"]
  },
  {
    id: 1104,
    name: "Zinger Shawarma Roll",
    category: "rolls-wraps",
    price: "₹130",
    description: "Spicy crispy Zinger fried chicken shawarma wrap.",
    popular: true,
    image: "https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=600&q=80",
    tags: ["Zinger Shawarma"]
  },

  // MOMOS
  {
    id: 1201,
    name: "Chicken Momos",
    category: "momos",
    price: "₹110",
    description: "Steamed chicken dumplings served with spicy chutney.",
    popular: true,
    image: "https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&w=600&q=80",
    tags: ["Steamed Momos"]
  },
  {
    id: 1202,
    name: "Dynamite Momos",
    category: "momos",
    price: "₹130",
    description: "Crispy fried momos tossed in creamy spicy dynamite sauce.",
    popular: true,
    image: "https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&w=600&q=80",
    tags: ["Dynamite"]
  },
  {
    id: 1203,
    name: "Schezwan Momos",
    category: "momos",
    price: "₹130",
    description: "Momos tossed in hot fiery Schezwan chili paste.",
    popular: false,
    image: "https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&w=600&q=80",
    tags: ["Spicy Schezwan"]
  },

  // LOADED FRIES
  {
    id: 1301,
    name: "Chicken Loaded Fries",
    category: "loaded-fries",
    price: "₹170",
    description: "Golden fries topped with shredded chicken, cheese & sauces.",
    popular: true,
    image: "https://images.unsplash.com/photo-1576107232684-1279f390859f?auto=format&fit=crop&w=600&q=80",
    tags: ["Chicken Loaded"]
  },
  {
    id: 1302,
    name: "Spicy Loaded Fries",
    category: "loaded-fries",
    price: "₹190",
    description: "Extra spicy jalapeño & melted cheese loaded fries.",
    popular: true,
    image: "https://images.unsplash.com/photo-1576107232684-1279f390859f?auto=format&fit=crop&w=600&q=80",
    tags: ["Spicy Cheese"]
  },

  // BUNNIES
  {
    id: 1401,
    name: "Bun with Grill Chicken",
    category: "bunnies",
    price: "₹69",
    description: "Soft buttered bun stuffed with savory grilled chicken.",
    popular: true,
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=600&q=80",
    tags: ["Grill Chicken Bun"]
  },
  {
    id: 1402,
    name: "Bun with Loaded Fries",
    category: "bunnies",
    price: "₹69",
    description: "Soft bun stuffed with cheesy loaded fries.",
    popular: false,
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=600&q=80",
    tags: ["Fries Bun"]
  },
  {
    id: 1403,
    name: "Bun with Nuggets",
    category: "bunnies",
    price: "₹69",
    description: "Soft bun stuffed with crispy chicken nuggets & mayo.",
    popular: true,
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=600&q=80",
    tags: ["Nugget Bun"]
  },

  // SALADS
  {
    id: 1501,
    name: "Russian Veg Salad",
    category: "salads",
    price: "₹159",
    description: "Classic creamy diced vegetable Russian salad.",
    popular: false,
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=600&q=80",
    tags: ["Veg Salad"]
  },
  {
    id: 1502,
    name: "Russian Chicken Salad",
    category: "salads",
    price: "₹179",
    description: "Creamy Russian salad mixed with tender chicken pieces.",
    popular: true,
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=600&q=80",
    tags: ["Chicken Salad"]
  },
  {
    id: 1503,
    name: "Greek Yogurt Salad",
    category: "salads",
    price: "₹149",
    description: "Fresh cucumber, tomato, olives tossed in Greek yogurt dressing.",
    popular: true,
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=600&q=80",
    tags: ["Healthy Greek"]
  },

  // COMBOS
  {
    id: 1601,
    name: "Starter Plater + Pot Sulaimani",
    category: "combos",
    price: "₹299",
    description: "Assorted starter platter paired with 4-person Pot Sulaimani tea.",
    popular: true,
    image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=600&q=80",
    tags: ["Starter Combo"]
  },
  {
    id: 1602,
    name: "Plater Box",
    category: "combos",
    price: "₹499",
    description: "2 Club Sandwiches + Starter Platter + 4 Teas.",
    popular: true,
    image: "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&w=600&q=80",
    tags: ["Platter Box", "Family Combo"]
  },
  {
    id: 1603,
    name: "Samosa or Cutlet Combo",
    category: "combos",
    price: "₹115",
    description: "Choice of Samosas or Cutlets paired with hot special tea.",
    popular: true,
    image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=600&q=80",
    tags: ["Snack Combo"]
  },
  {
    id: 1604,
    name: "Rolls Combo",
    category: "combos",
    price: "₹299",
    description: "Any 1 Roll + French Fries + 2 Fresh Juices.",
    popular: true,
    image: "https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=600&q=80",
    tags: ["Rolls Combo"]
  },
  {
    id: 1605,
    name: "The Ultimate Combo",
    category: "combos",
    price: "₹499",
    description: "1 Zinger Club + 1 Loaded Fries + 2 Kiddy Burgers + 3 Lime Drinks.",
    popular: true,
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=600&q=80",
    tags: ["Ultimate Feast"]
  },

  // COFFEES & HOTS
  {
    id: 301,
    name: "Boost",
    category: "coffees-hots",
    price: "₹30",
    description: "Hot malted chocolate drink.",
    popular: true,
    image: "https://images.unsplash.com/photo-1544787219-7f47ccb76574?auto=format&fit=crop&w=600&q=80",
    tags: ["Hot Malt"]
  },
  {
    id: 302,
    name: "Horlicks",
    category: "coffees-hots",
    price: "₹30",
    description: "Classic hot Horlicks milk beverage.",
    popular: false,
    image: "https://images.unsplash.com/photo-1544787219-7f47ccb76574?auto=format&fit=crop&w=600&q=80",
    tags: ["Classic Malt"]
  },
  {
    id: 303,
    name: "Classic Coffee",
    category: "coffees-hots",
    price: "₹30",
    description: "Rich South Indian style hot filter coffee.",
    popular: true,
    image: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=600&q=80",
    tags: ["Coffee"]
  },
  {
    id: 304,
    name: "Hot Chocolate",
    category: "coffees-hots",
    price: "₹50",
    description: "Creamy Belgian style hot chocolate.",
    popular: true,
    image: "https://images.unsplash.com/photo-1542990253-0d0f5be5f0ed?auto=format&fit=crop&w=600&q=80",
    tags: ["Indulgent"]
  },

  // FRESH JUICES
  {
    id: 401,
    name: "Fresh Lime",
    category: "fresh-juices",
    price: "₹30",
    description: "Freshly squeezed sweet or salted lime juice.",
    popular: true,
    image: "https://images.unsplash.com/photo-1621263764928-df1444c5e859?auto=format&fit=crop&w=600&q=80",
    tags: ["Lime"]
  },
  {
    id: 402,
    name: "Pineapple Lime",
    category: "fresh-juices",
    price: "₹35",
    description: "Fresh pineapple juice infused with lime twist.",
    popular: false,
    image: "https://images.unsplash.com/photo-1589733955941-5eeaf752f6dd?auto=format&fit=crop&w=600&q=80",
    tags: ["Tropical Lime"]
  },
  {
    id: 403,
    name: "Mint Lime",
    category: "fresh-juices",
    price: "₹35",
    description: "Crushed mint with fresh lemon press.",
    popular: true,
    image: "https://images.unsplash.com/photo-1621263764928-df1444c5e859?auto=format&fit=crop&w=600&q=80",
    tags: ["Refreshing"]
  },
  {
    id: 404,
    name: "Grape Lime",
    category: "fresh-juices",
    price: "₹35",
    description: "Black grape juice with lime accent.",
    popular: false,
    image: "https://images.unsplash.com/photo-1589733955941-5eeaf752f6dd?auto=format&fit=crop&w=600&q=80",
    tags: ["Grape Lime"]
  },
  {
    id: 405,
    name: "Pineapple Juice",
    category: "fresh-juices",
    price: "₹70",
    description: "100% natural cold pressed fresh pineapple juice.",
    popular: false,
    image: "https://images.unsplash.com/photo-1589733955941-5eeaf752f6dd?auto=format&fit=crop&w=600&q=80",
    tags: ["100% Natural"]
  },
  {
    id: 406,
    name: "Watermelon Juice",
    category: "fresh-juices",
    price: "₹70",
    description: "Chilled fresh watermelon juice.",
    popular: true,
    image: "https://images.unsplash.com/photo-1589733955941-5eeaf752f6dd?auto=format&fit=crop&w=600&q=80",
    tags: ["Hydrating"]
  },
  {
    id: 407,
    name: "Orange Juice",
    category: "fresh-juices",
    price: "₹70",
    description: "Freshly squeezed Florida oranges.",
    popular: false,
    image: "https://images.unsplash.com/photo-1621263764928-df1444c5e859?auto=format&fit=crop&w=600&q=80",
    tags: ["Vitamin C"]
  },
  {
    id: 408,
    name: "Grape Juice",
    category: "fresh-juices",
    price: "₹70",
    description: "Fresh crushed black grape juice.",
    popular: false,
    image: "https://images.unsplash.com/photo-1589733955941-5eeaf752f6dd?auto=format&fit=crop&w=600&q=80",
    tags: ["Grape"]
  },

  // SHAKES
  {
    id: 501,
    name: "Chikoo Shake",
    category: "shakes",
    price: "₹85",
    description: "Fresh sapota pulp blended into thick milk shake.",
    popular: false,
    image: "https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=600&q=80",
    tags: ["Chikoo"]
  },
  {
    id: 502,
    name: "Oreo Shake",
    category: "shakes",
    price: "₹85",
    description: "Crushed Oreo cookie thick milk shake.",
    popular: true,
    image: "https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=600&q=80",
    tags: ["Oreo", "Best Seller"]
  },
  {
    id: 503,
    name: "Kitkat Shake",
    category: "shakes",
    price: "₹85",
    description: "Crunchy Kitkat chocolate bar shake.",
    popular: true,
    image: "https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=600&q=80",
    tags: ["Kitkat"]
  },
  {
    id: 504,
    name: "Strawberry Shake",
    category: "shakes",
    price: "₹85",
    description: "Creamy fresh strawberry milk shake.",
    popular: false,
    image: "https://images.unsplash.com/photo-1553787499-6f9133860278?auto=format&fit=crop&w=600&q=80",
    tags: ["Strawberry"]
  },
  {
    id: 505,
    name: "Cold Coffee",
    category: "shakes",
    price: "₹85",
    description: "Chilled blended espresso with ice cream.",
    popular: true,
    image: "https://images.unsplash.com/photo-1517701604599-bb29b565090c?auto=format&fit=crop&w=600&q=80",
    tags: ["Cold Coffee"]
  },
  {
    id: 506,
    name: "Mango Shake",
    category: "shakes",
    price: "₹85",
    description: "Alphonso mango pulp blended shake.",
    popular: false,
    image: "https://images.unsplash.com/photo-1553787499-6f9133860278?auto=format&fit=crop&w=600&q=80",
    tags: ["Mango"]
  },
  {
    id: 507,
    name: "Avocado Shake",
    category: "shakes",
    price: "₹85",
    description: "Creamy butterfruit avocado shake.",
    popular: true,
    image: "https://images.unsplash.com/photo-1553787499-6f9133860278?auto=format&fit=crop&w=600&q=80",
    tags: ["Nutritious"]
  },
  {
    id: 508,
    name: "Tender Shake",
    category: "shakes",
    price: "₹85",
    description: "Fresh coastal tender coconut pulp shake.",
    popular: true,
    image: "https://images.unsplash.com/photo-1553787499-6f9133860278?auto=format&fit=crop&w=600&q=80",
    tags: ["Kerala Special"]
  },
  {
    id: 509,
    name: "Chocolate Shake",
    category: "shakes",
    price: "₹90",
    description: "Rich dark cocoa thick shake.",
    popular: false,
    image: "https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=600&q=80",
    tags: ["Chocolate"]
  },

  // MOJITOS
  {
    id: 601,
    name: "Mint Mojito",
    category: "mojitos",
    price: "₹89",
    description: "Classic muddled mint, lime, and fizzy soda.",
    popular: true,
    image: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=600&q=80",
    tags: ["Mint"]
  },
  {
    id: 602,
    name: "Passion Fruit Mojito",
    category: "mojitos",
    price: "₹89",
    description: "Tangy fresh passion fruit puree with mint & sparkling soda.",
    popular: true,
    image: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=600&q=80",
    tags: ["Best Seller"]
  },
  {
    id: 603,
    name: "Green Apple Mojito",
    category: "mojitos",
    price: "₹89",
    description: "Crisp green apple syrup with fresh lime press.",
    popular: false,
    image: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=600&q=80",
    tags: ["Green Apple"]
  },
  {
    id: 604,
    name: "Blue Caraco Mojito",
    category: "mojitos",
    price: "₹89",
    description: "Vibrant blue citrus sparkling cooler.",
    popular: true,
    image: "https://images.unsplash.com/photo-1536935338788-846bb9981813?auto=format&fit=crop&w=600&q=80",
    tags: ["Blue Curacao"]
  },

  // FALOODAS & DESSERTS
  {
    id: 701,
    name: "Fruit Salad",
    category: "faloodas-desserts",
    price: "₹80",
    description: "Fresh diced seasonal fruits with ice cream scoop.",
    popular: false,
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=600&q=80",
    tags: ["Fruit Salad"]
  },
  {
    id: 702,
    name: "Regular Falooda",
    category: "faloodas-desserts",
    price: "₹130",
    description: "Layered rose syrup, vermicelli, basil seeds, and ice cream.",
    popular: true,
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=600&q=80",
    tags: ["Falooda"]
  },
  {
    id: 703,
    name: "Royal Falooda",
    category: "faloodas-desserts",
    price: "₹155",
    description: "Loaded royal falooda with dry fruits, nuts, jelly, and double ice cream.",
    popular: true,
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=600&q=80",
    tags: ["Royal Special"]
  },

  // STARTERS
  {
    id: 801,
    name: "Cutlet with Fries",
    category: "starters",
    price: "₹85",
    description: "Crispy fried cutlet served with golden French fries.",
    popular: true,
    image: "https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=600&q=80",
    tags: ["Cutlet & Fries"]
  },
  {
    id: 802,
    name: "Samosa with Fries",
    category: "starters",
    price: "₹85",
    description: "Spiced potato samosas served with crispy French fries.",
    popular: true,
    image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=600&q=80",
    tags: ["Samosa & Fries"]
  },
  {
    id: 803,
    name: "French Fries",
    category: "starters",
    price: "₹90",
    description: "Classic salted crispy French fries.",
    popular: false,
    image: "https://images.unsplash.com/photo-1576107232684-1279f390859f?auto=format&fit=crop&w=600&q=80",
    tags: ["Fries"]
  },
  {
    id: 804,
    name: "Peri Peri Fries",
    category: "starters",
    price: "₹110",
    description: "Spicy Peri Peri seasoned crispy fries.",
    popular: true,
    image: "https://images.unsplash.com/photo-1576107232684-1279f390859f?auto=format&fit=crop&w=600&q=80",
    tags: ["Spicy Peri Peri"]
  },
  {
    id: 805,
    name: "Chicken Nuggets",
    category: "starters",
    price: "₹110",
    description: "Crispy fried golden chicken nuggets.",
    popular: true,
    image: "https://images.unsplash.com/photo-1562967914-608f82629710?auto=format&fit=crop&w=600&q=80",
    tags: ["Chicken Nuggets"]
  },
  {
    id: 806,
    name: "Chicken Popcorn",
    category: "starters",
    price: "₹120",
    description: "Bite-sized crunchy chicken popcorn pieces.",
    popular: true,
    image: "https://images.unsplash.com/photo-1562967914-608f82629710?auto=format&fit=crop&w=600&q=80",
    tags: ["Popcorn"]
  },
  {
    id: 807,
    name: "Chicken Strips",
    category: "starters",
    price: "₹140",
    description: "Crispy seasoned fried chicken strips.",
    popular: false,
    image: "https://images.unsplash.com/photo-1562967914-608f82629710?auto=format&fit=crop&w=600&q=80",
    tags: ["Chicken Strips"]
  },
  {
    id: 808,
    name: "Chicken Stick with Fries",
    category: "starters",
    price: "₹120",
    description: "Skewered chicken sticks served with French fries.",
    popular: false,
    image: "https://images.unsplash.com/photo-1562967914-608f82629710?auto=format&fit=crop&w=600&q=80",
    tags: ["Chicken Stick"]
  },
  {
    id: 809,
    name: "Fish Ball with Fries",
    category: "starters",
    price: "₹120",
    description: "Crispy fried fish balls with French fries.",
    popular: false,
    image: "https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=600&q=80",
    tags: ["Fish Ball"]
  },
  {
    id: 810,
    name: "Chicken Cheese Pocket with Fries",
    category: "starters",
    price: "₹120",
    description: "Melted cheese & chicken pockets with fries.",
    popular: true,
    image: "https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=600&q=80",
    tags: ["Cheesy"]
  }
];
