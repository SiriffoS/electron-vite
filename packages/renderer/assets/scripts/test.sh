echo "Hello World"

echo $1 #argument 1 for the script
echo $2 #argument 2 for the script

pkill -KILL -f "Ableton Live" #kill ableton process. Same as "ableton:kill"
#rm -f ../midi-script/AbletonJS/*.pyc # remove compiled bytecode of imported python lib. Same as "ableton:clean"
echo $(pwd)
echo $(pwd)/..
#set -- /Applications/Ableton*11*/Contents/App-Resources/MIDI\ Remote\ Scripts && rm -rf $1/AbletonJS && cp -r /Applications/Studiocamp.app/Contents/Resources/midi-script "$1/AbletonJS" # rm -rf $1/AbletonJS/_Framework #Copy remote scripts from AbletonJS to ableton. Unbundled version
open /Applications/Ableton*11* 
