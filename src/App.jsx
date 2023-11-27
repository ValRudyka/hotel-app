import { BrowserRouter } from "react-router-dom";
import { Route, Routes } from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Bookings from "./pages/Bookings";
import Account from "./pages/Account";
import Cabins from "./pages/Cabins";
import Settings from "./pages/Settings";
import Users from "./pages/Users";
import NotFound from "./pages/PageNotFound";
import GlobalStyles from "./styles/GlobalStyles";
import AppLayout from "./ui/AppLayout";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";
import Booking from "./pages/Booking";
import CheckIn from "./pages/CheckIn";
import ProtectedRoute from "./ui/ProtectedRoute";
import AuthLayout from "./ui/AuthLayout";
import DarkModeToggle from "./context/DarkModeContext";
import UpdatePasswordForm from "./features/authentication/UpdatePasswordForm";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 0,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <Toaster
        position="top-center"
        reverseOrder={false}
        gutter={12}
        containerStyle={{ margin: "8px" }}
        toastOptions={{
          success: { duration: 3000 },
          error: { duration: 6000 },
          style: {
            fontSize: "16px",
            maxWidth: "600px",
            padding: "16px 24px",
            color: "var(--color-grey-70)",
          },
        }}
      />
      <GlobalStyles />
      <DarkModeToggle>
        <BrowserRouter>
          <Routes>
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <AppLayout />
                </ProtectedRoute>
              }
            >
              <Route element={<Dashboard />} index />
              <Route path="bookings" element={<Bookings />} />
              <Route path="booking/:bookingId" element={<Booking />} />
              <Route path="account" element={<Account />} />
              <Route path="cabins" element={<Cabins />} />
              <Route path="users" element={<Users />} />
              <Route path="settings" element={<Settings />} />
              <Route path="checkin/:bookingId" element={<CheckIn />} />
            </Route>
            <Route
              path="login"
              element={
                <AuthLayout>
                  <Login />
                </AuthLayout>
              }
            />
            <Route path="reset" element={<UpdatePasswordForm />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </DarkModeToggle>
    </QueryClientProvider>
  );
}

export default App;
