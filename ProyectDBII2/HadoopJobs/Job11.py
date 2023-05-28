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
        data['Value'] = float(parts[2])
        return data
            
            


class Reducer(api.Reducer):
    def __init__(self, context):
        super().__init__(context)
        context.set_status("Initializing reducer")

    def reduce(self, context):
        countryOrArea,year = context.key
        #This is due to the table having only the year 2012 for each country
        #Because of this, the difference between the first year and last year 
        #measured is 0 for each one, because there is only one year. (Yep, great!)
        listValues = list(context.values)
        value = listValues[0]
        difference = value-value
        finalStringKey = str(countryOrArea)+","+str(year)+","
        finalStringValue = str(difference)+","+str(value)
        context.emit(finalStringKey,finalStringValue)
        
        


def main():
    FACTORY = pipes.Factory(mapper_class=Mapper,
                            reducer_class=Reducer)
    pipes.run_task(FACTORY)
