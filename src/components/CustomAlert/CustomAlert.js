import { Alert } from 'react-native';

export default function CustomAlert({
  cancelText = 'Cancel',
  text = 'Ok',
  onPress,
  title,
  description,
}) {
  console.log(title);
  Alert.alert(title, description, [
    {
      text: cancelText,
      style: 'cancel',
    },
    { text: text, onPress: () => onPress() },
  ]);
}
