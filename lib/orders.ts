import { CartItem, FakeOrder } from "@/types";
import { trackOrder } from "./analytics";

export type PaymentMethod = "cod" | "wallet" | "card";

export interface PendingOrder {
  items: CartItem[];
  restaurantNameEn: string;
  restaurantNameBn: string;
  address: string;
  city: string;
  noteToRider: string;
  contactless: boolean;
  deliveryOption: "standard" | "priority";
  tip: number;
  subtotal: number;
  serviceFee: number;
  priorityFee: number;
  grandTotal: number;
  paymentMethod: PaymentMethod;
  email: string;
  name: string;
  mobile: string;
}

const PENDING_KEY = "ft_pending_order";

export function savePendingOrder(order: PendingOrder) {
  sessionStorage.setItem(PENDING_KEY, JSON.stringify(order));
}

export function getPendingOrder(): PendingOrder | null {
  try {
    const raw = sessionStorage.getItem(PENDING_KEY);
    return raw ? (JSON.parse(raw) as PendingOrder) : null;
  } catch {
    return null;
  }
}

export function clearPendingOrder() {
  sessionStorage.removeItem(PENDING_KEY);
}

export function finalizePendingOrder(clearCart: () => void): FakeOrder | null {
  const pending = getPendingOrder();
  if (!pending) return null;

  const order: FakeOrder = {
    id: `TRT-${Math.floor(Math.random() * 9000 + 1000)}`,
    restaurant_name_en: pending.restaurantNameEn,
    restaurant_name_bn: pending.restaurantNameBn,
    items: pending.items,
    total: pending.grandTotal,
    date: new Date().toISOString(),
    status: "never_arrived",
  };

  const existing = JSON.parse(localStorage.getItem("ft_orders") || "[]");
  localStorage.setItem("ft_orders", JSON.stringify([order, ...existing]));
  localStorage.setItem(
    "ft_last_order",
    JSON.stringify({ ...order, tip: pending.tip, paymentMethod: pending.paymentMethod })
  );

  clearPendingOrder();
  clearCart();

  trackOrder({
    restaurantId: pending.items[0]?.restaurant_id ?? "",
    restaurantName: pending.restaurantNameEn,
    itemCount: pending.items.reduce((sum, i) => sum + i.quantity, 0),
    total: pending.grandTotal,
  });

  return order;
}
