import React from 'react';
import { useRoute } from '@react-navigation/core';

import { WelcomeScreenPropsType } from 'types/Route';
import WelcomeToBeMember from './WelcomeToBeMember';
import WelcomeToSpace from './WelcomeToSpace';
import WelcomeToMakeSpace from './WelcomeToMakeSpace';

const WelcomeScreen = () => {
  const { params } = useRoute<WelcomeScreenPropsType>();
  const { screenType, profile } = params;

  return (
    <>
      {screenType === 'beMember' ? (
        <WelcomeToBeMember profile={profile} />
      ) : screenType === 'enterSpace' ? (
        <WelcomeToSpace profile={profile} />
      ) : (
        <WelcomeToMakeSpace profile={profile} />
      )}
    </>
  );
};

export default WelcomeScreen;
