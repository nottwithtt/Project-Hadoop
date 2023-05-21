import pydoop.mapreduce.api as api
import pydoop.mapreduce.pipes as pipes
import logging

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)



VARIABLES = ['Region', 'Subregion', 'Country', 'Gender','2000','2001', '2002', '2003', '2004', '2005', '2006', '2007',
'2008','2009','2010','2011','2012','2013','2014','2015','2016','2017','2018','2019','2020','Total']

class Mapper(api.Mapper):
    def __init__(self, context):
        super().__init__(context)
        context.set_status("Initializing mapper")

    def map(self, context):
        data  = self.parse_line(context.value)
        country = data['Country']
        gender = data['Gender']
        totalGender = data['TotalGeneros']
        total = data['Total']
        context.emit((country,gender),(totalGender,total))
        

    def parse_line(self, line):
        parts = line.split(",")
        subset_variables = parts[4:24]
        int_list = [int(num) for num in subset_variables]
        subset_list_sum = sum(int_list)
        data = {}
        data['Region'] = parts[0]
        data['Subregion'] = parts[1]
        data['Country'] = parts[2]
        data['Gender'] = parts[3]
        data['2000'] = int(parts[4])
        data['2001'] = int(parts[5])
        data['2002'] = int(parts[6])
        data['2003'] = int(parts[7])
        data['2004'] = int(parts[8])
        data['2005'] = int(parts[9])
        data['2006'] = int(parts[10])
        data['2007'] = int(parts[11])
        data['2008'] = int(parts[12])
        data['2009'] = int(parts[13])
        data['2010'] = int(parts[14])
        data['2011'] = int(parts[15])
        data['2012'] = int(parts[16])
        data['2013'] = int(parts[17])
        data['2014'] = int(parts[18])
        data['2015'] = int(parts[19])
        data['2016'] = int(parts[20])
        data['2017'] = int(parts[21])
        data['2018'] = int(parts[22])
        data['2019'] = int(parts[23])
        data['2020'] = int(parts[24])
        data['Total'] = int(parts[25])
        data['TotalGeneros'] =  subset_list_sum
        return data
            
            


class Reducer(api.Reducer):
    def __init__(self, context):
        super().__init__(context)
        context.set_status("Initializing reducer")

    def reduce(self, context):
        country, gender = context.key
        for val in context.values:
            totalGenero,total = val
        if total == 0: 
            resultado = float(0)
        else:
            resultado = float(float(totalGenero)/float(total))
        context.emit((country,gender), resultado)

def main():
    FACTORY = pipes.Factory(mapper_class=Mapper,
                            reducer_class=Reducer)
    pipes.run_task(FACTORY)
