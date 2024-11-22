import React from 'react';

export { default as HomeLayout } from './HomeLayout';
export { default as DashboardLayout } from './DashboardLayout';
export { default as Login } from './Login';

export const Error = React.lazy(() => import('./Error'));
export const LobType = React.lazy(() => import('./LobType'));
export const Lobby = React.lazy(() => import('./Lobby'));
export const LobbyID = React.lazy(() => import('./LobbyId'));
export const Order = React.lazy(() => import('./Order'));
export const OrderID = React.lazy(() => import('./OrderID'));
export const NewOrder = React.lazy(() => import('./NewOrder'));
export const Payment = React.lazy(() => import('./Payment'));
export const Bill = React.lazy(() => import('./Bill'));
export const Report = React.lazy(() => import('./Report'));
export const FoodAndService = React.lazy(() => import('./FoodAndService'));
export const User = React.lazy(() => import('./User'));
