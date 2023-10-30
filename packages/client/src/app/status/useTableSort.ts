import { AsyncListData, AsyncListStateUpdate, AsyncListLoadOptions } from '@react-stately/data';
import { SortDescriptor, useAsyncList, useCollator } from '@nextui-org/react';
import { useCallback, useEffect } from 'react';

export type RecordObject = {
  [key: string]: number | boolean | string | RecordObject | undefined | null;
};

const pathSeparator = '.';

export const getPrimitiveValueByPath = (
  path: string,
  object?: RecordObject | null,
): number | boolean | string | undefined => {
  const pathFields = path.split(pathSeparator);
  const [firstField, ...otherFields] = pathFields;

  if (pathFields.length === 1) {
    const value = object?.[firstField];

    if (typeof value === 'object' && value !== null) {
      throw new Error(
        `Field '${firstField}' in ${JSON.stringify(
          object,
        )} should be a boolean, a string or number, but it is ${typeof value}`,
      );
    }

    return value === null ? undefined : value;
  }

  const nestedObject = object?.[firstField];
  if (nestedObject === undefined) {
    return undefined;
  }

  if (typeof nestedObject !== 'object') {
    throw new Error(
      `Field '${firstField}' in ${JSON.stringify(object)} should be an object, but it is ${typeof nestedObject}`,
    );
  }

  return getPrimitiveValueByPath(otherFields.join(pathSeparator), nestedObject);
};

export const useTableSort = <T extends RecordObject>({
  items,
  initialSortDescriptor,
}: {
  items: T[];
  initialSortDescriptor?: SortDescriptor;
}): AsyncListData<T> => {
  const collator = useCollator({ numeric: true });

  const sort = useCallback(
    <I extends T, C>({
      items,
      sortDescriptor,
    }: Pick<AsyncListLoadOptions<I, C>, 'items' | 'sortDescriptor'>): AsyncListStateUpdate<I, C> => {
      return {
        items: items.slice(0).sort((firstElement, secondElement) => {
          if (sortDescriptor.column === undefined) {
            return 0;
          }

          const firstValue = getPrimitiveValueByPath(`${sortDescriptor.column}`, firstElement);
          const secondValue = getPrimitiveValueByPath(`${sortDescriptor.column}`, secondElement);

          let compareNumber = collator.compare(`${firstValue || ''}`, `${secondValue || ''}`);

          if (sortDescriptor.direction === 'descending') {
            compareNumber *= -1;
          }

          return compareNumber;
        }),
      };
    },
    [collator],
  );

  const list = useAsyncList<T>({
    load: ({ sortDescriptor }) => {
      return sort({ items, sortDescriptor });
    },
    sort,
    initialSortDescriptor,
  });

  useEffect(() => {
    list.reload();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [items]);

  return list;
};
