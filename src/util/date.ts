import lodash from 'lodash';
import { DateTime } from 'luxon';

export const now = new Date();

export const getRelativeDate = (date: string): string => {
  return lodash.upperFirst(
    DateTime.fromISO(new Date(date).toISOString()).toRelative({
      locale: 'en-US',
    }) ?? '',
  );
};
