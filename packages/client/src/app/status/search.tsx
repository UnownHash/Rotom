import { FormElement, Input, InputProps } from '@nextui-org/react';
import { useCallback } from 'react';

const css: InputProps['css'] = {
  width: '100%',
  pt: 4,
  pb: 6,
};

export const SearchInput = ({
  value,
  onChange,
}: Partial<Omit<InputProps, 'onChange'>> & { onChange: (newValue: string) => void }): JSX.Element => {
  const onChangeMemo = useCallback((event: React.ChangeEvent<FormElement>) => onChange(event.target.value), [onChange]);
  return <Input placeholder="Search" animated={false} clearable onChange={onChangeMemo} css={css} value={value} />;
};
