import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import styled, { ThemeProvider } from 'styled-components';

import usersActions from './actions/users';
import RouteFile from './components/RouteFile';
import theme from './components/theme';
import jobActions from './actions/job';

const StyledApp = styled.div.attrs({
  className: 'w-full',
})`

`;

function App() {
  const { addAllJobs } = jobActions;

  const { checkLoggedUser } = usersActions;

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(checkLoggedUser());
    dispatch(addAllJobs());
  }, [dispatch, checkLoggedUser, addAllJobs]);
  return (
    <StyledApp className="App">
      <ThemeProvider theme={theme}>

        <RouteFile />

      </ThemeProvider>
    </StyledApp>
  );
}

export default App;
