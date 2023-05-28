#!/usr/bin/bash
# Directorio de este script
dir=$(dirname $(realpath $0))


hdfs dfs -rm -r /resultadoJob21


pydoop submit --upload-file-to-cache Job21.py  Job21 --num-reducers 1 --entry-point main  /ExpectativaDeVida  /resultadoJob21



