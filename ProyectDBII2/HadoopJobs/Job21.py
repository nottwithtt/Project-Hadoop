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
        context.emit((data['Country or Area'],data['Decade']), data['Value'])
        

    def parse_line(self, line):
        parts = line.split(",")
        data = {}
        data['Country or Area'] = parts[0]
        data['Year'] = parts[1]
        data['Value'] = float(parts[3])
        data['Decade'] = (int(data['Year'])//10)*10
        return data
            
            


class Reducer(api.Reducer):
    def __init__(self, context):
        super().__init__(context)
        context.set_status("Initializing reducer")

    def reduce(self, context):
        country, decade = context.key
        values_list = list(context.values)
        sumTotal = sum(values_list)
        finalStringKey = str(country)+","+str(decade)+","
        finalStringValue = str(sumTotal)
        context.emit(finalStringKey,finalStringValue)

def main():
    FACTORY = pipes.Factory(mapper_class=Mapper,
                            reducer_class=Reducer)
    pipes.run_task(FACTORY)
