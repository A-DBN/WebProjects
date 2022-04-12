device=$(flutter devices)

devices=$(echo $device | tr "•" "\n")

if [[ $1 == 'emu' ]]
then
    for addr in $devices
    do
        if [[ "${addr}" =~ "emulator-" ]]
        then
            flutter run -d $addr 
        fi
    done
elif [[ $1 == "chrome" ]]
then
    flutter run -d chrome
else
    echo "Help : ./start.sh emu|chrome"
fi