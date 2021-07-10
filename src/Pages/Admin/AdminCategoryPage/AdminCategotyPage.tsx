import React, { ReactElement } from 'react';
import { RouteComponentProps } from 'react-router';
import { getCardsByCategoryName } from '../../../api/api';

type MatchId = {
  id: string;
};


const AdminCategotyPage = ({ match }: RouteComponentProps<MatchId>): ReactElement => {
  
  getCardsByCategoryName(match.params.id).then((response) => {
    console.log(response);
  })
  return (
    <>
      Category PAGE!!!
    </>
  )
};

export default AdminCategotyPage;
