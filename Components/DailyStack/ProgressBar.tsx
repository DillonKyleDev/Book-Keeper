import React from 'react';
import { View, StyleSheet } from 'react-native';

interface Props {
  pagesRead: number;
  outOf: number;
}

const ProgressBar: React.FC<Props> = ({pagesRead, outOf}) => {
  return (
    <View style={styles.barContainer}>
      <View>

      </View>
      <View>
        
      </View>
    </View>
  )
}

export default ProgressBar

const styles = StyleSheet.create({
  barContainer: {

  },
  emptyBar: {

  },
  progressBar: {

  }
})