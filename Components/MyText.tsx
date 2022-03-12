import React from 'react'
import { Text, StyleSheet } from 'react-native';

interface Props {
  text: string;
  size: number;
  style?: {} | {}[];
}

const MyText: React.FC<Props> = ({text, size, style}) => {
  
  const styles = StyleSheet.create({
    customText: {
      fontFamily: "serif",
      fontSize: size,
    }
  })

  return (
    <Text style={[styles.customText, style]}>
      {text}
    </Text>
  )
}

export default MyText
