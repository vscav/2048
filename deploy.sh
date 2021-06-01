#!/usr/bin/env sh

set -e

yarn build

cd dist

git init
git add -A
git commit -m 'Deployment'
git push -f git@github.com:vscav/2048.git master:gh-pages

cd -