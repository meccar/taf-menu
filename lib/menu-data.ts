export interface MenuItem {
  name: string;
  description: string;
  price: number;
  image: string;
}

export interface MenuPage {
  pageNumber: number;
  items: MenuItem[];
}

export interface MenuCategory {
  key: string;
  label: string;
  pages: MenuPage[];
}

/**
 * Calculate the active category index from current page index
 */
export function getActiveCategoryIndex(
  pageIndex: number,
  categories: MenuCategory[]
): number {
  if (pageIndex < 0) return 0;

  let pageCount = 0;
  for (let i = 0; i < categories.length; i++) {
    const categoryPageCount = categories[i].pages.length;
    pageCount += categoryPageCount;
    // Check if pageIndex falls within this category's page range
    if (pageIndex < pageCount) {
      return i;
    }
  }
  // If pageIndex is beyond all pages, return last category
  return categories.length > 0 ? categories.length - 1 : 0;
}

/**
 * Get the first page index for a given category
 */
export function getPageIndexForCategory(
  categoryIndex: number,
  categories: MenuCategory[]
): number {
  let pageIndex = 0;
  for (let i = 0; i < categoryIndex; i++) {
    pageIndex += categories[i].pages.length;
  }
  return pageIndex;
}

export const menuCategories: MenuCategory[] = [
  {
    key: "ramen",
    label: "Ramen",
    pages: [
      {
        pageNumber: 1,
        items: [
          {
            name: "Spicy Pork Ramen",
            description: "Rich broth with tender pork",
            price: 12,
            image:
              "https://images.unsplash.com/photo-1552183756-bdca237d0b11?w=400&h=300&fit=crop",
          },
          {
            name: "Shoyu Ramen",
            description: "Classic soy sauce based broth",
            price: 11,
            image:
              "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=400&h=300&fit=crop",
          },
        ],
      },
      {
        pageNumber: 2,
        items: [
          {
            name: "Miso Ramen",
            description: "Savory miso broth",
            price: 11,
            image:
              "https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=400&h=300&fit=crop",
          },
          {
            name: "Shio Ramen",
            description: "Light salt-based broth",
            price: 10,
            image:
              "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=400&h=300&fit=crop",
          },
        ],
      },
      {
        pageNumber: 3,
        items: [
          {
            name: "Tonkotsu Ramen",
            description: "Creamy pork bone broth",
            price: 13,
            image:
              "https://images.unsplash.com/photo-1618977922734-c8949c4cf033?w=400&h=300&fit=crop",
          },
          {
            name: "Vegetarian Ramen",
            description: "Plant-based broth with vegetables",
            price: 10,
            image:
              "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=400&h=300&fit=crop",
          },
        ],
      },
    ],
  },
  {
    key: "rice",
    label: "Rice Bowls",
    pages: [
      {
        pageNumber: 4,
        items: [
          {
            name: "Chicken Teriyaki",
            description: "Grilled chicken with teriyaki glaze",
            price: 9,
            image:
              "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=300&fit=crop",
          },
          {
            name: "Salmon Teriyaki",
            description: "Grilled salmon with teriyaki sauce",
            price: 12,
            image:
              "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=300&fit=crop",
          },
        ],
      },
      {
        pageNumber: 5,
        items: [
          {
            name: "Beef Bowl",
            description: "Tender beef over rice",
            price: 10,
            image:
              "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=300&fit=crop",
          },
          {
            name: "Katsu Curry",
            description: "Breaded cutlet with curry sauce",
            price: 11,
            image:
              "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=300&fit=crop",
          },
        ],
      },
      {
        pageNumber: 6,
        items: [
          {
            name: "Bulgogi Bowl",
            description: "Korean marinated beef",
            price: 11,
            image:
              "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=300&fit=crop",
          },
          {
            name: "Bibimbap",
            description: "Mixed rice with vegetables and egg",
            price: 10,
            image:
              "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=300&fit=crop",
          },
        ],
      },
    ],
  },
  {
    key: "appetizers",
    label: "Appetizers",
    pages: [
      {
        pageNumber: 7,
        items: [
          {
            name: "Edamame",
            description: "Steamed soybeans with salt",
            price: 4,
            image:
              "https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=400&h=300&fit=crop",
          },
          {
            name: "Gyoza",
            description: "Pan-fried pork dumplings",
            price: 6,
            image:
              "https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=400&h=300&fit=crop",
          },
        ],
      },
      {
        pageNumber: 8,
        items: [
          {
            name: "Takoyaki",
            description: "Octopus balls with special sauce",
            price: 7,
            image:
              "https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=400&h=300&fit=crop",
          },
          {
            name: "Agedashi Tofu",
            description: "Deep-fried tofu in dashi broth",
            price: 5,
            image:
              "https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=400&h=300&fit=crop",
          },
        ],
      },
      {
        pageNumber: 9,
        items: [
          {
            name: "Chicken Karaage",
            description: "Japanese fried chicken",
            price: 8,
            image:
              "https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=400&h=300&fit=crop",
          },
          {
            name: "Tempura Platter",
            description: "Assorted vegetables and shrimp",
            price: 9,
            image:
              "https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=400&h=300&fit=crop",
          },
        ],
      },
    ],
  },
  {
    key: "sushi",
    label: "Sushi",
    pages: [
      {
        pageNumber: 10,
        items: [
          {
            name: "Salmon Sashimi",
            description: "Fresh salmon slices",
            price: 12,
            image:
              "https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=400&h=300&fit=crop",
          },
          {
            name: "Tuna Sashimi",
            description: "Fresh tuna slices",
            price: 13,
            image:
              "https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=400&h=300&fit=crop",
          },
        ],
      },
      {
        pageNumber: 11,
        items: [
          {
            name: "California Roll",
            description: "Crab, avocado, cucumber",
            price: 8,
            image:
              "https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=400&h=300&fit=crop",
          },
          {
            name: "Dragon Roll",
            description: "Eel, avocado, cucumber",
            price: 11,
            image:
              "https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=400&h=300&fit=crop",
          },
        ],
      },
      {
        pageNumber: 12,
        items: [
          {
            name: "Spicy Tuna Roll",
            description: "Spicy tuna with cucumber",
            price: 9,
            image:
              "https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=400&h=300&fit=crop",
          },
          {
            name: "Rainbow Roll",
            description: "Assorted fish on California roll",
            price: 12,
            image:
              "https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=400&h=300&fit=crop",
          },
        ],
      },
    ],
  },
  {
    key: "drinks",
    label: "Drinks",
    pages: [
      {
        pageNumber: 13,
        items: [
          {
            name: "Iced Tea",
            description: "Cold & refreshing",
            price: 3,
            image:
              "https://images.unsplash.com/photo-1578148422619-c4797e8dbe14?w=400&h=300&fit=crop",
          },
          {
            name: "Green Tea",
            description: "Hot Japanese green tea",
            price: 2,
            image:
              "https://images.unsplash.com/photo-1578148422619-c4797e8dbe14?w=400&h=300&fit=crop",
          },
        ],
      },
      {
        pageNumber: 14,
        items: [
          {
            name: "Mango Juice",
            description: "Fresh tropical juice",
            price: 4,
            image:
              "https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=400&h=300&fit=crop",
          },
          {
            name: "Lychee Juice",
            description: "Sweet lychee fruit juice",
            price: 4,
            image:
              "https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=400&h=300&fit=crop",
          },
        ],
      },
      {
        pageNumber: 15,
        items: [
          {
            name: "Sake",
            description: "Japanese rice wine",
            price: 8,
            image:
              "https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=400&h=300&fit=crop",
          },
          {
            name: "Beer",
            description: "Japanese draft beer",
            price: 5,
            image:
              "https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=400&h=300&fit=crop",
          },
        ],
      },
    ],
  },
  {
    key: "desserts",
    label: "Desserts",
    pages: [
      {
        pageNumber: 16,
        items: [
          {
            name: "Mochi Ice Cream",
            description: "Ice cream wrapped in mochi",
            price: 5,
            image:
              "https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=400&h=300&fit=crop",
          },
          {
            name: "Matcha Cheesecake",
            description: "Green tea flavored cheesecake",
            price: 6,
            image:
              "https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=400&h=300&fit=crop",
          },
        ],
      },
      {
        pageNumber: 17,
        items: [
          {
            name: "Taiyaki",
            description: "Fish-shaped pastry with filling",
            price: 4,
            image:
              "https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=400&h=300&fit=crop",
          },
          {
            name: "Dorayaki",
            description: "Red bean pancake sandwich",
            price: 4,
            image:
              "https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=400&h=300&fit=crop",
          },
        ],
      },
    ],
  },
];
