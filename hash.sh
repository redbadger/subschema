#!/usr/bin/env node
FILE=${1:-../subschema/.build/app}
HASH=$(md5 -q ${FILE}.js)
BASE=$(basename $FILE)
cp ${FILE}.js ${BASE}.${HASH}.js && \
cp ${FILE}.js.map ${BASE}.${HASH}.js.map && \
sed "s,\(src=\"\).*\(\.js\"\),\1${BASE}\.${HASH}\2,"<index.html.tmpl>index.html && \
git add ${BASE}.${HASH}.js* && \
git commit -a -m "Updated hash ${HASH}" && \
git push origin gh-pages && \
echo "gh-pages now running $HASH " && \
echo "http://jspears.github.io/subschema"
