import { StyleSheet } from "react-native"

const flexStyles = StyleSheet.create({
  flexRowReg: {
    display: 'flex',
    flexDirection: 'row',
  },
  flexRowBetween: {
    display: "flex", 
    flexDirection: 'row', 
    justifyContent: 'space-between',
  },
  flexColBetween: {
    display: "flex", 
    flexDirection: 'column', 
    justifyContent: 'space-between',
  },
  flexRowEven: {
    display: 'flex', 
    flexDirection: 'row', 
    justifyContent: 'space-evenly'
  },
  flexRowCenter: {
    display: 'flex', 
    flexDirection: 'row', 
    justifyContent: 'center', 
  },
  flexColCenter: {
    display: 'flex', 
    flexDirection: 'column', 
    justifyContent: 'center', 
  },
  autoMargin: {
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  flexRowStart: {
    display: 'flex', 
    flexDirection: 'row', 
    justifyContent: 'flex-start'
  },
  flexRowEnd: {
    display: 'flex', 
    flexDirection: 'row', 
    alignItems: 'flex-end',
  },
  flexColStart: {
    display: 'flex', 
    flexDirection: 'column', 
    justifyContent: "flex-start"
  }
})

export default flexStyles