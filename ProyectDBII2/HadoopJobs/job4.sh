#!/usr/bin/bash

# Directorio de este script
dir=$(dirname $(realpath $0))

hdfs dfs -rm -r /resultadoPromedioDeVictimasDeHomicidioPorSexo

pydoop submit --upload-file-to-cache Job4.py  Job4 --num-reducers 1 --entry-point main  /VictimasDeHomicidioPorSexo /resultadoPromedioDeVictimasDeHomicidioPorSexo


