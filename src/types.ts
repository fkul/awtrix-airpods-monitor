export interface BluetoothDevice {
  name: string;
  isConnected: boolean;
  [key: string]: string | number | boolean;
}
