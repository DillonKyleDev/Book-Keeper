import { StyleSheet } from "react-native"

export const flexStyles = StyleSheet.create({
  flexRowReg: {

  },
  flexRowCenter: {
    display: 'flex', 
    flexDirection: 'row', 
    justifyContent: 'center', 
    marginLeft: 'auto', 
    marginRight: 'auto', 
    alignItems: 'center'
  },
  flexColumnCenter: {
    display: 'flex', 
    flexDirection: 'column', 
    justifyContent: 'center', 
    alignItems: 'center', 
    marginLeft: 'auto', 
    marginRight: 'auto', 
  },
  autoMargin: {
    marginLeft: 'auto',
    marginRight: 'auto',
  }
})