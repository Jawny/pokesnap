import React from "react";
import { SnackBarContext } from "contexts";

interface Props {
  children: React.ReactNode;
}

const SnackBarProvider: React.FC<Props> = ({ children }) => {
  const [visible, setVisible] = React.useState<boolean>(false);
  /**
   * Pass useState functionality to children.
   * Memoized to avoid unnecessary re-rendering.
   * @function
   */
  const providerValue = React.useMemo(
    () => ({ visible, setVisible }),
    [visible, setVisible]
  );

  return (
    <SnackBarContext.Provider value={providerValue}>
      {children}
    </SnackBarContext.Provider>
  );
};

export default SnackBarProvider;
