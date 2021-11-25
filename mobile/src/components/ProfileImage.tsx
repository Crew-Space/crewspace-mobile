import React from 'react';
import { Image, StyleSheet, View, ViewProps } from 'react-native';

interface ProfileImageProps extends ViewProps {
  uri: string;
  width?: number;
}

const ProfileImage = ({ uri, width, style }: ProfileImageProps) => {
  return (
    <View style={[styles.container, { ...(width && { width, height: width }) }, style]}>
      <Image
        style={[styles.image, { ...(width && { width, height: width }) }]}
        source={
          uri
            ? {
                uri,
              }
            : require('assets/images/profile_1.png')
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 100,
    overflow: 'hidden',
    width: 100,
    height: 100,
  },
  image: {
    width: 100,
    height: 100,
  },
});

export default ProfileImage;
