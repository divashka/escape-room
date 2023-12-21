import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { useEffect } from 'react';
import { AppRoute } from '../../const/const';
import MainPage from '../../pages/main-page/main-page';
import LoginPage from '../../pages/login-page/login-page';
import BookingPage from '../../pages/booking-page/booking-page';
import NotFound from '../../pages/not-found-page/not-found-page';
import ContactsPage from '../../pages/contacts-page/contacts-page';
import MyQuestsPage from '../../pages/my-quests/my-quests';
import QuestPage from '../../pages/quest-page/quest-page';
import PrivateRoute from '../private-route/private-route';
import { getAutorisationStatus } from '../../store/user-slice/selectors';
import { useAppSelector, useAppDispatch } from '../../hooks';
import { AuthorizationStatus } from '../../const/const';
import { fetchBookingQuests } from '../../store/api-actions';
import LoadingPage from '../../pages/loading-page/loading-page';
import { getErrorQuestsStatus, getStatusQuestsLoading } from '../../store/quest-slice/selectors';
import ErrorQuestsPage from '../../pages/error-quests/error-quests';


function App(): JSX.Element {

  const dispatch = useAppDispatch();

  const authorizationStatus = useAppSelector(getAutorisationStatus);

  const isLoading = useAppSelector(getStatusQuestsLoading);

  const hasError = useAppSelector(getErrorQuestsStatus);

  useEffect(() => {
    if (authorizationStatus === AuthorizationStatus.Auth) {
      dispatch(fetchBookingQuests());
    }

  }, [dispatch, authorizationStatus]);

  if (authorizationStatus === AuthorizationStatus.Unknown || isLoading) {
    return (
      <LoadingPage />
    );
  }

  if (hasError) {
    return (
      <ErrorQuestsPage />);
  }

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
            element={<LoginPage />}
          />
          <Route
            path={`${AppRoute.Quest}:id/booking`}
            element={<BookingPage />}
          />
          <Route
            path={AppRoute.Contacts}
            element={<ContactsPage />}
          />
          <Route
            path={AppRoute.MyQuests}
            element={
              <PrivateRoute
                authorizationStatus={authorizationStatus}
              >
                <MyQuestsPage />
              </PrivateRoute>
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
