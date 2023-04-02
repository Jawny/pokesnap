import { useContext } from "react";
import {
  BrowserRouter,
  Redirect,
  Route,
  Router,
  useHistory,
} from "react-router-dom";
import { createBrowserHistory } from "history";
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
import { book, camera, square } from "ionicons/icons";
import { Pokedex, Camera, Tab3, Login, SignUp } from "./pages";
import { AuthProvider, AuthContext, PokemonDataProvider } from "./providers";

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
  const user = useContext(AuthContext);
  console.log(user);

  return (
    <AuthProvider>
      <PokemonDataProvider>
        <IonApp>
          <BrowserRouter>
            {user ? (
              <IonTabs>
                <IonRouterOutlet>
                  <Route exact path="/pokedex">
                    <Pokedex />
                  </Route>
                  <Route exact path="/camera" component={Camera} />
                  <Route path="/tab3" component={Tab3} />
                  <Redirect to="/pokedex" />
                </IonRouterOutlet>
                <IonTabBar slot="bottom">
                  <IonTabButton tab="pokedex" href="/pokedex">
                    <IonIcon icon={book} />
                    <IonLabel>Pokedex</IonLabel>
                  </IonTabButton>
                  <IonTabButton tab="camera" href="/camera">
                    <IonIcon icon={camera} />
                    <IonLabel>Camera</IonLabel>
                  </IonTabButton>
                  <IonTabButton tab="tab3" href="/tab3">
                    <IonIcon icon={square} />
                    <IonLabel>Tab 3</IonLabel>
                  </IonTabButton>
                </IonTabBar>
              </IonTabs>
            ) : (
              <>
                <Route exact path="/login" component={Login} />
                <Route exact path="/signup" component={SignUp} />
                <Redirect to="/login" />
              </>
            )}
          </BrowserRouter>
        </IonApp>
      </PokemonDataProvider>
    </AuthProvider>
  );
};

export default App;
