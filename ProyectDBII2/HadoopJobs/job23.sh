#!/usr/bin/bash
# Directorio de este script
dir=$(dirname $(realpath $0))


hdfs dfs -rm -r /resultadoJob23


pydoop submit --upload-file-to-cache Job23.py  Job23 --num-reducers 1 --entry-point main  /TurismoSaliente  /resultadoJob23



