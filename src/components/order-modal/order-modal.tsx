import { useNavigate, useParams } from 'react-router-dom';

import Modal from '@components/modal/modal.tsx';
import { useAppSelector } from '@services/hooks/hooks.ts';
import { getOrderById } from '@services/store/socket/slice.ts';

import type { JSX } from 'react';

function OrderModal(): JSX.Element | null {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const order = useAppSelector((state) => getOrderById(state, id));

  const handleCloseModal = (): void => {
    void navigate('/feed');
  };

  if (!order) {
    return (
      <Modal title={'Детали ингредиента'} onClose={handleCloseModal}>
        <div>Тест 1</div>
      </Modal>
    );
  }

  return (
    <Modal title={'Детали ингредиента'} onClose={handleCloseModal}>
      Тест 2
    </Modal>
  );
}

export default OrderModal;
