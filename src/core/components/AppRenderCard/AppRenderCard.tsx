import React from 'react';
import {StyleSheet, useColorScheme, View} from 'react-native';
import {colorsDark, colorsLight} from '@/core/theme';
import {LeadsEntity} from '@/leads/data/remote/entities/leadsEntity';
import {AppButton, AppButtonSizeVariant, AppButtonVariant} from '../AppButton';
import {AppText, AppTextVariant} from '../AppText';

interface AppRenderCardProps {
  item: LeadsEntity;
  onValidate?: (id: number) => Promise<void> | null;
}

export const AppRenderCard = ({
  item,
  onValidate = () => null,
}: AppRenderCardProps) => {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <View
      style={[
        styles.cardContainer,
        {
          backgroundColor: isDarkMode
            ? colorsDark.BACKGROUND_SCREEN_COLOR
            : colorsLight.BACKGROUND_SCREEN_COLOR,
        },
      ]}>
      <AppText variant={AppTextVariant.body1} style={styles.nameText}>
        {item.firstName} {item.lastName}
      </AppText>
      <AppText variant={AppTextVariant.body1} style={styles.idText}>
        ID: {item.nationalId}
      </AppText>
      <AppText variant={AppTextVariant.body1} style={styles.emailText}>
        Email: {item.email}
      </AppText>
      <AppText variant={AppTextVariant.body1} style={styles.emailText}>
        Birth of Date: {item.birthDate}
      </AppText>
      <AppText
        variant={AppTextVariant.body1}
        style={
          item.status === 'qualified'
            ? styles.statusText
            : styles.statusTextPending
        }>
        Status: {item.status}
      </AppText>
      {item.qualifiedAt && (
        <AppText variant={AppTextVariant.body1} style={styles.qualifiedText}>
          Qualified At: {item.qualifiedAt}
        </AppText>
      )}
      {item.status === 'pending' && (
        <AppButton
          variant={AppButtonVariant.contained}
          size={AppButtonSizeVariant.large}
          label="Validate Lead"
          onPress={() => onValidate(item.id)}
          disabled={item.status !== 'pending'}
          style={styles.btn}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    padding: 15,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5,
  },
  nameText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  idText: {
    fontSize: 14,
    color: '#555',
  },
  emailText: {
    fontSize: 14,
    color: '#555',
    marginBottom: 5,
  },
  statusTextPending: {
    fontSize: 14,
    color: 'red',
  },
  statusText: {
    fontSize: 14,
    color: 'green',
  },
  qualifiedText: {
    fontSize: 12,
    color: '#888',
    marginTop: 10,
  },
  btn: {
    marginTop: 20,
  },
});
