#!/usr/bin/bash
# Directorio de este script
dir=$(dirname $(realpath $0))


hdfs dfs -rm -r /resultadoJob16


pydoop submit --upload-file-to-cache Job16.py  Job16  --num-reducers 1 --entry-point main  /MuertesBebes   /resultadoJob16



