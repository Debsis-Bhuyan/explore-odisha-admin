import { Navigate, Outlet, Route, Routes, useLocation } from "react-router-dom";
import NavBar from "./components/NavBar";
import SideBar from "./components/SideBar";
import StartPage from "./pages/StartPage";
import OTPVerification from "./pages/OTPVerification";
import Dashboard from "./pages/Dashboard";
import Analytics from "./pages/Analytics";
import Followers from "./pages/Followers";
import Content from "./pages/Content";
import WritePost from "./pages/WritePost";
import ContactForm from "./pages/ContactForm";

import { useStore } from "./store";

const Layout = () => {
  const { user } = useStore((state) => state);
  const location = useLocation();

  return user?.token ? (
    <div className="w-full h-screen">
      <NavBar />
      <div className="w-full h-full flex border-t pt-16">
        <div className="hidden lg:flex ">
          <SideBar />
        </div>
        <div className="w-full flex-1 px-8 py-6 overflow-y-auto">
          <Outlet />
        </div>
      </div>
    </div>
  ) : (
    <Navigate to="/auth" state={{ from: location }} replace />
  );
};
function App() {
  console.log();
  return (
    <div className="w-full min-h-screen">
      <Routes>
        <Route element={<Layout />}>
          <Route index path="/" element={<Navigate to={"/dashboard"} />} />
          <Route path="/dashboard" element={<Dashboard />} />
          {/* <Route path="/analytics" element={<Analytics />} /> */}
          {/* <Route path="/followers" element={<Followers />} /> */}
          <Route path="/contents" element={<Content />} />
          <Route path="/feedback" element={<ContactForm />} />
          <Route path="/write/:postId?" element={<WritePost />} />
        </Route>
        <Route path="/auth" element={<StartPage />} />
        <Route path="/otp-verification" element={<OTPVerification />} />
      </Routes>
    </div>
  );
}

export default App;
