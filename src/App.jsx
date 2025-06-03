import { BrowserRouter } from "react-router-dom";
import RouterPath from "./routing/RouterPath";
import "./index.css";
import { SidebarProvider } from "./context/SidebarContext";

function App() {
  return (
    <SidebarProvider>
      <BrowserRouter>
        <RouterPath />
      </BrowserRouter>
    </SidebarProvider>
  );
}

export default App;
