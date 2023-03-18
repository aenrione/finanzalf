import React from 'react';
import { View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import styled from 'styled-components/native';
import { Alert } from 'react-native';
import axios from 'axios';
import { showMessage } from 'react-native-flash-message';

const deleteCategory = async (category, refetch) => {
  await axios.delete(`/api/v1/categories/${category.id}`);
  await refetch();
  showMessage({
    message: 'Category deleted',
    type: 'success',
  });
};

const createAlert = (category, refetch) => {
  Alert.alert(
    `Delete ${category.name}`,
    "Deleting a category will reset all of it's transactions.",
    [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      { text: 'Delete', onPress: () => deleteCategory(category, refetch) },
    ],
  );
};
export default function TodoList({ category, refetch }) {
  return (
    <ComponentContainer>
      <ListContainer>
        <View>
          <TextItem>{category.name}</TextItem>
          <TextDate>{category.description}</TextDate>
        </View>
        <IconContainer onPress={() => createAlert(category, refetch)}>
          <Ionicons name="trash" size={20} color="midnightblue" />
        </IconContainer>
      </ListContainer>
    </ComponentContainer>
  );
}

const ListContainer = styled.TouchableOpacity`
  background-color: white;
  height: auto;
  width: 350px;
  margin-bottom: 7px;
  border-radius: 10px;
  flex-direction: row;
  justify-content: space-between;
  padding-right: 10px;
  padding-left: 10px;
  padding-bottom: 10px;
`;

const ComponentContainer = styled.View`
  flex-direction: row;
  justify-content: center;
  height: auto;
  width: auto;
`;

const TextItem = styled.Text`
  color: black;
  width: 260px;
  height: auto;
  font-size: 20px;
  margin-top: 10px;
  margin-right: 20px;
`;

const TextDate = styled.Text`
  color: gray;
  font-size: 15px;
  margin-right: 20px;
  width: 250px;
  border-radius: 10px;
`;

const IconContainer = styled.TouchableOpacity`
  align-items: center;
  justify-content: center;
  margin-right: 10px;
  border-radius: 10px;
`;
