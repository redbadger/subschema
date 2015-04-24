#!/usr/bin/env bash
DIR=${1:-../subschema}
FILE=${1:-../subschema/.build/app}
HASH=$(md5 -q ${FILE}.js)
BASE=$(basename $FILE)
OPWD=$PWD
function check(){
	open index.html &
}


function push(){
	git add ${BASE}.${HASH}.{js,js.map} && \	
	git commit -a -m "Updated hash ${HASH}" && \
	git status && \	
	git push origin gh-pages && \
	echo "gh-pages now running $HASH " && \
	echo "http://jspears.github.io/subschema"
}

rm -f ./${BASE}.*.{js,js.map}
cd $DIR && \
NODE_ENV=production npm run webpack && \
cd $OPWD && \
cp ${FILE}.js.map ${BASE}.${HASH}.js.map && \
sed "s,\(src=\"\).*\(\.js\"\),\1${BASE}\.${HASH}\2,"<$DIR/public/index.html>index.html && \
sed "s,\(\/\/# sourceMappingURL=\).*\(.map.*\),\1${BASE}.${HASH}.js\2,"<${FILE}.js>${BASE}.${HASH}.js 
check
read -p "Do you want to push[y|Y]" dp;
case $dp in
	y|Y) push; break;;
	n|N) echo "Don't forget to publish"; exit 0;;
esac