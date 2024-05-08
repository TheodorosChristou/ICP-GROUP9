import Heading from "@/components/Heading";
import Header from "../components/Header";
import "../styles/globals.css";
import { QueryClient, QueryClientProvider} from "react-query"
import { SessionProvider } from "next-auth/react"
import { useEffect } from 'react';
import GoogleAnalytics from "@/components/GoogleAnalytics";
import ConsentPopup from '../components/CookieConsent'
//import WeatherPage from '../pages/weatherpage'
import { Workbox } from "workbox-window";

const queryClient = new QueryClient();

function MyApp({Component, pageProps: {session, ...pageProps}}) {
  useEffect(() => {
    if ("serviceWorker" in navigator) {
      const wb = new Workbox("sw.js");
      console.log(wb)
      wb.addEventListener("waiting", (event) => {
        wb.addEventListener("controlling", (event) => {
          console.log("Reloading page for latest content");
          window.location.reload();
        });
        wb.messageSW({ type: "SKIP_WAITING" });
      });
      wb.register();
    }
  }, []);
  
    return (
      <SessionProvider session={session}>
      <div className="bg-white min-h-screen  pt-[64px] overflow-x-hidden global-bg">

          <Heading></Heading>
          <QueryClientProvider client={queryClient}>
          <Header></Header>
          <GoogleAnalytics GA_MEASUREMENT_ID='G-53VCLCTQVC'/>
          <ConsentPopup />
          <Component {...pageProps} />
          </QueryClientProvider>


      </div>
      </SessionProvider>

      
    );
  }

  export default MyApp