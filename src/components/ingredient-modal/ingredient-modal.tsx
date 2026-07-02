import { useNavigate, useParams } from 'react-router-dom';

import IngredientDetails from '@components/ingredient-details/ingredient-details.tsx';
import Modal from '@components/modal/modal.tsx';
import { useAppSelector } from '@services/hooks/hooks.ts';
import { getIngredientById } from '@services/store/ingredients/slice.ts';

import type React from 'react';

function IngredientModal(): React.JSX.Element | null {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  const ingredient = useAppSelector((state) => getIngredientById(state, id));

  const handleCloseModal = (): void => {
    void navigate('/');
  };

  if (!ingredient) {
    return null;
  }

  return (
    <Modal title="Детали ингредиента" onClose={handleCloseModal}>
      <IngredientDetails ingredient={ingredient} />
    </Modal>
  );
}

export default IngredientModal;
