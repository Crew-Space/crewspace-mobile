import React from 'react';
import { StyleSheet, View, ViewProps } from 'react-native';

import { GRAY1, GRAY2, PRIMARY, WHITE } from 'theme/Colors';
import Text from 'components/Text';
import { Author, Target } from 'types/Response';
import CommunityPostAuthor from 'components/CommunityPostAuthor';

type BaseProps = {
  categoryName: string;
  writtenDate: string;
} & ViewProps;

type NoticeHeaderProps = BaseProps & {
  title: string;
  targets: Target[];
};

type CommunityHeaderProps = BaseProps & {
  author: Author;
};

export const NoticeDetailHeader = ({
  style,
  categoryName,
  writtenDate,
  title,
  targets,
}: NoticeHeaderProps) => {
  return (
    <View style={[styles.container, style]}>
      <Text style={styles.categoryName} fontType={'REGULAR_14'} color={PRIMARY}>
        {categoryName}
      </Text>
      <Text fontType={'BOLD_20'}>{title}</Text>
      <View style={{ flexDirection: 'row', marginTop: 6 }}>
        <Text fontType={'REGULAR_14'} color={GRAY2}>
          {writtenDate}
        </Text>
        {targets.map((target) => (
          <Text key={target.targetId} fontType={'REGULAR_14'} color={GRAY1}>
            {`@${target}`}
          </Text>
        ))}
      </View>
    </View>
  );
};

export const CommunityDetailHeader = ({
  style,
  categoryName,
  writtenDate,
  author,
}: CommunityHeaderProps) => {
  return (
    <View style={[styles.container, style]}>
      <Text style={styles.categoryName} fontType={'REGULAR_14'} color={PRIMARY}>
        {categoryName}
      </Text>
      <View
        style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end' }}>
        <CommunityPostAuthor
          memberId={author.authorId}
          name={author.authorName}
          profileImage={author.authorImage}
          memberCategory={author.authorCategoryName}
        />
        <Text fontType={'REGULAR_14'} color={GRAY2}>
          {writtenDate}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    backgroundColor: WHITE,
  },
  categoryName: {
    marginBottom: 10,
  },
});
