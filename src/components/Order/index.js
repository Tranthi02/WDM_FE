import React from 'react';

// other modals
export const OrderInfoModal = React.lazy(() => import('./OrderInfoModal'));
export const PayRemainderModal = React.lazy(() =>
  import('./PayRemainderModal')
);
export const BillModal = React.lazy(() => import('./BillModal'));
export const ServiceModal = React.lazy(() => import('./ServiceModal'));
// create new order modal group
export const CreateOrderModalContainer = React.lazy(() =>
  import('./CreateOrderModalContainer')
);
export const PickDateModal = React.lazy(() => import('./PickDateModal'));
export const PickLobTypeModal = React.lazy(() => import('./PickLobTypeModal'));
export const PickLobbyModal = React.lazy(() => import('./PickLobbyModal'));
export const GetUserInfoModal = React.lazy(() => import('./GetUserInfoModal'));
export const PickFoodServiceModal = React.lazy(() =>
  import('./PickFoodServiceModal')
);
export const PaymentModal = React.lazy(() => import('./PaymentModal'));
export const ReviewModal = React.lazy(() => import('./ReviewModal'));
export const SuccessModal = React.lazy(() => import('./SuccessModal'));
// edit order modal group
export const EditOrderModalContainer = React.lazy(() =>
  import('./EditOrderModalContainer')
);
export const EditUserInfoModal = React.lazy(() =>
  import('./EditUserInfoModal')
);
