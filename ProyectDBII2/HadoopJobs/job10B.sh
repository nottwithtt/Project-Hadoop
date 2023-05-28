#!/usr/bin/bash
# Directorio de este script
dir=$(dirname $(realpath $0))


hdfs dfs -rm -r /resultadoJob10B


pydoop submit --upload-file-to-cache Job10B.py  Job10B --num-reducers 1 --entry-point main  /MuertesNoComunicables /resultadoJob10B



