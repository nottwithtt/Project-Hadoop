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

with open("homicide1.csv", 'rb') as file:
    csv_bytes = file.read()

    # Decode the CSV bytes using UTF-8
    csv_string = csv_bytes.decode('utf-8')
    # Load the CSV string into a DataFrame
    df = pd.read_csv(StringIO(csv_string))
    num_rows = df.shape[0]
    print("Number of rows (shape):", num_rows)

    positionOfDrop = 23
    columns_to_keep = df.columns[:positionOfDrop+1]
    # Drop columns after the specified position
    start_column = '2000'
    end_column = '2020'
    df = df[columns_to_keep]

    year_subset = df[['2000','2001', '2002', '2003', '2004', '2005', '2006', '2007','2008','2009','2010','2011','2012','2013','2014','2015','2016','2017','2018','2019','2020']]
    print(year_subset)
    total_sum = 0
    for index,row in year_subset.iterrows():
        sum_row = row.loc[start_column:end_column].sum()
        total_sum+=sum_row



    total_list = [total_sum for x in range(num_rows)]
    df['Total'] = total_list
    df_region = df["Region"]

    df_values = df.values
    pd.DataFrame(df_values).to_csv("homicidesOne.csv", index=False, header=False)


hdfs_dir_two = '/VictimasDeHomicidio'
hdfs.put('homicidesOne.csv',hdfs_dir_two)


