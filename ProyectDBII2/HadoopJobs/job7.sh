#!/usr/bin/bash
# Directorio de este script
dir=$(dirname $(realpath $0))


hdfs dfs -rm -r /resultadoPromedioMinMaxRegionSexoDecada


pydoop submit --upload-file-to-cache Job7.py  Job7  --num-reducers 1 --entry-point main  /VictimasDeHomicidioPorSexo   /resultadoPromedioMinMaxRegionSexoDecada



