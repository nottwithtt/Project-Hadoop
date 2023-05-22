#!/usr/bin/bash

# Directorio de este script
dir=$(dirname $(realpath $0))

hdfs dfs -rm -r /resultadoPromedioMaxMinHomicidiosPorSubRegion


pydoop submit --upload-file-to-cache Job3.py  Job3  --num-reducers 1 --entry-point main  /VictimasDeHomicidio  /resultadoPromedioMaxMinHomicidiosPorSubRegion



