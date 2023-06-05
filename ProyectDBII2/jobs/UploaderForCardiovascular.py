import os
import pydoop.hdfs as hdfs
import pandas as pd
from io import StringIO
import re

with open("cardiovascular.csv", 'rb') as file:
    csv_bytes = file.read()

    # Decode the CSV bytes using UTF-8
    csv_string = csv_bytes.decode('utf-8')
    # Load the CSV string into a DataFrame
    df = pd.read_csv(StringIO(csv_string))

    df_values = df.values
    pd.DataFrame(df_values).to_csv("uploadedCardiovascular.csv", index=False, header=False)

hdfs_dir = '/MuertesPorCardiovascular'
hdfs.put("uploadedCardiovascular.csv",hdfs_dir)