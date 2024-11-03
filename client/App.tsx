import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import StudentLogin from './screens/auth/login/studentlogin';
import StaffLogin from './screens/auth/login/staffLogin';
import StaffSignUp from './screens/auth/signup/staffSignUp';
import StudentSignUp from './screens/auth/signup/studentSignUp';
import StaffHome from './screens/home/staffHome';
import StudentHome from './screens/home/studentHome';

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Student Login" component={StudentLogin} />
        <Stack.Screen name="Staff Login" component={StaffLogin} />
        <Stack.Screen name="Student Signup" component={StudentSignUp} />
        <Stack.Screen name="Staff Signup" component={StaffSignUp} />
        <Stack.Screen name="Staff Home" component={StaffHome} />
        <Stack.Screen name="Student Home" component={StudentHome} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
