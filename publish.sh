#!/usr/bin/env bash
DIR=${1:-../subschema}
OPWD=$PWD
HASH=
function check(){
	open index.html &
}


function push(){
	git add app.${HASH}.{js,js.map} && \
	git commit -a -m "Updated hash ${HASH}" && \
	git status && \	
	git push origin gh-pages && \
	echo "gh-pages now running $HASH " && \
	echo "http://jspears.github.io/subschema"
}
function build(){
	cd $DIR
	npm run build-demo
	cd $OPWD
	HASH=$(ls app.*.js | sed 's,app\.\(.*\)\.js,\1,g' )
}
rm -f ./${BASE}.*.{js,js.map}
build  && \
sed "s,\(src=\"\).*\(\.js\"\),\1app\.${HASH}\2,"<$DIR/public/index.html>index.html
check
read -p "Do you want to push[y|Y]" dp;
case $dp in
	y|Y) push; break;;
	n|N) echo "Don't forget to publish"; exit 0;;
esac