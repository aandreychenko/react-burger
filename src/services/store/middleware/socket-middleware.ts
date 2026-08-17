import {
  connect,
  onClose,
  onError,
  onMessage,
  onOpen,
} from '@services/store/socket/slice';
import { refreshToken } from '@utils/api.ts';

import type { Middleware, PayloadAction } from '@reduxjs/toolkit';
import type { TSocketResponse } from '@utils/types.ts';

export const socketMiddleware: Middleware = (store) => {
  let ws: WebSocket | null = null;
  let url = '';
  let withTokenRefresh = false;

  return (next) => (action: unknown) => {
    const { dispatch } = store;
    const { type } = action as PayloadAction;

    if (type === 'socket/connect') {
      const payload = (action as ReturnType<typeof connect>).payload;
      url = payload.url;
      withTokenRefresh = Boolean(payload.withTokenRefresh);

      if (ws) {
        ws.close();
      }

      ws = new WebSocket(url);

      ws.onopen = (): void => {
        dispatch(onOpen());
      };

      ws.onerror = (): void => {
        dispatch(onError('Ошибка WebSocket-соединения'));
      };

      ws.onmessage = (event: MessageEvent<string>): void => {
        try {
          const data = JSON.parse(event.data) as TSocketResponse;

          if (withTokenRefresh && data.message === 'Invalid or missing token') {
            refreshToken()
              .then((refreshedData) => {
                const accessToken = refreshedData.accessToken.replace('Bearer ', '');
                const wssUrl = new URL(url);
                wssUrl.searchParams.set('token', accessToken);

                dispatch(connect({ url: wssUrl.toString(), withTokenRefresh: true }));
              })
              .catch(() => {
                dispatch(onError('Не удалось обновить токен'));
              });

            return;
          }

          dispatch(onMessage(data));
        } catch {
          dispatch(onError('Ошибка парсинга сообщения от сервера'));
        }
      };

      ws.onclose = (): void => {
        dispatch(onClose());
      };
    }

    if (type === 'socket/disconnect') {
      if (ws) {
        ws.close();
        ws = null;
      }
    }

    return next(action);
  };
};
