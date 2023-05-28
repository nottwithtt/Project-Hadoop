#!/usr/bin/bash
# Directorio de este script
dir=$(dirname $(realpath $0))


hdfs dfs -rm -r /resultadoJob22


pydoop submit --upload-file-to-cache Job22.py  Job22 --num-reducers 1 --entry-point main  /TurismoEntrante  /resultadoJob22



