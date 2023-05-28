import pydoop.mapreduce.api as api
import pydoop.mapreduce.pipes as pipes
import logging

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

class Mapper(api.Mapper):
    def __init__(self, context):
        super().__init__(context)
        context.set_status("Initializing mapper")

    def map(self, context):
        data  = self.parse_line(context.value)
        context.emit((data['Country or Area'],data['Year']),data['Value'])
        
        

    def parse_line(self, line):
        parts = line.split(",")
        data = {}
        data['Country or Area'] = parts[0]
        data['Year'] = parts[1]
        data['Value'] = int(parts[2])
        return data
            
            


class Reducer(api.Reducer):
    def __init__(self, context):
        super().__init__(context)
        context.set_status("Initializing reducer")

    def reduce(self, context):
        countryOrArea, year = context.key
        values_list = list(context.values)
        sumTotal = sum(values_list)
        cantidadDeElementos = len(values_list)
        if cantidadDeElementos == 0:
            mean = sumTotal
        else:
            mean = float(sumTotal/cantidadDeElementos)
        maximum = max(values_list)
        filtered_data = [x for x in values_list if x != 0]
        if len(filtered_data)==0:
            minimum = 0
        else:
            minimum = min(filtered_data)
        finalStringKey = str(countryOrArea)+","+str(year)+","
        finalStringValue = str(mean)+","+str(maximum)+","+str(minimum)
        context.emit(finalStringKey,finalStringValue)
        


def main():
    FACTORY = pipes.Factory(mapper_class=Mapper,
                            reducer_class=Reducer)
    pipes.run_task(FACTORY)
