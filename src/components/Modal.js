import React from 'react'
import { StyleSheet, Modal, View } from 'react-native'
import { APP_SIZE } from '../configs/appConstants'
import { styles } from '../configs/theme'

export const AppModal = (props) => {
  return (
    <Modal animationType="fade" transparent={true} {...props}>
      <View style={[style.modalContainer]}>
        {props.children}
      </View>
    </Modal>
  )
}

const style = StyleSheet.create({
  modalContainer: {
    height: '100%',
    // width: (APP_SIZE.widthWindow * 2) / 3,
    backgroundColor: 'rgba(0,0,0,0.5)',
    ...styles.center,
    // ...styles.container
  },
})