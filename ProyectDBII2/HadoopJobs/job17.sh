#!/usr/bin/bash
# Directorio de este script
dir=$(dirname $(realpath $0))


hdfs dfs -rm -r /resultadoJob17


pydoop submit --upload-file-to-cache Job17.py  Job17 --num-reducers 1 --entry-point main  /MuertesBebes   /resultadoJob17



