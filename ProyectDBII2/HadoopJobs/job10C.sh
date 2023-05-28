#!/usr/bin/bash
# Directorio de este script
dir=$(dirname $(realpath $0))


hdfs dfs -rm -r /resultadoJob10C


pydoop submit --upload-file-to-cache Job10C.py  Job10C --num-reducers 1 --entry-point main  /MuertesHeridas /resultadoJob10C



