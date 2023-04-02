import { useContext } from "react";
import { Redirect, Route } from "react-router-dom";
import { IonReactRouter } from "@ionic/react-router";
import {
  IonApp,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  setupIonicReact,
} from "@ionic/react";
import { book, camera, settings } from "ionicons/icons";
import { Pokedex, Camera, Settings, Login, SignUp } from "./pages";
import { AuthContext, PokemonDataProvider } from "./providers";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

/* Theme variables */
import "./theme/variables.css";

setupIonicReact();

const App: React.FC = () => {
  const { user } = useContext(AuthContext);

  return (
    <PokemonDataProvider>
      <IonApp>
        <IonReactRouter>
          <IonTabs>
            <IonRouterOutlet>
              <Route exact path="/pokedex">
                {user ? <Pokedex /> : <Redirect to="/login" />}
              </Route>
              <Route exact path="/login">
                {user ? <Redirect to="/pokedex" /> : <Login />}
              </Route>
              <Route exact path="/signup">
                {user ? <Redirect to="/pokedex" /> : <SignUp />}
              </Route>
              <Route exact path="/camera">
                {user ? <Camera /> : <Redirect to="/login" />}
              </Route>
              <Route path="/settings">
                {user ? <Settings /> : <Redirect to="/login" />}
              </Route>
              <Redirect to="/pokedex" />
            </IonRouterOutlet>
            <IonTabBar slot="bottom" hidden={user ? false : true}>
              <IonTabButton tab="pokedex" href="/pokedex">
                <IonIcon icon={book} />
                <IonLabel>Pokedex</IonLabel>
              </IonTabButton>
              <IonTabButton tab="camera" href="/camera">
                <IonIcon icon={camera} />
                <IonLabel>Camera</IonLabel>
              </IonTabButton>
              <IonTabButton tab="settings" href="/settings">
                <IonIcon icon={settings} />
                <IonLabel>Settings</IonLabel>
              </IonTabButton>
            </IonTabBar>
          </IonTabs>
        </IonReactRouter>
      </IonApp>
    </PokemonDataProvider>
  );
};

export default App;
