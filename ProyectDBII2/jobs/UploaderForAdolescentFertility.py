import os
import pydoop.hdfs as hdfs
import pandas as pd
from io import StringIO
import re

# Get the current directory path
current_directory = os.getcwd()

# List all files in the current directory
file_list = os.listdir(current_directory)
file_paths = []

with open("adolescentFertility.csv", 'rb') as file:
    csv_bytes = file.read()

    # Decode the CSV bytes using UTF-8
    csv_string = csv_bytes.decode('utf-8')
    # Load the CSV string into a DataFrame
    df = pd.read_csv(StringIO(csv_string))

    df_values = df.values
    pd.DataFrame(df_values).to_csv("fertilityAdolescent.csv", index=False, header=False)

hdfs_dir_two = '/FertilidadAdolescentesPor1000'
hdfs.put('fertilityAdolescent.csv',hdfs_dir_two)