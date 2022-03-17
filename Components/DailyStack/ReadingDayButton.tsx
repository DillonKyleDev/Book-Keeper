import React from 'react';
import { StyleSheet } from 'react-native';
import { Button } from 'react-native-elements';

interface Props {
  weekday: string;
  dateIsActive: boolean;
  setFunction: (previous:boolean) => void;
}

const ReadingDayButton: React.FC<Props> = ({weekday, dateIsActive, setFunction}) => {
  return (
    <Button 
      title={weekday}
      titleStyle={[
        styles.titleStyles,
        {color: `${dateIsActive ? 'white' : '#5e5e5e'}`}  
      ]}
      buttonStyle={[
        styles.weekdayButton, 
        {backgroundColor: `${dateIsActive ? '#6c77f0' : '#f2f2f2'}`},
      ]}
      onPress={() => setFunction(!dateIsActive)}/>
  )
}

export default ReadingDayButton

const styles = StyleSheet.create({
  weekdayButton: {
    margin: 3,
    width: 110,
    height: 80,
  },
  titleStyles: {
    color: '#5e5e5e',
    fontFamily: 'serif'
  },
})