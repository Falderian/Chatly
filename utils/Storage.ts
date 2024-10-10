import AsyncStorage from '@react-native-async-storage/async-storage';

class Storage {
  static async getItem(key: string) {
    try {
      return await AsyncStorage.getItem(key);
    } catch (error) {
      console.log(error);
    }
  }

  static async setItem(key: string, value: string) {
    try {
      return await AsyncStorage.setItem(key, value);
    } catch (error) {
      console.log(error);
    }
  }
}

export default Storage;
