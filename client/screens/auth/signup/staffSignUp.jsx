import React from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { STAFF_SIGNUP } from '../../../utils/constants';
import { apiClient } from '../../../lib/apiClient';

const SignupSchema = Yup.object().shape({
    email: Yup.string()
      .email('Invalid email')
      .required('Required'),
    password: Yup.string()
      .min(6, 'Password is too short - should be 6 chars minimum.')
      .required('Required'),
    username: Yup.string()
      .min(3, 'Username is too short - should be 3 chars minimum.')
      .required('Required'),
  });

const StaffSignUp = ({navigation}) => {

  const handleSignUp = async (val)=>{
    try {
      const res = await apiClient.post(STAFF_SIGNUP, 
        val,
        {withCredentials: true}
      )
      if(res.status === 201){
        navigation.navigate("Staff Home", {...res.data.user})
      } 
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <View style={styles.container}>
          <Text style={styles.header}>Staff Signup</Text>
          <Formik
            initialValues={{ email: '', password: '', username: '' }}
            validationSchema={SignupSchema}
            onSubmit={handleSignUp}
          >
            {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
              <View>
                <TextInput
                  style={styles.input}
                  onChangeText={handleChange('email')}
                  onBlur={handleBlur('email')}
                  value={values.email}
                  placeholder="Email"
                />
                {errors.email && touched.email ? (
                  <Text style={styles.errorText}>{errors.email}</Text>
                ) : null}
                <TextInput
                  style={styles.input}
                  onChangeText={handleChange('username')}
                  onBlur={handleBlur('username')}
                  value={values.username}
                  placeholder="Username"
                />
                {errors.username && touched.username ? (
                  <Text style={styles.errorText}>{errors.username}</Text>
                ) : null}
                <TextInput
                  style={styles.input}
                  onChangeText={handleChange('password')}
                  onBlur={handleBlur('password')}
                  value={values.password}
                  placeholder="Password"
                  secureTextEntry
                />
                {errors.password && touched.password ? (
                  <Text style={styles.errorText}>{errors.password}</Text>
                ) : null}
                <Button onPress={handleSubmit} title="Sign Up" />
              </View>
            )}
          </Formik>
        </View>
      );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      padding: 16,
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
      borderColor: '#ccc',
      borderWidth: 1,
      marginBottom: 12,
      padding: 8,
    },
    errorText: {
      color: 'red',
      marginBottom: 12,
    },
  });

export default StaffSignUp