#!/usr/bin/bash
# Directorio de este script
dir=$(dirname $(realpath $0))


hdfs dfs -rm -r /resultadoJob14


pydoop submit --upload-file-to-cache Job14.py  Job14  --num-reducers 1 --entry-point main  /FertilidadAdolescentesPor1000   /resultadoJob14



