#!/usr/bin/bash
# Directorio de este script
dir=$(dirname $(realpath $0))


hdfs dfs -rm -r /resultadoJob13


pydoop submit --upload-file-to-cache Job13.py  Job13 --num-reducers 1 --entry-point main  /PoblacionTotal /resultadoJob13



