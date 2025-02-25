import type { Metadata } from "next";
import "./globals.css";
import localFont from 'next/font/local'
import { Nav } from "./_lib/theme";


const inter =
    localFont({
        src: [
            { path: './fonts/LamaSans-Black.ttf', weight: '900', style: 'normal', },
            { path: './fonts/LamaSans-Bold.ttf', weight: '700', style: 'normal', },
            { path: './fonts/LamaSans-ExtraBold.ttf', weight: '800', style: 'normal', },
            { path: './fonts/LamaSans-ExtraLight.ttf', weight: '200', style: 'normal', },
            { path: './fonts/LamaSans-Light.ttf', weight: '300', style: 'normal', },
            { path: './fonts/LamaSans-Medium.ttf', weight: '500', style: 'normal', },
            { path: './fonts/LamaSans-Regular.ttf', weight: '400', style: 'normal', },
            { path: './fonts/LamaSans-SemiBold.ttf', weight: '600', style: 'normal', },
            { path: './fonts/LamaSans-Thin.ttf', weight: '100', style: 'normal', },
        ],
    })

export const metadata: Metadata = {
    title: "Tasks Lead",
    description: "قيادة المهام - هو تطبيق ويب لادارة المهمات باحترافية ",
};

export default function RootLayout({ children, }: Readonly<{ children: React.ReactNode }>) {
    return (
        <html lang="en">
            <body dir="rtl" className={inter.className}>
                <Nav />
                {children}
            </body>
        </html>
    );
}
