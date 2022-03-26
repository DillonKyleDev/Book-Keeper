import React from 'react'
import { View, StyleSheet } from 'react-native';
import MyText from '../Helper/MyText';

interface Props {
  text:string;
  data:number | [] | string;
  dataColor?:string;
  dataSize?:number;
  dataStyle?:{};
}

const AchievementCard: React.FC<Props> = ({text, data, dataColor, dataSize, dataStyle}) => {
  return (
    <View style={styles.cardContainer}>
      <MyText style={[dataStyle, {color: `${dataColor}`, textAlign: 'center'}]} text={`${data}`} size={dataSize || 40}/>
      <MyText style={{textAlign: 'center'}} text={`${text}`} size={16} />
    </View>
  )
}

export default AchievementCard

const styles = StyleSheet.create({
  cardContainer: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    alignContent: 'center',
    backgroundColor: 'white',
    margin: '2%',
    padding: '3%',
    borderRadius: 10,
    elevation: 7
  }
})