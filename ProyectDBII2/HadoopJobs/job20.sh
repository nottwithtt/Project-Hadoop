#!/usr/bin/bash
# Directorio de este script
dir=$(dirname $(realpath $0))


hdfs dfs -rm -r /resultadoJob20


pydoop submit --upload-file-to-cache Job20.py  Job20 --num-reducers 1 --entry-point main  /GastoEnSalud  /resultadoJob20



