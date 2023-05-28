#!/usr/bin/bash
# Directorio de este script
dir=$(dirname $(realpath $0))


hdfs dfs -rm -r /resultadoJob15


pydoop submit --upload-file-to-cache Job15.py  Job15  --num-reducers 1 --entry-point main  /FertilidadAdolescentesPor1000   /resultadoJob15



