import {
  IonButton,
  IonContent,
  IonHeader,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
  IonTitle,
  IonToggle,
  IonToolbar,
} from "@ionic/react";
import { useHistory } from "react-router";
import { auth } from "../../providers/FirebaseProviders/FirebaseSetup";

import "./Settings.css";

const Settings: React.FC = () => {
  const history = useHistory();
  const handleLogout = async () => {
    try {
      await auth.signOut();
      history.push("/login");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Settings</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonButton expand="block" onClick={handleLogout}>
          Logout
        </IonButton>
      </IonContent>
    </IonPage>
  );
};

export default Settings;
