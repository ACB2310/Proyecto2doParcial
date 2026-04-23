import { StatusBar } from "expo-status-bar";
import NavigationStack from "./src/Navigation/NavigationStack";
import { AuthProvider } from "./src/context/AuthContext";
import { CartProvider } from "./src/context/CartContext";

export default function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <NavigationStack />
        <StatusBar style="auto" />
      </CartProvider>
    </AuthProvider>
  );
}
