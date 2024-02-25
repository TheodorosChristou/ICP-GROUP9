import Heading from "@/components/Heading";
import Header from "../components/Header";
import "../styles/globals.css";
import { QueryClient, QueryClientProvider} from "react-query"
import { SessionProvider } from "next-auth/react"
import GoogleAnalytics from "@/components/GoogleAnalytics";
import ConsentPopup from '../components/CookieConsent'

const queryClient = new QueryClient();

function MyApp({Component, pageProps: {session, ...pageProps}}) {
    return (
      <SessionProvider session={session}>
      <div className="bg-black min-h-screen  pt-[64px] overflow-x-hidden">

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