
#!/usr/bin/bash

# Directorio de este script
dir=$(dirname $(realpath $0))

hdfs dfs -rm -r /resultadoJob1


pydoop submit --upload-file-to-cache Job1.py  Job1  --num-reducers 1 --entry-point main  /VictimasDeHomicidio  /resultadoJob1



