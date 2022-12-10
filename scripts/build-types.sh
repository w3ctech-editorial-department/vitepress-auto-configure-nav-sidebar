#!/usr/bin/env bash

cp src/typings/*.ts types/typings
# 由于 rollup-plugin-typescript2 生成的内容不正确，所以需要手动修改
mv types/typings/index.ts types/typings/index.d.ts
