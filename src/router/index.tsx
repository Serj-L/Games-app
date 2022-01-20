/* eslint-disable no-unused-vars */
import React, { FC } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import { RoutesEnum } from '../types/';

export interface IAppRoute {
  route: RoutesEnum;
  element: React.ReactNode
}

interface AppRouterProps {
  appRoutes: IAppRoute[],
}

export const AppRouter: FC<AppRouterProps> = ({ appRoutes }) => {
  return (
    <Routes>
      {
        appRoutes.map(appRoute => {
          return (
            <Route
              key={appRoute.route}
              path={appRoute.route}
              element={appRoute.element}
            />
          );
        })
      }
      <Route
        path='*'
        element={<Navigate to={RoutesEnum.REDIRECT_PATH} />}
      />
    </Routes>
  );
};
