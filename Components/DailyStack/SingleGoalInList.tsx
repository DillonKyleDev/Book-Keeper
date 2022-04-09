import React from 'react';
import GoalStatus from '../Helper/Functions/GoalStatus';
//Redux
import { Book, Statuses } from '../../store/books/bookSlice';
import Complete from './GoalTypesInList/Complete';
import Today from './GoalTypesInList/Today';
import TodayDone from './GoalTypesInList/TodayDone';
import Current from './GoalTypesInList/Current';
import Late from './GoalTypesInList/Late';
//Navigation
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

interface Props {
  goal: Book;
  navigation: NativeStackNavigationProp<any, any>;
}

const SingleGoalInList: React.FC<Props> = ({goal, navigation}) => {
  const goalStatus = GoalStatus(goal);

  return (
    <>
        {goalStatus === Statuses.todayPending && <Today goal={goal} navigation={navigation}/>}
        {goalStatus === Statuses.todayDone && <TodayDone goal={goal} />}
        {goalStatus === Statuses.current && <Current goal={goal} />}
        {goalStatus === Statuses.late && <Late goal={goal} navigation={navigation} />}
        {goalStatus === Statuses.goalCompleted && <Complete goal={goal} />}
        {goalStatus === Statuses.goalCompletedToday && <Complete goal={goal} />}
    </>
  )
}

export default SingleGoalInList