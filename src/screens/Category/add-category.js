import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity
} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome5';
import { Colors, Typography } from 'src/styles';
import { insertCategory, updateCategory } from 'src/dbHelpers/categoryHelper';
import { useDispatch } from 'react-redux';
import { getAllInfo } from 'src/actions/ObjectActions';


import BackHeader from 'src/components/Headers/BackHeader';
import Button from 'src/components/Button';
import IconPicker from 'src/components/IconPicker';

const AddAccount = ({ navigation, route }) => {
  const [name, setName] = useState('');
  const [desc, setDesc] = useState('');
  const [icon, setSelectedIcon] = useState('');
  const [isModalVisible, setModalVisible] = useState(false);
  const dispatch = useDispatch();

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };


  useEffect(() => {
    if (route.params?.item) {
      const cat = route.params.item
      setSelectedIcon(cat.icon);
      setName(cat.name)
      setDesc(cat.description)
    }
  }, []);

  // Insert Category
  const __insert = () => {
    insertCategory({
      icon: icon,
      name: name,
      description: desc,
    });
  }

  // Update Category
  const __update = () => {
    updateCategory({
      id: route.params.item.id,
      icon: icon,
      name: name,
      description: desc,
    });
  }

  // Save Category
  const __save = () => {
    if (route.params?.item) {
      __update();
    }
    else {
      __insert();
    }
    dispatch(getAllInfo())
    navigation.goBack();
  }

  return (
    <View style={styles.container}>
      {/* Header */}
      <BackHeader title={route.params?.item ? 'Edit Category' : 'New Category'} />

      {/* Body */}
      <ScrollView style={styles.bodyContainer} showsVerticalScrollIndicator={false}>
        {/* Category Icon */}
        <View style={styles.inputContainer}>
          <Text style={[Typography.TAGLINE, { color: Colors.GRAY_DARK }]}>Category Icon</Text>
          <TouchableOpacity style={[styles.iconPickerButton]} onPress={toggleModal}>
            {icon ? (
              <View style={styles.iconContainer}>
                <Icon name={icon} size={20} color={Colors.WHITE} />
              </View>
            ) : (
              <Text style={styles.input}>Choose Icon</Text>
            )}
          </TouchableOpacity>

          <IconPicker
            isVisible={isModalVisible}
            onSelectIcon={setSelectedIcon}
            onClose={toggleModal}
          />
        </View>

        {/* Category Name */}
        <View style={styles.inputContainer}>
          <Text style={[Typography.TAGLINE, { color: Colors.GRAY_DARK }]}>Category Name</Text>
          <TextInput
            value={name}
            placeholder='Exp: Travel'
            onChangeText={(text) => setName(text)}
            placeholderTextColor={Colors.GRAY_MEDIUM}
            style={[styles.input, Typography.BODY]} />
        </View>

        {/* Category Description */}
        <View style={styles.inputContainer}>
          <Text style={[Typography.TAGLINE, { color: Colors.GRAY_DARK }]}>Description</Text>
          <TextInput
            value={desc}
            placeholder='Exp: for groceries'
            onChangeText={(text) => setDesc(text)}
            placeholderTextColor={Colors.GRAY_MEDIUM}
            style={[styles.input, Typography.BODY]} />
        </View>


        {/* <CategoryCard category={object()} /> */}
      </ScrollView>

      {/* Footer */}
      <View style={styles.footerContainer}>
        <Button
          title='Save'
          onPress={() => __save()} disabled={!icon || !name} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.BLACK
  },
  // Body
  bodyContainer: {
    flex: 1,
    padding: 20,
    paddingTop: 10,
  },
  inputContainer: {
    marginBottom: 20,
  },
  input: {
    padding: 10,
    marginTop: 10,
    borderRadius: 10,
    color: Colors.WHITE,
    backgroundColor: Colors.LIGHT_BLACK
  },
  rowContainer: {
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  // Footer
  footerContainer: {
    padding: 20,
  },
  iconContainer: {
    marginTop: 10,
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.LIGHT_BLACK
  },
});

export default AddAccount;



