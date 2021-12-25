import { useState } from "react";
import { Header } from "../../components/Header";
import { Food } from "../../components/Food";
import { ModalAddFood } from "../../components/ModalAddFood";
import { ModalEditFood } from "../../components/ModalEditFood";
import { FoodsContainer } from "./styles";
import { useDashboard } from "../../hooks/useDashboard";

export function Dashboard() {
  const { foods } = useDashboard();

  const [modalOpen, setModalOpen] = useState(false);

  const toggleModal = () => {
    setModalOpen(!modalOpen);
  };

  return (
    <>
      <Header openModal={toggleModal} />
      <ModalAddFood isOpen={modalOpen} setIsOpen={toggleModal} />
      <ModalEditFood />

      <FoodsContainer data-testid="foods-list">
        {foods && foods.map((food) => <Food key={food.id} food={food} />)}
      </FoodsContainer>
    </>
  );
}
