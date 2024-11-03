import React from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import {apiClient} from '../../../lib/apiClient'
import { STU_LOGIN } from '../../../utils/constants';

const StudentLogin = ({ navigation }) => {

  const handleLogin = async (val)=>{
    try {
      const res = await apiClient.post(STU_LOGIN, 
        val,
        {withCredentials: true}
      )
      if(res.status === 200){
        console.log(res.data.user)
        navigation.navigate("Student Home", {...res.data.user})
      }
    } catch (error) {
      console.log(error)
    }
  };

  const LoginSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Required'),
    password: Yup.string().min(8, 'Too Short!').required('Required'),
  });

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Student Login</Text>
      <Formik
        initialValues={{ email: '', password: '' }}
        validationSchema={LoginSchema}
        onSubmit={handleLogin}
      >
        {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
          <View>
            <TextInput
              style={styles.input}
              placeholder="Email"
              onChangeText={handleChange('email')}
              onBlur={handleBlur('email')}
              value={values.email}
              keyboardType="email-address"
              autoCapitalize="none"
            />
            {errors.email && touched.email ? (
              <Text style={styles.error}>{errors.email}</Text>
            ) : null}
            <TextInput
              style={styles.input}
              placeholder="Password"
              onChangeText={handleChange('password')}
              onBlur={handleBlur('password')}
              value={values.password}
              secureTextEntry
            />
            {errors.password && touched.password ? (
              <Text style={styles.error}>{errors.password}</Text>
            ) : null}
            <Button onPress={handleSubmit} title="Login" />
          </View>
        )}
      </Formik>
      <View style={styles.navigateContainer}>
        <Text style={styles.navigateText} onPress={()=>navigation.navigate("Student Signup")}>
          SignUp
        </Text>
        <Text style={styles.navigateText} onPress={()=>navigation.navigate("Staff Login")}>
          Staff Login
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  header: {
    fontSize: 24,
    marginBottom: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#3a86ff',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  error: {
    fontSize: 12,
    color: 'red',
  },
  navigateContainer: {
    marginTop: 10,
    paddingVertical: 2,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
},
navigateText: {
    fontSize: 16,
    color: '#4f5d75',
    textDecorationLine: 'underline',
  },
});

export default StudentLogin;
