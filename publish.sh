#!/usr/bin/env bash
DIR=${1:-../subschema}
FILE=${1:-../subschema/.build/app}
HASH=$(md5 -q ${FILE}.js)
BASE=$(basename $FILE)
OPWD=$PWD

rm -f ./${BASE}.*.{js,js.map}
cd $DIR && \
NODE_ENV=production npm run webpack && \
cd $OPWD && \
cp ${FILE}.js.map ${BASE}.${HASH}.js.map && \
sed "s,\(src=\"\).*\(\.js\"\),\1${BASE}\.${HASH}\2,"<$DIR/public/index.html>index.html && \
sed "s,\(\/\/# sourceMappingURL=\).*\(.map.*\),\1${BASE}.${HASH}.js\2,"<${FILE}.js>${BASE}.${HASH}.js 
echo "Now run push.sh"
