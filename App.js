import { StatusBar } from "expo-status-bar";
import NavigationStack from "./src/Navigation/NavigationStack";
import { AuthProvider } from "./src/context/AuthContext";
import { CartProvider } from "./src/context/CartContext";
import { OrdersProvider } from "./src/context/OrdersContext";

export default function App() {
  return (
    <AuthProvider>
      <OrdersProvider>
        <CartProvider>
          <NavigationStack />
          <StatusBar style="auto" />
        </CartProvider>
      </OrdersProvider>
    </AuthProvider>
  );
}
