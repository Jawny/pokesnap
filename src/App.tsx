import { useState, useEffect } from "react";
import { Redirect, Route, Router } from "react-router-dom";
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
import { Pokedex, Camera, Tab3 } from "./pages";

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
const history = createBrowserHistory() as any;

const App: React.FC = () => {
  return (
    <IonApp>
      <Router history={history}>
        <IonTabs>
          <IonRouterOutlet>
            <Route exact path="/tab1">
              <Pokedex />
            </Route>
            <Route exact path="/tab2">
              <Camera />
            </Route>
            <Route path="/tab3">
              <Tab3 />
            </Route>
            <Route exact path="/">
              <Redirect to="/tab1" />
            </Route>
          </IonRouterOutlet>
          <IonTabBar slot="bottom">
            <IonTabButton tab="tab1" href="/tab1">
              <IonIcon icon={book} />
              <IonLabel>Pokedex</IonLabel>
            </IonTabButton>
            <IonTabButton
              // onClick={() => {
              //   takePhoto();
              //   console.log(history);
              //   history.push("/tab2");
              // }}
              tab="tab2"
              href="/tab2"
            >
              <IonIcon icon={camera} />
              <IonLabel>Camera</IonLabel>
            </IonTabButton>
            <IonTabButton tab="tab3" href="/tab3">
              <IonIcon icon={square} />
              <IonLabel>Tab 3</IonLabel>
            </IonTabButton>
          </IonTabBar>
        </IonTabs>
      </Router>
    </IonApp>
  );
};

export default App;
