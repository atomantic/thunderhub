import React from 'react';
import { SubTitle } from '../../generic/Styled';
import { AlertTriangle } from 'react-feather';
import styled from 'styled-components';
import { toast } from 'react-toastify';
import { getErrorContent } from '../../../utils/error';
import { SecureButton } from '../../buttons/secureButton/SecureButton';
import { ColorButton } from '../../buttons/colorButton/ColorButton';
import { useRemovePeerMutation } from '../../../generated/graphql';

interface RemovePeerProps {
  setModalOpen: (status: boolean) => void;
  publicKey: string;
  peerAlias: string;
}

const WarningCard = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const RemovePeerModal = ({
  setModalOpen,
  publicKey,
  peerAlias,
}: RemovePeerProps) => {
  const [removePeer, { loading }] = useRemovePeerMutation({
    onCompleted: data => {
      toast.success('Peer Removed');
    },
    onError: error => {
      toast.error(getErrorContent(error));
    },
    refetchQueries: ['GetPeers'],
  });

  const handleOnlyClose = () => setModalOpen(false);

  return (
    <WarningCard>
      <AlertTriangle size={32} color={'red'} />
      <SubTitle>Are you sure you want to remove this peer?</SubTitle>
      <SecureButton
        callback={removePeer}
        variables={{
          publicKey,
        }}
        color={'red'}
        disabled={loading}
        withMargin={'4px'}
      >
        {`Remove Peer [${peerAlias || publicKey?.substring(0, 6)}]`}
      </SecureButton>
      <ColorButton withMargin={'4px'} onClick={handleOnlyClose}>
        Cancel
      </ColorButton>
    </WarningCard>
  );
};