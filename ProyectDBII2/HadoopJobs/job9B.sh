#!/usr/bin/bash
# Directorio de este script
dir=$(dirname $(realpath $0))


hdfs dfs -rm -r /resultadoJob9B


pydoop submit --upload-file-to-cache Job9B.py  Job9B  --num-reducers 1 --entry-point main  /MuertesPorCardiovascular  /resultadoJob9B



