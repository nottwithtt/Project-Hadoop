#!/usr/bin/bash

# Directorio de este script
dir=$(dirname $(realpath $0))

hdfs dfs -rm -r /resultadoPromedioMaxMinHomicidiosPorRegion


pydoop submit --upload-file-to-cache Job2.py  Job2  --num-reducers 1 --entry-point main  /VictimasDeHomicidio  /resultadoPromedioMaxMinHomicidiosPorRegion



