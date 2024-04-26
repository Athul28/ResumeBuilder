import Home from "./pages/Home";
import Login from "./components/auth/Login";
import { useRoutes } from "react-router-dom";
import { AuthProvider } from "./contexts/authContext";
import Header from "./components/header";

function App() {
  const routesArray = [
    {
      path: "*",
      element: <Login />,
    },
    {
      path: "/home",
      element: <Home />,
    },
    {
      path: "/login",
      element: <Login />,
    },
  ];
  let routesElement = useRoutes(routesArray);

  return (
    <AuthProvider>
      <Header />
      <div className="w-full h-screen flex flex-col">{routesElement}</div>
    </AuthProvider>
  );
}

export default App;
