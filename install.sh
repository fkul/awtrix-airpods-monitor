#!/bin/bash
sudo cp -R ./bin /opt/awtrix-airpods-monitor
sudo chown -R root:wheel /opt/awtrix-airpods-monitor
sudo cp ./com.awtrixAirPodsMonitor.plist /Library/LaunchDaemons/com.awtrixAirPodsMonitor.plist
sudo chown root:wheel /Library/LaunchDaemons/com.awtrixAirPodsMonitor.plist
sudo launchctl load /Library/LaunchDaemons/com.awtrixAirPodsMonitor.plist
