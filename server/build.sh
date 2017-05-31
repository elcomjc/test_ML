#!/bin/bash

rm -rf static
mkdir static
cd ../client/
npm install
npm run build
cp -r dist/* ../server/static/
cd ../server/
npm install
