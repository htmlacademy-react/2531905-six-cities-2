import Main from '../../pages/main/main';
import {OfferListItem} from '../../types';

type AppProps = {
  offers: OfferListItem[];
}

function App({offers}: AppProps): JSX.Element {
  return (
    <Main offers={offers} />
  );
}

export default App;
