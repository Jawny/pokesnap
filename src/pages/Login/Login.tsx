import React, { useContext, useState } from "react";
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
import { useHistory } from "react-router-dom";
import { auth } from "../../providers/FirebaseProviders/FirebaseSetup";
import { AuthContext } from "../../providers";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { user, setUser } = useContext(AuthContext);
  const history = useHistory();

  const handleLogin = async () => {
    // Handle login logic here
    try {
      const userCredential = await auth.signInWithEmailAndPassword(
        email,
        password
      );
      setUser(userCredential.user);
      history.push("/pokedex");
    } catch (error) {
      console.error(error);
    }
  };

  const handleSignUp = () => {
    history.push("/signup");
    console.log("signup");
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Login</IonTitle>
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
        <IonButton expand="block" onClick={handleLogin}>
          Login
        </IonButton>
        <IonButton expand="block" color="light" onClick={handleSignUp}>
          Sign Up
        </IonButton>
      </IonContent>
    </IonPage>
  );
};
