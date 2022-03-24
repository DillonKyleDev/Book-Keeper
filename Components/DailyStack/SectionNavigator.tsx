import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Button } from 'react-native-elements';
import { Entypo } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import MyText from '../Helper/MyText';

interface Props {
  hasLateGoals: boolean;
  hasCompletedGoals: boolean;
  displaySection: string;
  handleSectionChange:(section:string) => void;
}

const SectionNavigator: React.FC<Props> = ({hasLateGoals, hasCompletedGoals, displaySection, handleSectionChange}) => {
  const ALL = "All";
  const TODAY = "Today";
  const LATE = "Late";
  const COMPLETED = "Completed";

  return (
    <View style={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', paddingTop: 3, paddingBottom: 5, position: 'relative', left: 18}}>  
      <MyText text="filter goals" size={14} style={{paddingBottom: 5, position: 'relative', right: 18}}/>
      <View style={{display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>  
        <Button title="All" titleStyle={[styles.sectionButtonTitle, {color: `${displaySection === "All" ? "white" : "black"}`, width: 50, paddingTop: 3, paddingBottom: 3}]} buttonStyle={[styles.sectionButton, {backgroundColor: `${displaySection === "All" ? "#6c77f0" : "white"}`}]} onPress={() => handleSectionChange(ALL)}/>
        <Button title="Today" titleStyle={[styles.sectionButtonTitle, {color: `${displaySection === "Today" ? "white" : "black"}`, width: 50, paddingTop: 3, paddingBottom: 3}]} buttonStyle={[styles.sectionButton, {backgroundColor: `${displaySection === "Today" ? "#6c77f0" : "white"}`}]} onPress={() => handleSectionChange(TODAY)}/>
        {hasLateGoals ?
        <Button title="Late" titleStyle={[styles.sectionButtonTitle, {color: `${displaySection === "Late" ? "white" : "black"}`, width: 50, paddingTop: 3, paddingBottom: 3}]} buttonStyle={[styles.sectionButton, {backgroundColor: `${displaySection === "Late" ? "#6c77f0" : "white"}`}]} onPress={() => handleSectionChange(LATE)}/>
        :
        <Button title="Late" titleStyle={[styles.sectionButtonTitle, {color:"#cccccc", width: 50, paddingTop: 3, paddingBottom: 3}]} buttonStyle={[styles.sectionButton, {backgroundColor: `${displaySection === "Late" ? "#6c77f0" : "white"}`}]} onPress={() => {}}/>
        }
        {hasCompletedGoals ?
        <Button icon={<FontAwesome5 name="flag-checkered" size={18} color="gold" />}  buttonStyle={[styles.sectionButton, {padding: 7, paddingTop: 5, paddingBottom: 5, backgroundColor: `${displaySection === "Completed" ? "#6c77f0" : "white"}`}]} onPress={() => handleSectionChange(COMPLETED)}/>
        :
        <Button icon={<FontAwesome5 name="flag-checkered" size={18} color="#cccccc" />}  buttonStyle={[styles.sectionButton, {padding: 7, paddingTop: 5, paddingBottom: 5, backgroundColor: `${displaySection === "Completed" ? "#6c77f0" : "white"}`}]}/>
        }

      </View>
    </View>
  )
}

export default SectionNavigator

const styles = StyleSheet.create({
  sectionButton: {
    padding: 10,
    paddingTop: 2,
    paddingBottom: 2,
    backgroundColor: 'white',
    marginLeft: 5,
    marginRight: 5,
  },
  sectionButtonTitle: {
    fontFamily: 'serif',
    color: 'black'
  },
})