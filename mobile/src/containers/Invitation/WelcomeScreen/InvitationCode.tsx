import Text from 'components/Text';
import React from 'react';
import { View } from 'react-native';

import { PRIMARY } from 'theme/Colors';

const InvitationCode = ({ code }: { code: string }) => {
  return (
    <View style={{ alignItems: 'center', width: '100%' }}>
      <Text fontType={'BOLD_14'} style={{ color: PRIMARY, marginBottom: 6 }}>
        초대코드
      </Text>
      <Text fontType={'BOLD_20'} style={{ color: PRIMARY, marginBottom: 20 }}>
        {code}
      </Text>
    </View>
  );
};

export default InvitationCode;
