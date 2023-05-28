#!/usr/bin/bash
# Directorio de este script
dir=$(dirname $(realpath $0))


hdfs dfs -rm -r /resultadoJob12


pydoop submit --upload-file-to-cache Job12.py  Job12 --num-reducers 1 --entry-point main  /MediaEdad /resultadoJob12



