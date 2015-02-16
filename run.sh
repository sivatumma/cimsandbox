@echo off   
#env=dev node app.js
#echo  Open https://localhsot/

cd views
tools/deploy.sh
cd ..
nohup node app.js &

exit