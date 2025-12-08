import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Address } from './addressStore';

export interface OrderItem {
  id: string | number;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

export interface Order {
  orderId: string;
  items: OrderItem[];
  address: Address;
  paymentMethod: 'COD' | 'ONLINE' | 'EMI';
  subtotal: number;
  savings: number;
  shipping: number;
  total: number;
  status: 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled';
  timestamp: string;
  estimatedDelivery: string;
}

interface OrderStore {
  orders: Order[];
  createOrder: (orderData: Omit<Order, 'status'>) => void;
  getOrderById: (orderId: string) => Order | undefined;
  updateOrderStatus: (orderId: string, status: Order['status']) => void;
  getAllOrders: () => Order[];
}

export const useOrderStore = create<OrderStore>()(
  persist(
    (set, get) => ({
      orders: [],

      createOrder: (orderData) => {
        const newOrder: Order = {
          ...orderData,
          status: 'pending',
        };

        set((state) => ({
          orders: [newOrder, ...state.orders],
        }));
      },

      getOrderById: (orderId) => {
        return get().orders.find((order) => order.orderId === orderId);
      },

      updateOrderStatus: (orderId, status) => {
        set((state) => ({
          orders: state.orders.map((order) =>
            order.orderId === orderId ? { ...order, status } : order
          ),
        }));
      },

      getAllOrders: () => {
        return get().orders;
      },
    }),
    {
      name: 'order-storage',
    }
  )
);
