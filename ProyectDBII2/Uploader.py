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

with open("homicide2.csv", 'rb') as file:
    csv_bytes = file.read()

    # Decode the CSV bytes using UTF-8
    csv_string = csv_bytes.decode('utf-8')
    # Load the CSV string into a DataFrame
    df = pd.read_csv(StringIO(csv_string))
    num_rows = df.shape[0]
    print("Number of rows (shape):", num_rows)

    positionOfDrop = 24
    columns_to_keep = df.columns[:positionOfDrop+1]
    # Drop columns after the specified position
    start_column = '2000'
    end_column = '2020'
    df = df[columns_to_keep]

    male_totals = []
    male_subset = df[df['Gender'] == 'Male']
    for index,row in male_subset.iterrows():
        male_sum = row.loc[start_column:end_column].sum()
        male_totals.append(male_sum)

    female_subset = df[df['Gender'] == 'Female']
    female_totals = []
    for index,row in female_subset.iterrows():
        female_sum = row.loc[start_column:end_column].sum()
        female_totals.append(female_sum)

    total_count = [x + y for x, y in zip(male_totals, female_totals)]
    duplicated_list = [item for item in total_count for _ in range(2)]
    df['Total'] = duplicated_list
    df_values = df.values
    pd.DataFrame(df_values).to_csv("homicidesTwo.csv", index=False, header=False)


hdfs_dir_two = '/VictimasDeHomicidioPorSexo'
hdfs.put('homicidesTwo.csv',hdfs_dir_two)
