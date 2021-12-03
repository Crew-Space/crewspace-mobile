import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { SvgXml } from 'react-native-svg';

import { plus, trash, verified } from 'assets/svg/icons';
import { GRAY2, LINE, PRIMARY, WHITE } from 'theme/Colors';
import { IdOptionalCategory } from 'types/component';

import SectionHeader from 'components/SectionHeader';
import SvgIcon from 'components/SvgIcon';
import { TextInput } from 'components/TextInput';
import TouchableText from 'components/TouchableText';
import Text from 'components/Text';

type EditModeType = 'new' | 'none';

interface Props {
  title: string;
  data: IdOptionalCategory[];
  setCategories: (data: IdOptionalCategory[]) => void;
  placeholder?: string;
}

interface ItemProps {
  index: number;
  category: IdOptionalCategory;
  setCategories: (data: IdOptionalCategory[]) => void;
  categories: IdOptionalCategory[];
}

interface NewITemProps {
  placeholder?: string;
  setCategories: (data: IdOptionalCategory[]) => void;
  setEditMode: (mode: EditModeType) => void;
  categories: IdOptionalCategory[];
}

const ListItem = ({ index, category, setCategories, categories }: ItemProps) => {
  const [inputText, setInputText] = useState<string>(category.name);
  const initialText = category.name;

  return (
    <View style={styles.item}>
      <View style={{ flexDirection: 'row' }}>
        {!category.isEditable && !category.isDeletable && (
          <SvgXml xml={verified} fill={GRAY2} width={16} style={{ marginRight: 6 }} />
        )}
        <TextInput
          editable={category.isEditable}
          value={inputText}
          name={'category.name'}
          onChangeText={setInputText}
          onBlur={() => {
            if (!category.isDeletable && category.isEditable && inputText.length === 0) {
              setInputText(initialText);
              setCategories([
                ...categories.slice(0, index),
                { ...category, name: initialText },
                ...categories.slice(index + 1),
              ]);
            }
            setCategories([
              ...categories.slice(0, index),
              { ...category, name: inputText },
              ...categories.slice(index + 1),
            ]);
          }}
        />
      </View>
      {category.isDeletable ? (
        <SvgIcon
          xml={trash}
          fill={GRAY2}
          width={24}
          onPress={() =>
            setCategories([...categories.slice(0, index), ...categories.slice(index + 1)])
          }
        />
      ) : category.isEditable ? (
        <Text fontType={'REGULAR_14'} color={PRIMARY}>
          삭제 불가
        </Text>
      ) : (
        <Text fontType={'REGULAR_14'} color={PRIMARY}>
          수정/삭제 불가
        </Text>
      )}
    </View>
  );
};

const NewItem = ({ placeholder, categories, setCategories, setEditMode }: NewITemProps) => {
  const [inputText, setInputText] = useState<string>('');

  const addCategory = () => {
    setCategories([
      ...categories,
      {
        name: inputText,
        isDeletable: true,
        isEditable: true,
      },
    ]);
    setEditMode('none');
  };

  return (
    <View style={styles.item}>
      <TextInput
        name={'new'}
        placeholder={placeholder}
        onChangeText={setInputText}
        onBlur={addCategory}
      />
      <View style={{ flexDirection: 'row' }}>
        <TouchableText onPress={() => setEditMode('none')}>취소</TouchableText>
        <View style={{ width: 20 }} />
        <TouchableText onPress={addCategory} color={PRIMARY}>
          추가
        </TouchableText>
      </View>
    </View>
  );
};

const CategoryEditList = ({ title, data, setCategories, placeholder }: Props) => {
  const [editMode, setEditMode] = useState<EditModeType>('none');

  return (
    <View style={{ marginBottom: 8 }}>
      <SectionHeader text={title}>
        <SvgIcon
          xml={plus}
          fill={PRIMARY}
          onPress={() => {
            setEditMode('new');
          }}
        />
      </SectionHeader>
      {data.map((item, index) => (
        <ListItem
          key={index}
          index={index}
          category={item}
          setCategories={setCategories}
          categories={data}
        />
      ))}
      {editMode === 'new' && (
        <NewItem
          placeholder={placeholder}
          setCategories={setCategories}
          setEditMode={setEditMode}
          categories={data}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 18,
    paddingHorizontal: 20,
    backgroundColor: WHITE,
    borderBottomWidth: 1,
    borderBottomColor: LINE,
  },
});

export default CategoryEditList;
