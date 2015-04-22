#!/usr/bin/env bash
DIR=${1:-../subschema}
FILE=${1:-../subschema/.build/app}
HASH=$(md5 -q ${FILE}.js)
BASE=$(basename $FILE)
OPWD=$PWD
rm -f ./${BASE}.*.{js,js.map}
cd $DIR && \
npm run webpack && \
cd $OPWD && \
cp ${FILE}.js.map ${BASE}.${HASH}.js.map && \
sed "s,\(src=\"\).*\(\.js\"\),\1${BASE}\.${HASH}\2,"<$DIR/public/index.html>index.html && \
sed "s,\(\/\/# sourceMappingURL=\).*\(.map.*\),\1${BASE}.${HASH}.js\2,"<${FILE}.js>${BASE}.${HASH}.js && \
	
git add ${BASE}.${HASH}.js* && \
git commit -a -m "Updated hash ${HASH}" && \
git push origin gh-pages && \
echo "gh-pages now running $HASH " && \
echo "http://jspears.github.io/subschema"
