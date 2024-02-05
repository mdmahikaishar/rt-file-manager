import { AppProvider } from "../context/AppContext";
import { RefsProvider } from "../context/RefsContext";
import HomePage from "./Home";
import "../styles/tailwind.css";
import "../styles/app.scss";

export default function App() {
  return (
    <AppProvider>
      <RefsProvider>
        <div className="h-screen dark:bg-slate-900 dark:text-white">
          <HomePage />
        </div>
      </RefsProvider>
    </AppProvider>
  );
}
