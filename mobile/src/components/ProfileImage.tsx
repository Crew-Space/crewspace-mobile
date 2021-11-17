import React from 'react';
import { Image, StyleSheet, View } from 'react-native';

interface ProfileImageProps {
  uri: string;
}

const ProfileImage = ({ uri }: ProfileImageProps) => {
  return (
    <View style={[styles.container]}>
      <Image
        style={[styles.image]}
        source={{
          uri,
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 100,
    overflow: 'hidden',
  },
  image: {
    width: 100,
    height: 100,
  },
});

export default ProfileImage;
