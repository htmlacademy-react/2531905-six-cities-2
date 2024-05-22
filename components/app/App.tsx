import React from "react";

import Main from '../../pages/main/Main';
import {Offer} from "../../types";

function App({offers}: Offer[]): JSX.Element {
  return (
    <Main offers={offers} />
  );
}

export default App;