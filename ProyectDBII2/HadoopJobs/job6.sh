
#!/usr/bin/bash

# Directorio de este script
dir=$(dirname $(realpath $0))


hdfs dfs -rm -r /resultadoPromedioMinMaxSubregion


pydoop submit --upload-file-to-cache Job6.py  Job6  --num-reducers 1 --entry-point main  /VictimasDeHomicidioPorSexo   /resultadoPromedioMinMaxSubregion



