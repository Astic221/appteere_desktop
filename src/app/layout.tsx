
import { Outfit } from "next/font/google";
import "./globals.css";
import { Poppins } from "next/font/google";
import { SidebarProvider } from "@/context/SidebarContext";
import { ThemeProvider } from "@/context/ThemeContext";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { AuthProvider } from "@/context/AuthContext";


const outfit = Outfit({
  variable: "--font-outfit-sans",
  subsets: ["latin"],
});


const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <head>
      <link rel="icon" href="/favicon1.ico" />
      <title>Appteere</title>
      </head>

      <body className={`${poppins.variable} dark:bg-gray-900`}>

        <ThemeProvider>
          <AuthProvider>
          <SidebarProvider>{children}</SidebarProvider>

          <ToastContainer 
              position="bottom-right"
              autoClose={3000}
              hideProgressBar={false}
              newestOnTop
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="light"
            />

         </AuthProvider>

        </ThemeProvider>

        
      </body>
    </html>
  );
}
