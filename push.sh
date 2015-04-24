#!/usr/bin/env bash
git add ${BASE}.${HASH}.{js,js.map} && \	
git commit -a -m "Updated hash ${HASH}" && \
git push origin gh-pages && \
echo "gh-pages now running $HASH " && \
echo "http://jspears.github.io/subschema"
