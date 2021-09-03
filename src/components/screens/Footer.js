import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {NavLink} from 'react-router-dom';
const Footer = () => {
  return (
      <Text style={styles.footerText}>
        Made By{" "}
        <NavLink to={{pathname: 'http://merisite.online'}} target="_blank">Umair Khalid</NavLink>
      </Text>
    
  );
};
export default Footer;
const styles = StyleSheet.create({
  footerText: {
    fontSize: 15,
    textAlign: 'center',
    textAlignVertical: 'bottom',
    color: '#fa923f',
  },
});