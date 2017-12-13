import React from "react";
import { Provider } from "react-redux";
import { Grid, Row } from "react-bootstrap";

import "bootstrap/dist/css/bootstrap.css";
import "font-awesome/css/font-awesome.min.css";
import "./App.css";

import store from "../../store";
import TabMenu from "../../containers/TabMenu/TabMenu";
import JsonScreen from "../../containers/JsonScreen/JsonScreen";

const App = () => (
  <Provider store={store}>
    <Grid fluid className="app__wrapper">
      <Row>
        <TabMenu />
        <JsonScreen />
      </Row>
    </Grid>
  </Provider>
);

export default App;
