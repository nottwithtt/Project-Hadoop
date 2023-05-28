#!/usr/bin/bash
# Directorio de este script
dir=$(dirname $(realpath $0))


hdfs dfs -rm -r /resultadoJob11


pydoop submit --upload-file-to-cache Job11.py  Job11 --num-reducers 1 --entry-point main  /MediaEdad /resultadoJob11



