#!/usr/bin/bash
# Directorio de este script
dir=$(dirname $(realpath $0))


hdfs dfs -rm -r /resultadoJob18


pydoop submit --upload-file-to-cache Job18.py  Job18 --num-reducers 1 --entry-point main  /FertilidadTotal   /resultadoJob18



