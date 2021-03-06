/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import styled from 'styled-components';
import tw from 'tailwind.macro';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import userActions from '../../actions/users';

const StyledFormL = styled.form.attrs({
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
    ${tw` hover:bg-red-700 text-black font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline`}

    background: ${props => props.theme.red};
  }
`;
const FormL = () => {
  const [redirect, setRedirect] = useState(false);
  const { loginUser } = userActions;
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      email: Yup.string().email('It needs to be a valid email').required('Please Enter your email'),
      password: Yup.string().min(1, 'Needs to be bigger than 2 characters').required('Please Enter your password')
        .matches(
          /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
          'Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character',
        ),
    }),
    onSubmit: ({ email, password }) => {
      const newObj = {
        user: {
          email,
          password,
        },
      };
      dispatch(loginUser(newObj));
      setRedirect(true);
    },
  });

  return (

    <StyledFormL onSubmit={formik.handleSubmit}>
      {redirect ? <Redirect to="/users/user" /> : ''}

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
        <label htmlFor="password">Password</label>
        <input type="password" id="password" onChange={formik.handleChange} value={formik.values.password} />
        {formik.errors.password ? (
          <div>
            {formik.errors.password}
          </div>
        ) : ''}

      </div>
      <button type="submit">Submit</button>

    </StyledFormL>
  );
};

export default FormL;
