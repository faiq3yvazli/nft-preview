import { ChangeEventHandler, FocusEventHandler, useCallback, useState } from 'react';

export const useInput = () => {
  const [value, setValue] = useState<string>('');
  const [touched, setTouched] = useState<boolean>(false);
  const [focused, setFocused] = useState<boolean>(false);

  const onChange = useCallback<ChangeEventHandler<HTMLInputElement>>((event) => {
    setValue(event.target.value);
  }, []);

  const onBlur = useCallback<FocusEventHandler<HTMLInputElement>>(() => {
    setTouched(true);
    setFocused(false);
  }, []);

  const onFocus = useCallback<FocusEventHandler<HTMLInputElement>>(() => {
    setFocused(true);
  }, []);

  return { value, touched, focused, onChange, onBlur, onFocus };
};
