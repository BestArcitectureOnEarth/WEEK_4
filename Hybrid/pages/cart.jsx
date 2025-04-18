import { useState } from "react";

export default function Cart() {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const stored = localStorage.getItem("cart");
    if (stored) {
      setCartItems(JSON.parse(stored));
    }
  }, []);

  return (
    <div>
      <h1>🛒 내 장바구니</h1>
      <ul>
        {cartItems.map((item) => (
          <li key={item.id}>
            {item.name} x {item.qty}
          </li>
        ))}
      </ul>
    </div>
  );
}
