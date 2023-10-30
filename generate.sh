#!/bin/sh
node_modules/protobufjs-cli/bin/pbjs -t static-module -w commonjs --es6 -o packages/connections/src/lib/utils/mitmProto.js packages/server/mitm.proto
node_modules/protobufjs-cli/bin/pbts -o packages/connections/src/lib/utils/mitmProto.d.ts packages/connections/src/lib/utils/mitmProto.js
