import Navbar from "../components/common/Navbar";
import { BookmarkProvider } from "../components/features/BookMarkButton";
import "./globals.css";

export default function RootLayout(props: { children: React.ReactNode }) {
  return (
    <html lang="vi">
      <body>
        <BookmarkProvider>
          <Navbar />
          {props.children}
        </BookmarkProvider>
      </body>
    </html>
  );
}
