import { Route, Routes } from "react-router-dom";
import "./App.css";
import Layout from "./components/Layout";
import IndexPage from "./pages/IndexPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import { UserContextProvider } from "./userContext/userContext";
import CreateNewUser from "./pages/CreateNewUser";
import CustomerDetailPage from "./pages/CustomerDetailPage";
import EditCustomer from "./pages/EditCustomer";

function App() {
  return (
    <>
      <UserContextProvider>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<IndexPage />} />
            <Route path={"/login"} element={<LoginPage />} />
            <Route path={"/register"} element={<RegisterPage />} />
            <Route path={"/createNewUser"} element={<CreateNewUser />} />
            <Route
              path={"/createNewUser/:id"}
              element={<CustomerDetailPage />}
            />
            <Route path={"/edit/:id"} element={<EditCustomer />} />
          </Route>
        </Routes>
      </UserContextProvider>
    </>
  );
}

export default App;
