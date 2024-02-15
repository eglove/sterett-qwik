import type { RequestHandler } from '@builder.io/qwik-city';
import { HTTP_STATUS } from '@ethang/toolbelt/constants/http';

export const onGet: RequestHandler = ({ redirect }) => {
  // eslint-disable-next-line @typescript-eslint/no-throw-literal
  throw redirect(
    HTTP_STATUS.FOUND,
    'https://admin.sterettcreekvillagetrustee.com/',
  );
};
