#!/usr/bin/bash
# Directorio de este script
dir=$(dirname $(realpath $0))


hdfs dfs -rm -r /resultadoJob9A


pydoop submit --upload-file-to-cache Job9A.py  Job9A  --num-reducers 1 --entry-point main  /MuertesPorCancer  /resultadoJob9A



