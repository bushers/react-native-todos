import AsyncStorage from '@react-native-async-storage/async-storage';
import type { TodoItem } from '../app/(tabs)/todos';

export const storeData = async (value: Array<TodoItem>) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem('my-key', jsonValue);
    console.log('Todos saved: ', value)
  } catch (e) {
    console.log(e)
  }
};

export const getData = async (): Promise<Array<TodoItem> | undefined> => {
  try {
    const jsonValue = await AsyncStorage.getItem('my-key');
    return jsonValue !== null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    console.log(e)
  }
};
