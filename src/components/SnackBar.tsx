import * as React from "react";
import { StyleSheet } from "react-native";
import { Snackbar } from "react-native-paper";
import { SnackBarContext } from "contexts";

interface ISnackBar {
  label?: string;
  onPress?: (() => void) | (() => void) | undefined;
  text: string;
}

const SnackBar = ({ label = "Close", onPress = () => {}, text }: ISnackBar) => {
  const { visible, setVisible } = React.useContext(SnackBarContext);
  const onDismissSnackBar = () => setVisible(false);

  return (
    <Snackbar
      style={styles.snackbar}
      wrapperStyle={{ top: 0 }}
      visible={visible}
      onDismiss={onDismissSnackBar}
      action={{
        label,
        onPress,
      }}
    >
      {text}
    </Snackbar>
  );
};

const styles = StyleSheet.create({
  snackbar: {
    flexDirection: "row",
    justifyContent: "flex-end",
  },
});

export default SnackBar;
