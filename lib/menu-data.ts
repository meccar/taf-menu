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
        ],
      },
    ],
  },
  {
    key: "drinks",
    label: "Drinks",
    pages: [
      {
        pageNumber: 6,
        items: [
          {
            name: "Iced Tea",
            description: "Cold & refreshing",
            price: 3,
            image:
              "https://images.unsplash.com/photo-1578148422619-c4797e8dbe14?w=400&h=300&fit=crop",
          },
        ],
      },
      {
        pageNumber: 7,
        items: [
          {
            name: "Mango Juice",
            description: "Fresh tropical juice",
            price: 4,
            image:
              "https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=400&h=300&fit=crop",
          },
        ],
      },
    ],
  },
];
