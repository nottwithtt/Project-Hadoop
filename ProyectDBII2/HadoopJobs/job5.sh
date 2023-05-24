
#!/usr/bin/bash

# Directorio de este script
dir=$(dirname $(realpath $0))

hdfs dfs -rm -r /resultadoJob5


pydoop submit --upload-file-to-cache Job5.py  Job5  --num-reducers 1 --entry-point main  /VictimasDeHomicidioPorSexo  /resultadoJob5



