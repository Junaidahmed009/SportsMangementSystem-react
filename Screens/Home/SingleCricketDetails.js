import {View, Text} from 'react-native';
import React from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';
import Api from '../Api';

export default function SingleCricketDetails() {
  const navigation = useNavigation();
  const route = useRoute();
  const {id} = route.params;
  return (
    <View>
      <Text>{id}</Text>
    </View>
  );
}
