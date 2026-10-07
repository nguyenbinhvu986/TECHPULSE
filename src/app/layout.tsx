import Navbar from "../components/common/Navbar";
import "./globals.css";

export default function RootLayout(props: { children: React.ReactNode }) {
  return (
    <html lang="vi">
      <body>
        <Navbar />
        {props.children}
      </body>
    </html>
  );
}
