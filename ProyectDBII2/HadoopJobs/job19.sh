#!/usr/bin/bash
# Directorio de este script
dir=$(dirname $(realpath $0))


hdfs dfs -rm -r /resultadoJob19


pydoop submit --upload-file-to-cache Job19.py  Job19 --num-reducers 1 --entry-point main  /GastoEnSaludNoDelTotal   /resultadoJob19



