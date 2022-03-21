import React from 'react';
import { StyleSheet } from 'react-native';
import { Button } from 'react-native-elements';

interface Props {
  weekday: string;
  dateIsActive: boolean;
  setFunction?: (previous:boolean) => void;
  buttonStyle?: {};
  titleStyle?: {};
}

const ReadingDayButton: React.FC<Props> = ({weekday, dateIsActive, setFunction, buttonStyle, titleStyle}) => {
  return (
    <Button 
      title={weekday}
      titleStyle={[
        styles.titleStyles,
        {color: `${dateIsActive ? 'white' : '#5e5e5e'}`}  ,
        titleStyle,
      ]}
      buttonStyle={[
        styles.weekdayButton, 
        {backgroundColor: `${dateIsActive ? '#6c77f0' : '#f2f2f2'}`},
        buttonStyle
      ]}
      onPress={() => {setFunction !== undefined && setFunction(!dateIsActive)}}/>
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
    fontFamily: 'serif',
    display: 'flex',
    flexWrap: 'nowrap'
  },
})