import { BrowserRouter, Switch, useRoutes } from "react-router-dom";
import mainRoutes from "./utils/mainRoutes.js";

const App = () => {
  const elements = useRoutes(mainRoutes);

  return (
    <BrowserRouter>
      <Switch>{elements}</Switch>
    </BrowserRouter>
  );
};

export default App;
