#!/usr/bin/bash
# Directorio de este script
dir=$(dirname $(realpath $0))


hdfs dfs -rm -r /resultadoPromedioMinMaxSubregionSexoDecada


pydoop submit --upload-file-to-cache Job8.py  Job8  --num-reducers 1 --entry-point main  /VictimasDeHomicidioPorSexo   /resultadoPromedioMinMaxSubregionSexoDecada



