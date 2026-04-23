import { StatusBar } from "expo-status-bar";
import NavigationStack from "./src/Navigation/NavigationStack";

export default function App() {
  return (
    <>
      <NavigationStack />
      <StatusBar style="auto" />
    </>
  );
}
