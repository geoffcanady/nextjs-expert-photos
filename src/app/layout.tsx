import type { Metadata } from "next";
import localFont from "next/font/local";
import StyledComponentsRegistry from "@/app/lib/registry";
import GlobalStyles from "@/app/styles/GlobalStyles";
import { StepProvider } from "@/app/lib/context/step-context";
import { GlobalProvider } from "@/app/lib/context/global-context";
import { CameraProvider } from "@/app/lib/context/camera-context";
import { HumanProvider } from "@/app/lib/context/human-context";

const avenir = localFont({
  src: [
    {
      path: "./fonts/avenir-400.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "./fonts/avenir-500.woff2",
      weight: "500",
      style: "italic",
    },
    {
      path: "./fonts/avenir-600.woff2",
      weight: "600",
      style: "normal",
    },
    {
      path: "./fonts/avenir-700.woff2",
      weight: "700",
      style: "italic",
    },
  ],
});

export const metadata: Metadata = {
  title: "Intuit Expert Photos",
  description: "Intuit Expert Photos",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={avenir.className}>
        <StyledComponentsRegistry>
          <GlobalStyles />
          <GlobalProvider>
            <StepProvider>
              <CameraProvider>
                <HumanProvider>{children}</HumanProvider>
              </CameraProvider>
            </StepProvider>
          </GlobalProvider>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
