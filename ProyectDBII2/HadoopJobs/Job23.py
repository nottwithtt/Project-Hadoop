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
        context.emit(data['Country'],(data['1990s'],data['2000s'],data['2010s']))

    def parse_line(self, line):
        parts = line.split(",")
        data = {}
        listaNoventas= [int(x) for x in parts[1:6]]
        sumNumerosNoventas = sum(listaNoventas)
        listaDosMiles=  [int(x) for x in parts[6:17]]
        sumNumerosDosMiles = sum(listaDosMiles)
        listaDosMilDiez=  [int(x) for x in parts[17:]]
        sumNumerosDosMilDiez= sum(listaDosMilDiez)
        data['Country'] = parts[0]
        data['2000s'] = sumNumerosDosMiles
        data['1990s'] =  sumNumerosNoventas
        data['2010s'] = sumNumerosDosMilDiez      
        return data
            
            


class Reducer(api.Reducer):
    def __init__(self, context):
        super().__init__(context)
        context.set_status("Initializing reducer")

    def reduce(self, context):
        country = context.key
        listValues = list(context.values)
        for val in listValues:
            Noventas,DosMiles,DosMilDiez = val
        finalStringKey = str(country)+","+"1990s,2000s,2010s,"
        finalStringValue = str(Noventas)+","+str(DosMiles)+","+str(DosMilDiez)
        context.emit(finalStringKey, finalStringValue)

def main():
    FACTORY = pipes.Factory(mapper_class=Mapper,
                            reducer_class=Reducer)
    pipes.run_task(FACTORY)
