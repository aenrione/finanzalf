import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Modal from 'react-native-modal';
import { iconData } from 'src/utils/icons';

const IconPicker = ({ onSelectIcon, isVisible, onClose }) => {
  const handleIconPress = (iconName) => {
    onSelectIcon(iconName);
    onClose();
  };

  const handleCloseModal = () => {
    onClose();
  };

  return (
    <Modal isVisible={isVisible} onBackdropPress={onClose}>
      <View style={styles.modalContainer}>
        <ScrollView contentContainerStyle={styles.container}>
          {iconData.map((icon, index) => (
            <TouchableOpacity
              key={index}
              style={styles.iconContainer}
              onPress={() => handleIconPress(icon.name)}
            >
              <Icon name={icon.name} size={30} />
              {/* <Text style={styles.iconName}>{icon.name}</Text> */}
            </TouchableOpacity>
          ))}
        </ScrollView>
        <TouchableOpacity style={styles.closeButton} onPress={handleCloseModal}>
          <Text style={styles.closeButtonText}>Cancel</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
  },
  iconContainer: {
    alignItems: 'center',
    margin: 10,
  },
  iconName: {
    marginTop: 5,
    fontSize: 12,
  },
  closeButton: {
    backgroundColor: 'gray',
    padding: 10,
    borderRadius: 5,
    marginTop: 5,
  },
  closeButtonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default IconPicker;
