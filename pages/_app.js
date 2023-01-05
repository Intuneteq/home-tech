import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "animate.css";

import Layout from "../components/Layout";
import { AppProvider } from "../contexts/AppProvider";
import "../styles/globals.scss";

export default function App({ Component, pageProps }) {
  return (
    <AppProvider>
      <Layout>
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
        <Component {...pageProps} />
        <ToastContainer />
      </Layout>
    </AppProvider>
  );
}
