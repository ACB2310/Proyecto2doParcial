import { StatusBar } from "expo-status-bar";
import NavigationStack from "./src/Navigation/NavigationStack";
import { CartProvider } from "./src/context/CartContext";

export default function App() {
  return (
    <CartProvider>
      <NavigationStack />
      <StatusBar style="auto" />
    </CartProvider>
  );
}
