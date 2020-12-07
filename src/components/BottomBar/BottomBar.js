import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Icon } from 'react-native-elements';
import { colorSet } from '../../appStyles';
import {
  widthPercentageToDP as w,
  heightPercentageToDP as h,
} from 'react-native-responsive-screen';

const tabConfig = {
  DiaryTab: { title: 'Diary', iconName: 'menu-book', iconType: 'material' },
  HomeTab: { title: 'Home', iconName: 'ios-home', iconType: 'ionicon' },
};

export function BottomBar({ state, descriptors, navigation }) {
  console.log(state);
  return (
    <View style={styles.container}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label = tabConfig[route.name].title;
        const isFocused = state.index === index;

        const onPress = () => {
          navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused) {
            navigation.navigate(route.name);
          }
        };

        return (
          <TouchableOpacity
            activeOpacity={0.8}
            accessibilityRole="button"
            onPress={onPress}>
            <Icon
              color={isFocused ? colorSet.foregroundColor : colorSet.lightText}
              name={tabConfig[route.name].iconName}
              type={tabConfig[route.name].iconType}
              containerStyle={styles.icon}
              size={w(4)}
            />
            <Text
              style={[
                styles.labelStyle,
                {
                  color: isFocused
                    ? colorSet.foregroundColor
                    : colorSet.lightText,
                },
              ]}>
              {label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  icon: {
    marginTop: w(2),
  },
  labelStyle: {
    fontSize: w(3),
  },
  container: {
    flexDirection: 'row',
    backgroundColor: colorSet.mainBackgroundColor,
    justifyContent: 'space-around',
    alignItems: 'center',
    height: w(15),
  },
});
