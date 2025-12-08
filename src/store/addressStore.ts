import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface Address {
  id: string;
  fullName: string;
  phoneNumber: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  pinCode: string;
  country: string;
  addressType: 'Home' | 'Office' | 'Other';
  isDefault?: boolean;
}

interface AddressStore {
  addresses: Address[];
  selectedAddressId: string | null;
  
  // Actions
  addAddress: (address: Omit<Address, 'id'>) => void;
  updateAddress: (id: string, address: Partial<Address>) => void;
  deleteAddress: (id: string) => void;
  selectAddress: (id: string) => void;
  setDefaultAddress: (id: string) => void;
  getSelectedAddress: () => Address | null;
}

export const useAddressStore = create<AddressStore>()(
  persist(
    (set, get) => ({
      addresses: [],
      selectedAddressId: null,

      addAddress: (address) => {
        const newAddress: Address = {
          ...address,
          id: `addr_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        };

        // If this is the first address or marked as default, set it as default
        const isFirstAddress = get().addresses.length === 0;
        if (isFirstAddress || address.isDefault) {
          newAddress.isDefault = true;
          set((state) => ({
            addresses: [
              newAddress,
              ...state.addresses.map((addr) => ({ ...addr, isDefault: false })),
            ],
            selectedAddressId: newAddress.id,
          }));
        } else {
          set((state) => ({
            addresses: [...state.addresses, newAddress],
          }));
        }
      },

      updateAddress: (id, updatedFields) => {
        set((state) => ({
          addresses: state.addresses.map((addr) =>
            addr.id === id ? { ...addr, ...updatedFields } : addr
          ),
        }));
      },

      deleteAddress: (id) => {
        set((state) => {
          const newAddresses = state.addresses.filter((addr) => addr.id !== id);
          const newSelectedId = state.selectedAddressId === id ? null : state.selectedAddressId;
          
          // If deleted address was default and there are other addresses, make the first one default
          if (state.addresses.find(a => a.id === id)?.isDefault && newAddresses.length > 0) {
            newAddresses[0].isDefault = true;
          }

          return {
            addresses: newAddresses,
            selectedAddressId: newSelectedId,
          };
        });
      },

      selectAddress: (id) => {
        set({ selectedAddressId: id });
      },

      setDefaultAddress: (id) => {
        set((state) => ({
          addresses: state.addresses.map((addr) => ({
            ...addr,
            isDefault: addr.id === id,
          })),
        }));
      },

      getSelectedAddress: () => {
        const { addresses, selectedAddressId } = get();
        return addresses.find((addr) => addr.id === selectedAddressId) || null;
      },
    }),
    {
      name: 'address-storage',
    }
  )
);
