sudo -i
cd /opt/cim-sandbox
git checkout *
git fetch
git pull origin sandbox
chmod a+x ui/tools/deploy.sh
ui/tools/deploy.sh
killall -9 node
nohup node app.js &


git checkout ui/tools/deploy.sh
exit
exit
