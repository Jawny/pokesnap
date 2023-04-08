import { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import {
  IonButton,
  IonContent,
  IonHeader,
  IonInput,
  IonItem,
  IonLabel,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { auth } from "../../providers/FirebaseProviders/FirebaseSetup";
import { AuthContext } from "../../providers";

export const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();
  const { setUser } = useContext(AuthContext);

  const handleSignUp = async () => {
    try {
      console.log(email, password);
      const userCredential = await auth.createUserWithEmailAndPassword(
        email,
        password
      );
      setUser(userCredential.user);
      history.push("/pokedex");
    } catch (error) {
      console.error(error);
    }
  };

  const handleLogin = () => {
    history.push("/login");
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Sign Up</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonItem>
          <IonLabel position="floating">Email</IonLabel>
          <IonInput
            type="email"
            value={email}
            onIonChange={(e) => setEmail(e.detail.value!)}
          />
        </IonItem>
        <IonItem>
          <IonLabel position="floating">Password</IonLabel>
          <IonInput
            type="password"
            value={password}
            onIonChange={(e) => setPassword(e.detail.value!)}
          />
        </IonItem>
        <IonButton expand="block" onClick={handleSignUp}>
          Sign Up
        </IonButton>
        <IonButton expand="block" color="light" onClick={handleLogin}>
          Login
        </IonButton>
      </IonContent>
    </IonPage>
  );
};
