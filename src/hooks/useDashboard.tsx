import { useState } from "react";
import { useEffect } from "react";
import { FoodType } from "../types/types";
import { createContext, ReactNode, useContext } from "react";
import api from "../services/api";

interface DashboardCoisaContextData {
  foods: FoodType[];
  editingFood: FoodType;
  editModalOpen: boolean;
  handleAddFood: (addfood: FoodType) => Promise<void>;
  handleDeleteFood: (id: number) => Promise<void>;
  handleUpdateFood: (food: FoodType) => Promise<void>;
  handleEditFood: (food: FoodType) => void;
  toggleEditModal: () => void;
}

interface DashboardProviderProps {
  children: ReactNode;
}

const useDashboardContext = createContext<DashboardCoisaContextData>(
  {} as DashboardCoisaContextData
);

export function DashboardProvider({ children }: DashboardProviderProps) {
  const [foods, setFoods] = useState<FoodType[]>([]);
  const [editingFood, setEditingFood] = useState<FoodType>({} as FoodType);
  const [editModalOpen, setEditModalOpen] = useState(false);

  useEffect(() => {
    async function getFood() {
      api
        .get("/foods")
        .then((response) => setFoods(response.data))
        .catch((error) => {
          console.log(error);
        });
    }

    getFood();
  }, []);

  const handleAddFood = async (food: FoodType): Promise<void> => {
    try {
      const response = await api.post("/foods", {
        ...food,
        available: true,
      });

      setFoods([...foods, response.data]);
    } catch (err) {
      console.log(err);
    }
  };

  const handleUpdateFood = async (food: FoodType): Promise<void> => {
    try {
      const foodUpdated = await api.put(`/foods/${editingFood.id}`, {
        ...editingFood,
        ...food,
      });

      const foodsUpdated = foods.map((f) =>
        f.id !== foodUpdated.data.id ? f : foodUpdated.data
      );

      setFoods(foodsUpdated);
    } catch (err) {
      console.log(err);
    }
  };

  const handleDeleteFood = async (id: number) => {
    await api.delete(`/foods/${id}`);

    const foodsFiltered = foods.filter((food) => food.id !== id);

    setFoods(foodsFiltered);
  };

  const toggleEditModal = () => {
    setEditModalOpen(!editModalOpen);
  };

  const handleEditFood = (food: FoodType) => {
    setEditModalOpen(true);
    setEditingFood(food);
  };

  return (
    <useDashboardContext.Provider
      value={{
        foods,
        editingFood,
        editModalOpen,
        handleAddFood,
        handleDeleteFood,
        handleUpdateFood,
        handleEditFood,
        toggleEditModal,
      }}
    >
      {children}
    </useDashboardContext.Provider>
  );
}

export function useDashboard() {
  const context = useContext(useDashboardContext);

  return context;
}
