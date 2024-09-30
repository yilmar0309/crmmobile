import React from 'react';
import {View} from 'react-native-ui-lib';
import {AppText, AppTextVariant} from '../AppText';

export const AppShowEmptyList = () => {
  return (
    <View flex-1 center>
      <AppText variant={AppTextVariant.body1}>Empty List</AppText>
    </View>
  );
};
