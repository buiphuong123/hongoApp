import Toast from '@phamhuuan/react-native-toast-message';

export const showToastSuccess = success => {
    Toast.show({
        type: 'success',
        text1: success,
      });
  };
  
export const showToastError = error => {
    Toast.show({
        type: 'error',
        text1: error,
      });
};

