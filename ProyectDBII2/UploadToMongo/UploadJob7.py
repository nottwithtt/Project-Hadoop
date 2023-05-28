from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi

uri = 'mongodb+srv://nottwithtt:Nicolita1998%2B@cluster0.gi2w4fi.mongodb.net/dbProjectII?retryWrites=true&w=majority'

# Create a new client and connect to the server
client = MongoClient(uri, server_api=ServerApi('1'))

# Send a ping to confirm a successful connection
try:
    client.admin.command('ping')
    print("Pinged your deployment. You successfully connected to MongoDB!")
except Exception as e:
    print(e)

# Access a database and collection
db = client['dbProjectII']
collection = db['Job7']

documents = []
with open('resultadoJob7', 'r') as file:
    # Iterate over each line in the file
    for line in file:
        # Process the line
        clean_text = line.replace(" ", "").replace("\t", "").replace("\n", "")
        separatedStrings = clean_text.split(",")
        document = {'Region':separatedStrings[0],'Genero':separatedStrings[1],'Decada': separatedStrings[2],
        'PromedioHomicidios':float(separatedStrings[3]),'Max':int(separatedStrings[4]),'Min':int(separatedStrings[5])}
        documents.append(document)
        print(clean_text)
          # Print the line after removing leading/trailing whitespace
collection.insert_many(documents)

