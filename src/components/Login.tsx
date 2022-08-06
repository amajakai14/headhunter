import { useEffect, useState } from 'react';
import { boolean } from 'zod';
import { loginFields, LoginFieldsProps } from '../constants/formFields';
import { Input, LoginInputProps } from './LoginInput';

const fields = loginFields;
let fieldsState: LoginInputProps = {
  handleChange: function () {
    console.log('hi');
  },
  value: '',
  labelText: '',
  labelFor: '',
  id: '',
  name: '',
  type: '',
  isRequired: false,
  placeholder: '',
  customClass: '',
};
fields.forEach((field) => (fieldsState[field.id] = ''));

export default function Login() {
  const [loginState, setLoginState] = useState(fieldsState);

  const handleChange = (e: any) => {
    setLoginState({ ...loginState, [e.target.id]: e.target.value });
  };
  useEffect(() => console.log(loginState));

  return (
    <form className="mt-8 space-y-6">
      <div className="-space-y-px">
        {fields.map((field) => (
          <Input
            key={field.id}
            handleChange={(e: any) => handleChange(e)}
            value={loginState[field.id]}
            labelText={field.labelText}
            labelFor={field.labelFor}
            id={field.id}
            name={field.name}
            type={field.type}
            isRequired={field.isRequired}
            placeholder={field.placeholder}
            customClass={''}
          />
        ))}
      </div>
    </form>
  );
}
