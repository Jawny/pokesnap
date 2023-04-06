import {
  IonModal,
  IonContent,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonButton,
  IonList,
  IonListHeader,
  IonLabel,
  IonItem,
  IonImg,
} from "@ionic/react";

type ModalProps = {
  isOpen: boolean;
  imageUrl: string;
  onClose: () => void;
  onDelete: () => void;
};

export const DeleteModal: React.FC<ModalProps> = ({
  isOpen,
  imageUrl,
  onClose,
  onDelete,
}) => {
  return (
    <IonModal isOpen={isOpen}>
      <IonContent>
        <IonHeader>
          <IonToolbar>
            <IonTitle>Delete Image</IonTitle>
            <IonButtons slot="end">
              <IonButton onClick={onClose}>Close</IonButton>
            </IonButtons>
          </IonToolbar>
        </IonHeader>
        <IonList>
          <IonListHeader>
            <IonLabel>Are you sure you want to delete this image?</IonLabel>
          </IonListHeader>
          <IonItem>
            <IonImg src={imageUrl} alt="Selected Image" />
          </IonItem>
        </IonList>
        <IonButton expand="full" color="danger" onClick={onDelete}>
          Delete
        </IonButton>
      </IonContent>
    </IonModal>
  );
};
