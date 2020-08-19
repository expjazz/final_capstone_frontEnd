import React from 'react';
import styled from 'styled-components';
import tw from 'tailwind.macro';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Input from '../common/Input';

const StyledForm = styled.form.attrs({
  className: 'bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4',
})`
  & {
    label {
      ${tw`block text-gray-700 text-sm font-bold mb-2`}
    }

    input {
      ${tw`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
    }
  }

  button {
    ${tw`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline`}
  }
`;

// {
//   "user": {"email": "newroutsde23d2@gmail.com",
//            "password": "foobar@2" },
//   "company": {
//       "name": "firstLOL",
//       "header": "some general info",
//       "company_address": {
//           "country": "data",
//       "cep": "data",
//       "state": "data",
//       "city": "data",
//       "hood": "data",
//       "street": "data",
//       "cel": "data"
//       }, "company_personal": {
//           "cnpj": "data",
//           "size": "size",
//           "aboutUs": "data"
//       }
//   }
// }
const FormC = () => {
  const { addressArr, compPersonalArr } = useSelector(state => state.users.infoArrays);

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
      passwordConfirmation: '',
      header: '',
      country: '',
      cep: '',
      state: '',
      city: '',
      hood: '',
      street: '',
      cel: '',
      cnpj: '',
      size: '',
      aboutUs: '',
    },
    validationSchema: Yup.object({
      name: Yup.string().min(1, 'Needs to be bigger than 2 characters').required("it  Can't be empty"),
      email: Yup.string().email('It needs to be a valid email').required('Please Enter your email'),
      password: Yup.string().min(1, 'Needs to be bigger than 2 characters').required('Please Enter your password')
        .matches(
          /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
          'Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character',
        ),
      passwordConfirmation: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Passwords must match'),
    }),
    onSubmit: values => {
      console.log(values);
      const { email, name, password } = values;
      const newObj = {
        user: {
          email,
          password,
        },
        candidate: {
          name,
        },

      };
      // dispatch(signUpUser(newObj));
      // setRedirect(true);
    },
  });
  return (
    <StyledForm onSubmit={formik.handleSubmit}>
      {/* {redirect ? <Redirect to="/users/user" /> : ''} */}
      <div className="mb-4">
        <label htmlFor="name">Name</label>
        <input type="text" id="name" onChange={formik.handleChange} value={formik.values.name} />
        {formik.errors.name ? (
          <div>
            {formik.errors.name}
          </div>
        ) : ''}
      </div>
      <div className="mb-4">
        <label htmlFor="email">Email</label>
        <input type="email" id="email" onChange={formik.handleChange} value={formik.values.email} />
        {formik.errors.email ? (
          <div>
            {formik.errors.email}
          </div>
        ) : ''}

      </div>
      <div className="mb-4">
        <label htmlFor="name">Password</label>
        <input type="password" id="password" onChange={formik.handleChange} value={formik.values.password} />
        {formik.errors.password ? (
          <div>
            {formik.errors.password}
          </div>
        ) : ''}

      </div>
      <div className="mb-4">
        <label htmlFor="passwordConfirmation">Confirm Password</label>
        <input type="password" id="passwordConfirmation" onChange={formik.handleChange} value={formik.values.passwordConfirmation} />
        {formik.errors.passwordConfirmation ? (
          <div>
            {formik.errors.passwordConfirmation}
          </div>
        ) : ''}

      </div>

      {addressArr.map(field => (
        <Input label={field} key={field} id={field} onChange={formik.handleChange} labelValue={field} value={formik.values[field]} errors={formik.errors[field]} />
      ))}

      {compPersonalArr.map(field => (
        <Input label={field} key={field} id={field} onChange={formik.handleChange} labelValue={field} value={formik.values[field]} errors={formik.errors[field]} />
      ))}
      <button type="submit">Submit</button>

    </StyledForm>
  );
};

export default FormC;