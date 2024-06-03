import { Inter } from 'next/font/google';
import './globals.css';
import { Toaster } from 'react-hot-toast';
import Navbar from './(root)/_components/navbar';
import Footer from './(root)/_components/footer';
import AuthContextProvider from './(root)/_components/auth-provider';
import EventsContextProvider from './(root)/_components/events-provider';
import UsersContextProvider from './(root)/_components/users-provider';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
    title: 'EventFinder',
    description: 'EventFinder generated by create next app',
};

export default function RootLayout({ children }) {
    return (
        <AuthContextProvider>
            <EventsContextProvider>
                <UsersContextProvider>
                    <html lang='en'>
                        <body className={inter.className}>
                            <Navbar />
                            <main>
                                <Toaster />
                                {children}
                            </main>
                            <Footer />
                        </body>
                    </html>
                </UsersContextProvider>
            </EventsContextProvider>
        </AuthContextProvider>
    );
}
