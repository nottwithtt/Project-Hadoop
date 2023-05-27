#!/usr/bin/bash
# Directorio de este script
dir=$(dirname $(realpath $0))


hdfs dfs -rm -r /resultadoJob9C


pydoop submit --upload-file-to-cache Job9C.py  Job9C  --num-reducers 1 --entry-point main  /MuertesPorRespiratorio /resultadoJob9C



