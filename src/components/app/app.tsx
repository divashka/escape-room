import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';

import { AppRoute } from '../../const/const';
import MainPage from '../../pages/main-page/main-page';
import LoginPage from '../../pages/login-page/login-page';
import BookingPage from '../../pages/booking-page/booking-page';
import NotFound from '../../pages/not-found-page/not-found-page';
import ContactsPage from '../../pages/contacts-page/contacts-page';
import MyQuestsPage from '../../pages/my-quests/my-quests';
import QuestPage from '../../pages/quest-page/quest-page';
import PrivateRouteForMyQuests from '../private-route-my-quests/private-route-my-quests';
import PrivateRouteForLogin from '../private-route-login/private-route-login';
import { getAutorisationStatus } from '../../store/user-slice/selectors';
import { useAppSelector } from '../../hooks';

function App(): JSX.Element {

  const authorizationStatus = useAppSelector(getAutorisationStatus);

  return (
    <HelmetProvider>
      <BrowserRouter>
        <Routes>
          <Route
            path={AppRoute.Root}
            element={<MainPage />}
          />
          <Route
            path={AppRoute.Login}
            element={
              <PrivateRouteForLogin
                authorizationStatus={authorizationStatus}
              >
                <LoginPage />
              </PrivateRouteForLogin>
            }
          />
          <Route
            path={AppRoute.Booking}
            element={<BookingPage />}
          />
          <Route
            path={AppRoute.Contacts}
            element={<ContactsPage />}
          />
          <Route
            path={AppRoute.MyQuests}
            element={
              <PrivateRouteForMyQuests
                authorizationStatus={authorizationStatus}
              >
                <MyQuestsPage />
              </PrivateRouteForMyQuests>
            }
          />
          <Route
            path={`${AppRoute.Quest}:id`}
            element={<QuestPage />}
          />
          <Route
            path="*"
            element={<NotFound />}
          />
        </Routes>
      </BrowserRouter>
    </HelmetProvider>
  );
}

export default App;
