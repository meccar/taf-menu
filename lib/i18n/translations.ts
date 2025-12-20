export type Language = "en" | "es" | "fr" | "zh" | "ja";

export interface Translations {
  // Entry Screen
  welcome: string;
  pleaseChoose: string;
  orderFood: string;
  staffLogin: string;

  // Menu Header
  ramenHouse: string;
  table: string;

  // Cart
  viewCart: string;
  yourOrder: string;
  yourCartIsEmpty: string;
  addItemsFromMenu: string;
  each: string;
  total: string;
  totalQuantity: string;
  totalPrice: string;
  items: string;
  placeOrder: string;
  orderPlacedSuccessfully: string;

  // Common
  close: string;
}

export const translations: Record<Language, Translations> = {
  en: {
    welcome: "Welcome!",
    pleaseChoose: "Please choose",
    orderFood: "Order Food",
    staffLogin: "Staff Login",
    ramenHouse: "🍜 Ramen House",
    table: "Table",
    viewCart: "View Cart",
    yourOrder: "Your Order",
    yourCartIsEmpty: "Your cart is empty",
    addItemsFromMenu: "Add items from the menu to get started",
    each: "each",
    total: "total",
    totalQuantity: "Total Quantity",
    totalPrice: "Total Price",
    items: "items",
    placeOrder: "Place Order",
    orderPlacedSuccessfully: "Order placed successfully!",
    close: "Close",
  },
  es: {
    welcome: "¡Bienvenido!",
    pleaseChoose: "Por favor elige",
    orderFood: "Ordenar Comida",
    staffLogin: "Inicio de Sesión del Personal",
    ramenHouse: "🍜 Casa de Ramen",
    table: "Mesa",
    viewCart: "Ver Carrito",
    yourOrder: "Tu Pedido",
    yourCartIsEmpty: "Tu carrito está vacío",
    addItemsFromMenu: "Agrega artículos del menú para comenzar",
    each: "cada",
    total: "total",
    totalQuantity: "Cantidad Total",
    totalPrice: "Precio Total",
    items: "artículos",
    placeOrder: "Realizar Pedido",
    orderPlacedSuccessfully: "¡Pedido realizado con éxito!",
    close: "Cerrar",
  },
  fr: {
    welcome: "Bienvenue!",
    pleaseChoose: "Veuillez choisir",
    orderFood: "Commander de la Nourriture",
    staffLogin: "Connexion du Personnel",
    ramenHouse: "🍜 Maison de Ramen",
    table: "Table",
    viewCart: "Voir le Panier",
    yourOrder: "Votre Commande",
    yourCartIsEmpty: "Votre panier est vide",
    addItemsFromMenu: "Ajoutez des articles du menu pour commencer",
    each: "chaque",
    total: "total",
    totalQuantity: "Quantité Totale",
    totalPrice: "Prix Total",
    items: "articles",
    placeOrder: "Passer la Commande",
    orderPlacedSuccessfully: "Commande passée avec succès!",
    close: "Fermer",
  },
  zh: {
    welcome: "欢迎！",
    pleaseChoose: "请选择",
    orderFood: "点餐",
    staffLogin: "员工登录",
    ramenHouse: "🍜 拉面屋",
    table: "桌子",
    viewCart: "查看购物车",
    yourOrder: "您的订单",
    yourCartIsEmpty: "您的购物车是空的",
    addItemsFromMenu: "从菜单添加商品开始",
    each: "每个",
    total: "总计",
    totalQuantity: "总数量",
    totalPrice: "总价",
    items: "件",
    placeOrder: "下单",
    orderPlacedSuccessfully: "订单提交成功！",
    close: "关闭",
  },
  ja: {
    welcome: "いらっしゃいませ！",
    pleaseChoose: "選択してください",
    orderFood: "注文する",
    staffLogin: "スタッフログイン",
    ramenHouse: "🍜 ラーメン屋",
    table: "テーブル",
    viewCart: "カートを見る",
    yourOrder: "ご注文",
    yourCartIsEmpty: "カートは空です",
    addItemsFromMenu: "メニューから商品を追加してください",
    each: "各",
    total: "合計",
    totalQuantity: "総数量",
    totalPrice: "合計金額",
    items: "点",
    placeOrder: "注文する",
    orderPlacedSuccessfully: "注文が正常に完了しました！",
    close: "閉じる",
  },
};

export const languageNames: Record<Language, string> = {
  en: "English",
  es: "Español",
  fr: "Français",
  zh: "中文",
  ja: "日本語",
};

export const supportedLanguages: Language[] = ["en", "es", "fr", "zh", "ja"];
