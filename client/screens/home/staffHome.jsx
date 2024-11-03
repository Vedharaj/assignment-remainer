import React from 'react'
import { View, Text,StyleSheet  } from 'react-native';

const StaffHome = ({route, navigation}) => {
  const { username } = route.params;

  React.useLayoutEffect(() => {
    navigation.setOptions({
      title: `Welcome ${username}`,
      headerLeft: () => null,
    });
  }, [navigation]);
  console.log(username)
  return (
    <View style={styles.container}>
      <Text>Assign assignment</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    height: '100vh',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
});

export default StaffHome