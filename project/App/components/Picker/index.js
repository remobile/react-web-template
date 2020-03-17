'use strict';
const React = require('react');
const ReactNative = require('react-native');
const {
    StyleSheet,
    View,
} = ReactNative;
import Picker from './Picker';

module.exports = (pickerData, selectedValue, title) => {
    return new Promise(async(resolve) => {
        app.showModal(
            <View style={{ position:'absolute', bottom: 0, left: 0 }}>
                <Picker
                    ref={ref => { ref && (ref.isPickerShow() || ref.show()); }}
                    style={{ height: sr.th / 3 }}
                    showDuration={500}
                    showMask={false}
                    pickerBtnText={'确  定'}
                    pickerCancelBtnText={'取  消'}
                    selectedValue={selectedValue}
                    pickerData={pickerData}
                    onPickerDone={(value) => { app.closeModal(); resolve(value); }}
                    onPickerCancel={app.closeModal}
                    />
            </View>
        );
    });
};
module.exports.hide = () => {
    app.closeModal();
};
