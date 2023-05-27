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
        logger.info("Parsing: %s",context.value)
        data  = self.parse_line(context.value)
        logger.info(data)
        context.emit((data['Country or Area'],data['Quartile']),(data['Decade'],data['Value']))

    def parse_line(self, line):
        parts = line.split(",")
        data = {}
        data['Country or Area'] = parts[0]
        data['Year(s)'] = parts[1]
        data['Value'] = float(parts[6])
        data['Quartile'] = parts[5]
        data['Decade'] = (int(data['Year(s)'])//10)*10
        return data
            
            


class Reducer(api.Reducer):
    def __init__(self, context):
        super().__init__(context)
        context.set_status("Initializing reducer")

    def reduce(self, context):
        country,quartile = context.key
        sumFor90s = 0
        sumFor00s = 0
        sumFor10s = 0
        sumForAll = 0
        for val in context.values:
            StringDecade,Stringdata = val
            decade = int(StringDecade)
            data = float(Stringdata)
            if decade == 1990:
                sumFor90s+= data
            elif decade == 2000:
                sumFor00s+=data
            elif decade == 2010:
                sumFor10s+=data
            sumForAll+=data
        porcentage90s = (sumFor90s/sumForAll)*100
        porcentage00s = (sumFor00s/sumForAll)*100
        porcentage10s = (sumFor10s/sumForAll)*100
        finalStringKey = str(country)+","+str(quartile)+",1990s,2000s,2010s,"
        finalStringValue = str(porcentage90s)+","+str(porcentage00s)+","+str(porcentage10s)
        context.emit(finalStringKey, finalStringValue)

def main():
    FACTORY = pipes.Factory(mapper_class=Mapper,
                            reducer_class=Reducer)
    pipes.run_task(FACTORY)
