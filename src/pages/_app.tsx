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
      navigator.serviceWorker.register('sw.js')
      .then(function(registration) {
          console.log("Service Worker Registered", registration);
      })
      .catch(function(err) {
          console.log("Service Worker Failed to Register", err);
      })
    }
  }, []);
  
    return (
      <SessionProvider session={session}>
      <div className="bg-white min-h-screen  pt-[64px] overflow-x-hidden global-bg bg-cover">

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