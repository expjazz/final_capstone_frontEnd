/* eslint-disable import/prefer-default-export */
import { createSlice } from '@reduxjs/toolkit';
import usersActions from '../actions/users';
import curriculumActions from '../actions/curriculum';

const { createCurriculum } = curriculumActions;
const {
  signUpUser, checkLoggedUser, signUpUserCompany, loginUser, addNewJob, setUpInterviewCandidate,
} = usersActions;
export const userSlice = createSlice({
  name: 'user',
  initialState: {
    currentUser: '',
    status: 'idle',
    interviews: [{}],
    infoArrays: {
      personalArr: ['children', 'married', 'cpf', 'race', 'nationality'],
      addressArr: ['country', 'cep', 'state', 'city', 'hood', 'street', 'cel'],
      compPersonalArr: ['cnpj', 'aboutUs', 'size'],
    },
  },
  reducers: {

  },
  extraReducers: {
    [addNewJob.pending]: state => { state.status = 'loading'; },
    [addNewJob.fulfilled]: (state, action) => {
      const jobOffers = [...state.company.jobOffers, action.payload];
      const company = { ...state.company, jobOffers };
      return { ...state, company, status: 'fulfilled' };
    },

    [signUpUser.pending]: (state, action) => { state.status = 'loading'; },

    [signUpUser.fulfilled]: (state, action) => ({ ...state, status: 'fullfiled', currentUser: action.payload }),

    [setUpInterviewCandidate.pending]: (state, action) => { state.status = 'loading'; },

    [setUpInterviewCandidate.fulfilled]: (state, action) => {
      const interviews = [...state.interviews, action.payload];
      return ({ ...state, status: 'fullfiled', interviews });
    },

    [checkLoggedUser.pending]: (state, action) => { state.status = 'loading'; },

    [checkLoggedUser.fulfilled]: (state, action) => {
      if (action.payload.companyInfo) {
        return ({
          ...state, status: 'fullfiled', currentUser: { user: action.payload.user }, company: action.payload.companyInfo, interviews: action.payload.interviews,
        });
      } if (action.payload.curriculum) {
        return ({
          ...state, status: 'fullfiled', currentUser: { user: action.payload.user }, curriculum: action.payload.curriculum, interviews: action.payload.interviews,
        });
      } if (action.payload.message === 'no user logged in') {
        return ({
          ...state, status: 'rejected', currentUser: action.payload,
        });
      }
      return ({
        ...state, status: 'fullfiled', currentUser: { user: action.payload.user }, curriculum: action.payload.curriculum,

      });
    },
    [checkLoggedUser.rejected]: (state, action) => { state.status = 'rejected'; },

    [signUpUserCompany.pending]: (state, action) => { state.status = 'loading'; },

    [signUpUserCompany.fulfilled]: (state, action) => ({
      ...state, status: 'fullfiled', currentUser: { user: action.payload.user }, company: action.payload.companyInfo,
    }),

    [loginUser.pending]: (state, action) => { state.status = 'loading'; },
    [loginUser.fulfilled]: (state, action) => {
      if (action.payload.companyInfo) {
        return ({
          ...state, status: 'fullfiled', currentUser: { user: action.payload.user }, company: action.payload.companyInfo, interviews: action.payload.interviews,
        });
      } if (action.payload.curriculum) {
        return ({
          ...state, status: 'fullfiled', currentUser: { user: action.payload.user }, curriculum: action.payload.curriculum, interviews: action.payload.interviews,
        });
      } if (action.payload.message === 'no user logged in') {
        return ({
          ...state, status: 'rejected', currentUser: action.payload,
        });
      }
      return ({
        ...state, status: 'fullfiled', currentUser: { user: action.payload.user }, curriculum: action.payload.curriculum,

      });
    },

    [createCurriculum.pending]: (state, action) => { state.status = 'loading'; },
    [createCurriculum.fulfilled]: (state, action) => ({ ...state, status: 'fullfiled', curriculum: action.payload }),
  },
});

export const { signUp } = userSlice.actions;

export default userSlice.reducer;
