import {StyleSheet, View, Text, TouchableOpacity, Image, TextInput, Dimensions, KeyboardAvoidingView, Keyboard} from 'react-native';
import React, {useState, createRef} from 'react';
import {signIn} from '../actions';
import {connect} from 'react-redux';
import LoginImage from '../images/social_media.png';
import {Redirect, useLocation, NavLink} from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram} from '@fortawesome/free-brands-svg-icons';
import { faLock, faAt } from '@fortawesome/free-solid-svg-icons';
import Loader from '../utilities/Loader';
const {width, height} = Dimensions.get('window');
import InstaImage from '../images/insta_image.png';
const Login = ({signIn, loading})=>{
  const { search } = useLocation();
  const searchParams = new URLSearchParams(search);
  const queryCode = searchParams.get('code');
  const [code]= useState(queryCode);
  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [errortext, setErrortext] = useState('');
 // const [loading, setLoading] = useState(false);
  const passwordInputRef = createRef();
  const handleLoginClick = e => {
    e.preventDefault();
    setErrortext('');
    if (!userEmail) {
      alert('Please fill Email');
      return;
    }
   
    if (!userPassword) {
      alert('Please fill Password');
      return;
    }
    
    const formValues = {
      email: userEmail,
      password: userPassword,
    };
    signIn(formValues);
    //setLoading(loading);
  };
    return (
        <View style={styles.container}>
          <Loader loading={loading} />
          <Text style={styles.welcome}>Welcome to Insta-UK App</Text>
          <View style={styles.mainRowSection}>
          <Image source={LoginImage} style={styles.loginImage} />
          <View style={styles.loginSection}>
          <KeyboardAvoidingView enabled>
          <Image source={InstaImage} style={styles.brandImage} />
          <View style={styles.SectionStyle}>
          <FontAwesomeIcon icon={faAt} size="1x" style={{width: width*0.02, alignSelf:'center'}}/>
              <TextInput
                style={styles.inputStyle}
                onChangeText={(UserEmail) =>
                  setUserEmail(UserEmail)
                }
                placeholder="Enter Email"
                placeholderTextColor="#8b9cb5"
                autoCapitalize="none"
                keyboardType="email-address"
                returnKeyType="next"
                onSubmitEditing={() =>
                  passwordInputRef.current &&
                  passwordInputRef.current.focus()
                }
                underlineColorAndroid="#f000"
                blurOnSubmit={false}
              />
            </View>
            <View style={styles.SectionStyle}>
            <FontAwesomeIcon icon={faLock} size="1x" style={{width: width*0.02, alignSelf:'center'}}/>
              <TextInput
                style={styles.inputStyle}
                onChangeText={(UserPassword) =>
                  setUserPassword(UserPassword)
                }
                placeholder="Enter Password" //12345
                placeholderTextColor="#8b9cb5"
                keyboardType="default"
                ref={passwordInputRef}
                onSubmitEditing={Keyboard.dismiss}
                blurOnSubmit={false}
                secureTextEntry={true}
                underlineColorAndroid="#f000"
                returnKeyType="next"
              />
            </View>
            {errortext !== '' ? (
              <Text style={styles.errorTextStyle}>
                {errortext}
              </Text>
            ) : null}
            <TouchableOpacity activeOpacity={0.2} style={styles.loginButton} onPress={handleLoginClick} >
             <FontAwesomeIcon icon={faInstagram} size="2x" style={{marginInline:6}}/>
            <Text style={styles.loginText}>Login</Text>
          </TouchableOpacity>
          
          <Text
              style={styles.registerTextStyle}
              onPress={() => (<Redirect to={'/register'}/>)}>
              <NavLink to='/register'>
              New Here ? Register
            </NavLink>
            </Text>
            </KeyboardAvoidingView>
      </View>  
          </View>
        </View>
        
    );
}
const mapStateToProps=(state)=>{
  return {
    loading: state.auth.loading,
  };
}
export default connect(mapStateToProps, {signIn})(Login);
const styles = StyleSheet.create({
  container: {
    height: height*0.90,
    flexDirection: 'column',
    backgroundColor: '#ffffff',
  },
  welcome: {
    fontSize: width*0.04,
    fontWeight:'bold',
    textAlign: 'center',
    marginVertical: 5,
    justifyContent: 'flex-start',
    color: '#000000',
    alignSelf:'center',
  },
  mainRowSection:{
    flexDirection: 'row',
    flex:1,
    justifyContent:'space-evenly',
    alignSelf:'center',
    marginVertical:2
  },
  loginImage:{
    resizeMode: 'contain',
    width: width*0.5,
    height: height*0.7,
    alignSelf:'center'
  },
  loginSection:{
    flexDirection: 'column',
    marginVertical: 2,
    alignContent:'center',
    marginRight: 5,
    backgroundColor:'#fafafa',
    borderWidth: 1,
    borderColor: 'black',
    alignSelf:'center',
    borderRadius: 10,
    padding: 5,
    width: width*0.45,
    height: height*0.5,
  },
  brandImage:{
    resizeMode: 'contain',
    flex:1,
    width: 100,
    height: 50,
    alignSelf:'center'},
  SectionStyle: {
    flexDirection: 'row',
    marginTop: 5,
    height: height*0.08,
    justifyContent:'center',
    alignContent:'center',
  },
  inputStyle: {
    width: width*0.4,
    flexShrink:true,
    paddingLeft: 4,
    borderWidth: 1,
    borderRadius: 10,
    marginStart: 3,
    marginRight:2
  },
  loginText:{
    fontSize: 20, fontWeight: '500'
  },
  loginButton:{
    flexDirection: 'row', 
    justifyContent: 'center',
    alignContent:'center',
    backgroundColor: '#b2dffc',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 10,
    paddingHorizontal:40,
    paddingVertical:5,
    height: 40,
    width: width*0.3,
    cursor: 'pointer',
    flexWrap:'no-wrap', 
    alignSelf:'center',
    marginVertical:10,
  },
  registerTextStyle: {
    color: 'blue',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 14,
    alignSelf: 'center',
    padding:4,
  },
});
