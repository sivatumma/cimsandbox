cd views
chmod a+x tools/deploy.sh
tools/deploy.sh
cd ..
killall -9 node
nohup node app.js &

exit