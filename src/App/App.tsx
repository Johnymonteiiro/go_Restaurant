import { BrowserRouter as Router } from "react-router-dom";
import { DashboardProvider } from "../hooks/useDashboard";

import Routes from "../routes";

import GlobalStyle from "../styles/global";

const App = () => (
  <>
    <DashboardProvider>
      <GlobalStyle />
      <Router>
        <Routes />
      </Router>
    </DashboardProvider>
  </>
);

export default App;
