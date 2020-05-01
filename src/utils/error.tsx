import React, { ReactNode } from 'react';
import styled from 'styled-components';

const getMessage = error => {
  switch (error) {
    case 'PaymentRejectedByDestination':
      return 'This node does not accept keysend payments.';
    case 'FailedToFindPayableRouteToDestination':
    case 'NoRouteFound':
      return 'Did not find a route to this node. Try opening a direct channel to them with sufficient liquidity.';
    default:
      return error;
  }
};

const ErrorBox = styled.div``;

const ErrorLine = styled.div`
  padding: 4px 0;

  -ms-word-break: break-all;
  word-break: break-all;
  word-break: break-word;
  -webkit-hyphens: auto;
  -moz-hyphens: auto;
  hyphens: auto;
`;

export const getErrorContent = (error: any): ReactNode => {
  const errors = error.graphQLErrors.map(x => x.message);

  const renderMessage = errors.map((errorMsg, i) => {
    return <ErrorLine key={i}>{getMessage(errorMsg)}</ErrorLine>;
  });

  return <ErrorBox>{renderMessage}</ErrorBox>;
};