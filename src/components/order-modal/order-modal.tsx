import { useLocation, useNavigate, useParams } from 'react-router-dom';

import Modal from '@components/modal/modal.tsx';
import OrderInfo from '@components/order-info/order-info.tsx';
import { useAppSelector } from '@services/hooks/hooks.ts';
import { getOrderById } from '@services/store/socket/slice.ts';

import type { JSX } from 'react';

function OrderModal(): JSX.Element | null {
  const location = useLocation();
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const order = useAppSelector((state) => getOrderById(state, id));

  const handleCloseModal = (): void => {
    if (location.pathname.startsWith('/profile/orders')) {
      void navigate('/profile/orders');
    } else if (location.pathname.startsWith('/feed')) {
      void navigate('/feed');
    } else {
      return;
    }
  };

  if (!order) {
    return null;
  }

  return (
    <Modal onClose={handleCloseModal}>
      <OrderInfo order={order} />
    </Modal>
  );
}

export default OrderModal;
