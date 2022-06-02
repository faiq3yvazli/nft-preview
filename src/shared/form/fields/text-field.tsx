import { forwardRef, ReactNode } from 'react';
import { useField } from 'formik';

import { Field } from '@root/shared/ui/field';
import { FieldHint } from '@root/shared/ui/field/hint';
import { TextInput, TextInputProps } from '@root/shared/ui/inputs/text';
import { FieldLabel } from '@root/shared/ui/field/label';

export interface TextFieldProps extends TextInputProps {
  label?: ReactNode;
  helper?: string;
  extra?: ReactNode;
  isRequired?: boolean;
  name: string;
}

export const TextField = forwardRef<HTMLInputElement, TextFieldProps>(function TextField({ label, helper, extra, isRequired, ...props }, ref) {
  const [inputProps, meta] = useField(props.name);

  return (
    <Field>
      <div className='relative'>
        {!!label && (
          <FieldLabel>
            {label}
            {isRequired && <span className='text-danger-400'>*</span>}
          </FieldLabel>
        )}
        {!!helper && <FieldHint className='-mt-1'>{helper}</FieldHint>}
        {extra && <span className='absolute bottom-1 right-0'>{extra}</span>}
      </div>
      <TextInput type='text' hasError={meta.touched && !!meta.error} {...inputProps} {...props} ref={ref} />
      <FieldHint danger>{meta.touched && meta.error}</FieldHint>
    </Field>
  );
});
