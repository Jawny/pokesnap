import React from "react";

interface ISnackBarContext {
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
}
const SnackBarContextInitialState = { visible: false, setVisible: () => {} };

const SnackBarContext = React.createContext<ISnackBarContext>(
  SnackBarContextInitialState
);

export default SnackBarContext;
