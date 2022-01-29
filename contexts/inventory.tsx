import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { nanoid } from "nanoid/non-secure";

import { Items, InventoryItem } from "../types";

interface ProviderProps {
  children: ReactNode;
}

interface InventoryContext {
  inventory: Items;
  maxValue: number;
  addNewItem: (item: InventoryItem) => void;
}

const MAX_TOTAL_VALUE = 40000;

const InventoryContext = createContext<any>(undefined);

// AsyncStorage.clear()

const InventoryProvider = ({ children }: ProviderProps) => {
  const [inventory, setInventory] = useState<Items>([]);
  const [maxValue, setmaxValue] = useState<number | null>(MAX_TOTAL_VALUE);

  useEffect(() => {
    getInventory();
  }, []);

  useEffect(() => {
    if (inventory.length > 0) {
      const currentTotalValue = inventory.reduce(
        (total, item) => total + (item.value as number),
        0
      );
      const newMaxValue = MAX_TOTAL_VALUE - currentTotalValue;
      setmaxValue(newMaxValue);
    }
  }, [inventory]);

  const getInventory = async () => {
    const jsonValue = await AsyncStorage.getItem("@inventory");
    setInventory(jsonValue != null ? JSON.parse(jsonValue) : []);
  };

  const addNewItem = (item: InventoryItem) => {
    item.id = nanoid();
    const newInventory = [...inventory, item];
    // optimistic update
    setInventory(newInventory);
    AsyncStorage.setItem("@inventory", JSON.stringify(newInventory));
  };

  const value = {
    inventory,
    maxValue,
    addNewItem,
  };

  return (
    <InventoryContext.Provider value={value}>
      {children}
    </InventoryContext.Provider>
  );
};

const useInventory = () => {
  const context = useContext(InventoryContext);

  if (context === undefined) {
    throw new Error("InventoryContext was used outside of its Provider");
  }

  return context as InventoryContext;
};

export { InventoryProvider, useInventory };
