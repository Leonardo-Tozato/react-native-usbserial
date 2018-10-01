'use strict';

import {
  Platform,
  NativeModules,
  DeviceEventEmitter
} from 'react-native';
import UsbSerialDevice from './UsbSerialDevice';

const UsbSerialModule = NativeModules.UsbSerial;

export class UsbSerial {
    constructor() {
        if (Platform.OS != 'android') {
            throw 'Unfortunately only android is supported';
        }
    }

    getDeviceListAsync() {
        return UsbSerialModule.getDeviceListAsync();
    }

    openDeviceAsync(deviceObject = {}) {
        return UsbSerialModule.openDeviceAsync(deviceObject).then((usbSerialDevNativeObject) => {
            return new UsbSerialDevice(UsbSerialModule, usbSerialDevNativeObject);
        });
    }

    monitorDevice(handler) {
        if(this.eventListener) this.eventListener.remove();
        this.eventListener = DeviceEventEmitter.addListener('UsbSerialEvent', handler);
    }


}

