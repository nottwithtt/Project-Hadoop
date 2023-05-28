#!/usr/bin/bash
# Directorio de este script
dir=$(dirname $(realpath $0))


hdfs dfs -rm -r /resultadoJob10A


pydoop submit --upload-file-to-cache Job10A.py  Job10A --num-reducers 1 --entry-point main  /MuertesComunicables /resultadoJob10A



