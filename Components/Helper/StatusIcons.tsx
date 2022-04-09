import { View, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import MyText from './MyText';

const styles = StyleSheet.create({
  statusIcon: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
})

export const currentIcon = 
  <View style={styles.statusIcon}>
    <MyText text='On Track ' size={8} style={{color: "#4b59f5"}}/>
    <MaterialCommunityIcons name="calendar-clock" size={18} color="#4b59f5" />
  </View>
export const todayIcon =
  <View style={styles.statusIcon}>
    <MyText text='To do ' size={8} style={{color: "#2bba00"}}/>
    <Ionicons name="today-sharp" size={18} color="#2bba00" />
  </View>
export const todayCompleteIcon = 
  <View style={styles.statusIcon}>
    <MyText text='Done ' size={8} style={{color: "#2bba00"}}/>
    <Feather name="check" size={18} color="#2bba00" />
  </View>
export const lateIcon =
  <View style={styles.statusIcon}>
    <MyText text='Behind ' size={8} style={{color: "orange"}}/>
    <MaterialCommunityIcons name="calendar-clock" size={18} color="orange" />
  </View>
export const completedIcon =
  <View style={styles.statusIcon}>
    <MyText text='Complete! ' size={12} style={{color: "black"}}/>
    <Entypo name="star" size={18} color="#ffcc00" />
  </View>