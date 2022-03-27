import React from 'react';
import { View, StyleSheet } from 'react-native';
import PagesPerDay from '../Helper/Functions/PagesPerDay';
import GoalStatus from '../Helper/Functions/GoalStatus';
import DaysDue from '../Helper/Functions/DaysDue';
//Redux
import { useReduxDispatch } from '../../store';
import { Book, Statuses, updateDatesRead } from '../../store/books/bookSlice';
import { addBookRead, updateAchievementsPages, addDayRead, updateTodaysReading } from '../../store/Achievements/achievementsSlice';
import Complete from './GoalTypesInList/Complete';
import Today from './GoalTypesInList/Today';
import TodayDone from './GoalTypesInList/TodayDone';
import Current from './GoalTypesInList/Current';
import Late from './GoalTypesInList/Late';
//Navigation

interface Props {
  goal: Book;
}

const SingleGoalInList: React.FC<Props> = ({goal}) => {
  const goalStatus = GoalStatus(goal);
  //redux selected
  const dispatch = useReduxDispatch();

  const handleCompletedReading = (goal:Book) => {
    const daysRead = DaysDue(goal);
    const totalPages = PagesPerDay(goal) * daysRead;
    dispatch(updateTodaysReading(totalPages));
    dispatch(addDayRead());
    dispatch(updateAchievementsPages(totalPages));
    if(totalPages + goal.pagesRead >= goal.pages) {
      dispatch(addBookRead(goal));
    }
    dispatch(updateDatesRead({book: goal, daysRead, totalPages}));
  }

  return (
    <View style={{display: 'flex', flexDirection: 'row', justifyContent: `${goal.goalCompleted ? 'space-evenly' : 'flex-start'}`}}>
      
      <View style={{display: 'flex', flexDirection: 'column', justifyContent: `${goal.goalCompleted ? "center" : "flex-start"}`}}>
        {goalStatus === Statuses.todayPending && <Today goal={goal} />}
        {goalStatus === Statuses.todayDone && <TodayDone goal={goal} />}
        {goalStatus === Statuses.current && <Current goal={goal} />}
        {goalStatus === Statuses.late && <Late goal={goal} />}
        {goalStatus === Statuses.goalCompleted && <Complete goal={goal} />}
        {goalStatus === Statuses.goalCompletedToday && <Complete goal={goal} />}
      </View>
    </View>
  )
}

export default SingleGoalInList

const styles = StyleSheet.create({
  scrollContainer: {
    paddingTop: 5,
    paddingBottom: 5,
  },
  goalCard: {
    backgroundColor: 'white',
    height: 200,
    borderRadius: 4,
    margin: '4%',
    marginBottom: '1%',
    marginTop: '1%',
    display: "flex",
    flexDirection: 'column',
    overflow: 'hidden',
    shadowColor: 'black',
    shadowOffset: { width: 2, height: 2 },
    shadowRadius: 40,
    shadowOpacity: 0.8,
    elevation: 3,
  },
  goalImage: {
    width: 100,
    height: 150,
    resizeMode: 'cover',
    marginLeft: 10,
  },
  flexCenter: {
    display: 'flex',
    justifyContent: 'center',
    alignContent: 'center',
    textAlign: 'center',
  },
  margin: {
    marginTop: 10,
    marginBottom: 10,
  },
  goalInfo: {
    marginLeft: 10,
    
    display: 'flex',
    flexDirection: 'column',
    alignContent: 'center',
    justifyContent: 'center',
    padding: 10,
    paddingLeft: 0,
  },
  sectionText: {
    color: '#636363',
  },
})