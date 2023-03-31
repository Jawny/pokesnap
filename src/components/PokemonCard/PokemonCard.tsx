import { IonCard, IonImg, IonCardTitle, IonCardHeader } from "@ionic/react";
import { useState } from "react";
import { PokemonModal } from "../PokemonModal";
interface PokemonCardProps {
  name: string;
  imageUrl: string;
}

const PokemonCard = ({ name, imageUrl }: PokemonCardProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpenModal = () => {
    setIsOpen(true);
  };

  const handleCloseModal = () => {
    setIsOpen(false);
  };

  return (
    <>
      <IonCard className="card-wrapper" onClick={handleOpenModal}>
        <IonImg src={imageUrl} alt={`Image ${name}`} />
        <IonCardHeader>
          <IonCardTitle>{name}</IonCardTitle>
        </IonCardHeader>
      </IonCard>
      <PokemonModal isOpen={isOpen} onClose={handleCloseModal} name={name} />
    </>
  );
};

export default PokemonCard;
