from bs4 import BeautifulSoup
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support import expected_conditions as EC
import requests
import time
import csv

driver = webdriver.Chrome()
driver.get("http://data.un.org/Explorer.aspx")

time.sleep(10)

listHomicideLinks = []
listWHOMortality = []
listWHODemoAndSocie = []
listWHOEquity = []
listWHOHealthSystem = []
listWHOMortaAndHealth = []
listTurist = []

def links():
    getTableHomicide1()
    getTableHomicide2()
    getAllCausesData()
    getCancerData()
    getCardiovasularData()
    getChronicRespiratoryData()
    getCommunicableData()
    getInjuriesData()
    getNoncommunicableData()
    getPopulationData()
    getMediaAge()
    getAdolescentFertility()
    getInfantMortality()
    getTotalFertility()
    getGeneralExpenditurePercentage()
    getGeneralExpenditure()
    getlifeExpectancy()
    getInboundTourism()
    getOutboundTourism()
    print("Exit")

def getTableHomicide1():
    nombre = "homicide1.csv"
    driver.get(listHomicideLinks[0])
    timeSleep(5)

    tableContent = driver.find_elements(By.TAG_NAME, 'tbody')[1]
    
    rows = tableContent.find_elements(By.TAG_NAME, 'tr')
    lenTable = len(rows)

    #print(tableContent.get_attribute('outerHTML'))
    with open(nombre, "w", newline="",encoding='utf-8') as archivo_csv:
        writer = csv.writer(archivo_csv)

        for i in range(0,lenTable - 74):
            if (i >= 1):
                cols = rows[i].find_elements(By.TAG_NAME, 'td')
                lenCol = len(cols)

                listRow = []
                for j in range(0, lenCol - 1):
                    if (j != 3 ):
                        if (cols[j].text == "" or cols[j].text == "0"):
                            listRow.append("0")
                        else:
                            listRow.append(cols[j].text)
                writer.writerow(listRow)


    print("Archivo CSV creado exitosamente.")

def getTableHomicide2():
    nombre = "homicide2.csv"
    driver.get(listHomicideLinks[1])
    timeSleep(5)

    tableContent = driver.find_elements(By.TAG_NAME, 'tbody')[1]
    
    rows = tableContent.find_elements(By.TAG_NAME, 'tr')
    lenTable = len(rows)


    #print(tableContent.get_attribute('outerHTML'))
    with open(nombre, "w", newline="",encoding='utf-8') as archivo_csv:
        writer = csv.writer(archivo_csv)

        list1 = []
        for i in range(0,lenTable - 45):
            cols = rows[i].find_elements(By.TAG_NAME, 'td')
            lenCol = len(cols)

            listRow = []

            if (i > 1):
                for j in range(0, lenCol):
                    if (j != 4 ):
                        if (cols[j].text == "" or cols[j].text == "0"):
                            listRow.append("0")
                        else:
                            listRow.append(cols[j].text)
                writer.writerow(listRow)
            elif(i == 0):
                for j in range(0, lenCol):
                    if( j < 4 ):
                        list1.append(cols[j].text)
            elif(i == 1):
                for j in range(0, lenCol):
                    list1.append(cols[j].text)
                writer.writerow(list1)


    print("Archivo CSV creado exitosamente.")

def getAllCausesData():
    nombre = "allCauses.csv"
    driver.get(listWHOMortality[0])
    timeSleep(5)

    with open(nombre, "w", newline="") as archivo_csv:
            writer = csv.writer(archivo_csv)

            for count in range(1,5):
                timeSleep(5)
                tableContent = driver.find_elements(By.TAG_NAME, 'tbody')[1]
                
                rows = tableContent.find_elements(By.TAG_NAME, 'tr')
                lenTable = len(rows)

                #print(tableContent.get_attribute('outerHTML'))

                for i in range(0,lenTable):
                    if( i == 0 and count == 1):
                        cols = rows[i].find_elements(By.TAG_NAME, 'th')
                        lenCol = len(cols)

                        listRow = []
                        for j in range(0, lenCol - 1):
                            listRow.append(cols[j].text)
                        writer.writerow(listRow)
                    elif(i > 0):
                        cols = rows[i].find_elements(By.TAG_NAME, 'td')
                        lenCol = len(cols)

                        listRow = []
                        for j in range(0, lenCol - 1):
                            listRow.append(cols[j].text)
                        writer.writerow(listRow)

                if(count < 4):
                    clickButton(driver.find_element(By.ID, 'linkNextB'))

    print("Archivo CSV creado exitosamente.")

def getCancerData():
    nombre = "cancer.csv"
    driver.get(listWHOMortality[1])
    timeSleep(5)

    with open(nombre, "w", newline="") as archivo_csv:
            writer = csv.writer(archivo_csv)

            for count in range(1,5):
                timeSleep(5)
                tableContent = driver.find_elements(By.TAG_NAME, 'tbody')[1]
                
                rows = tableContent.find_elements(By.TAG_NAME, 'tr')
                lenTable = len(rows)

                #print(tableContent.get_attribute('outerHTML'))

                for i in range(0,lenTable):
                    if( i == 0 and count == 1):
                        cols = rows[i].find_elements(By.TAG_NAME, 'th')
                        lenCol = len(cols)

                        listRow = []
                        for j in range(0, lenCol - 1):
                            listRow.append(cols[j].text)
                        writer.writerow(listRow)
                    elif(i > 0):
                        cols = rows[i].find_elements(By.TAG_NAME, 'td')
                        lenCol = len(cols)

                        listRow = []
                        for j in range(0, lenCol - 1):
                            listRow.append(cols[j].text)
                        writer.writerow(listRow)

                if(count < 4):
                    clickButton(driver.find_element(By.ID, 'linkNextB'))

    print("Archivo CSV creado exitosamente.")

def getCardiovasularData():
    nombre = "cardiovasular.csv"
    driver.get(listWHOMortality[2])
    timeSleep(5)

    with open(nombre, "w", newline="",encoding='utf-8') as archivo_csv:
            writer = csv.writer(archivo_csv)

            for count in range(1,5):
                timeSleep(5)
                tableContent = driver.find_elements(By.TAG_NAME, 'tbody')[1]
                
                rows = tableContent.find_elements(By.TAG_NAME, 'tr')
                lenTable = len(rows)

                #print(tableContent.get_attribute('outerHTML'))

                for i in range(0,lenTable):
                    if( i == 0 and count == 1):
                        cols = rows[i].find_elements(By.TAG_NAME, 'th')
                        lenCol = len(cols)

                        listRow = []
                        for j in range(0, lenCol - 1):
                            listRow.append(cols[j].text)
                        writer.writerow(listRow)
                    elif(i > 0):
                        cols = rows[i].find_elements(By.TAG_NAME, 'td')
                        lenCol = len(cols)

                        listRow = []
                        for j in range(0, lenCol - 1):
                            listRow.append(cols[j].text)
                        writer.writerow(listRow)

                if(count < 4):
                    clickButton(driver.find_element(By.ID, 'linkNextB'))

    print("Archivo CSV creado exitosamente.")

def getChronicRespiratoryData():
    nombre = "chronicRespiratory.csv"
    driver.get(listWHOMortality[3])
    timeSleep(5)

    with open(nombre, "w", newline="",encoding='utf-8') as archivo_csv:
            writer = csv.writer(archivo_csv)

            for count in range(1,5):
                timeSleep(5)
                tableContent = driver.find_elements(By.TAG_NAME, 'tbody')[1]
                
                rows = tableContent.find_elements(By.TAG_NAME, 'tr')
                lenTable = len(rows)

                #print(tableContent.get_attribute('outerHTML'))

                for i in range(0,lenTable):
                    if( i == 0 and count == 1):
                        cols = rows[i].find_elements(By.TAG_NAME, 'th')
                        lenCol = len(cols)

                        listRow = []
                        for j in range(0, lenCol - 1):
                            listRow.append(cols[j].text)
                        writer.writerow(listRow)
                    elif(i > 0):
                        cols = rows[i].find_elements(By.TAG_NAME, 'td')
                        lenCol = len(cols)

                        listRow = []
                        for j in range(0, lenCol - 1):
                            listRow.append(cols[j].text)
                        writer.writerow(listRow)

                if(count < 4):
                    clickButton(driver.find_element(By.ID, 'linkNextB'))

    print("Archivo CSV creado exitosamente.")

def getCommunicableData():
    nombre = "communicable.csv"
    driver.get(listWHOMortality[4])
    timeSleep(5)

    with open(nombre, "w", newline="",encoding='utf-8') as archivo_csv:
            writer = csv.writer(archivo_csv)

            for count in range(1,5):
                timeSleep(5)
                tableContent = driver.find_elements(By.TAG_NAME, 'tbody')[1]
                
                rows = tableContent.find_elements(By.TAG_NAME, 'tr')
                lenTable = len(rows)

                #print(tableContent.get_attribute('outerHTML'))

                for i in range(0,lenTable):
                    if( i == 0 and count == 1):
                        cols = rows[i].find_elements(By.TAG_NAME, 'th')
                        lenCol = len(cols)

                        listRow = []
                        for j in range(0, lenCol - 1):
                            listRow.append(cols[j].text)
                        writer.writerow(listRow)
                    elif(i > 0):
                        cols = rows[i].find_elements(By.TAG_NAME, 'td')
                        lenCol = len(cols)

                        listRow = []
                        for j in range(0, lenCol - 1):
                            listRow.append(cols[j].text)
                        writer.writerow(listRow)

                if(count < 4):
                    clickButton(driver.find_element(By.ID, 'linkNextB'))

    print("Archivo CSV creado exitosamente.")

def getInjuriesData():
    nombre = "injuries.csv"
    driver.get(listWHOMortality[5])
    timeSleep(5)

    with open(nombre, "w", newline="",encoding='utf-8') as archivo_csv:
            writer = csv.writer(archivo_csv)

            for count in range(1,5):
                timeSleep(5)
                tableContent = driver.find_elements(By.TAG_NAME, 'tbody')[1]
                
                rows = tableContent.find_elements(By.TAG_NAME, 'tr')
                lenTable = len(rows)

                for i in range(0,lenTable):
                    if( i == 0 and count == 1):
                        cols = rows[i].find_elements(By.TAG_NAME, 'th')
                        lenCol = len(cols)

                        listRow = []
                        for j in range(0, lenCol - 1):
                            listRow.append(cols[j].text)
                        writer.writerow(listRow)
                    elif(i > 0):
                        cols = rows[i].find_elements(By.TAG_NAME, 'td')
                        lenCol = len(cols)

                        listRow = []
                        for j in range(0, lenCol - 1):
                            listRow.append(cols[j].text)
                        writer.writerow(listRow)

                if(count < 4):
                    clickButton(driver.find_element(By.ID, 'linkNextB'))

    print("Archivo CSV creado exitosamente.")

def getNoncommunicableData():
    nombre = "noncommunicable.csv"
    driver.get(listWHOMortality[6])
    timeSleep(5)

    with open(nombre, "w", newline="",encoding='utf-8') as archivo_csv:
            writer = csv.writer(archivo_csv)

            for count in range(1,5):
                timeSleep(5)
                tableContent = driver.find_elements(By.TAG_NAME, 'tbody')[1]
                
                rows = tableContent.find_elements(By.TAG_NAME, 'tr')
                lenTable = len(rows)

                for i in range(0,lenTable):
                    if( i == 0 and count == 1):
                        cols = rows[i].find_elements(By.TAG_NAME, 'th')
                        lenCol = len(cols)

                        listRow = []
                        for j in range(0, lenCol - 1):
                            listRow.append(cols[j].text)
                        writer.writerow(listRow)
                    elif(i > 0):
                        cols = rows[i].find_elements(By.TAG_NAME, 'td')
                        lenCol = len(cols)

                        listRow = []
                        for j in range(0, lenCol - 1):
                            listRow.append(cols[j].text)
                        writer.writerow(listRow)

                if(count < 4):
                    clickButton(driver.find_element(By.ID, 'linkNextB'))

    print("Archivo CSV creado exitosamente.")

def getPopulationData():
    nombre = "population.csv"
    driver.get(listWHODemoAndSocie[0])
    timeSleep(5)

    with open(nombre, "w", newline="",encoding='utf-8') as archivo_csv:
            writer = csv.writer(archivo_csv)

            for count in range(1,91):
                timeSleep(8)
                tableContent = driver.find_elements(By.TAG_NAME, 'tbody')[1]
                
                rows = tableContent.find_elements(By.TAG_NAME, 'tr')
                lenTable = len(rows)

                for i in range(0,lenTable):
                    if( i == 0 and count == 1):
                        cols = rows[i].find_elements(By.TAG_NAME, 'th')
                        lenCol = len(cols)

                        listRow = []
                        for j in range(0, lenCol - 1):
                            listRow.append(cols[j].text)
                        writer.writerow(listRow)
                    elif(i > 0):
                        cols = rows[i].find_elements(By.TAG_NAME, 'td')
                        lenCol = len(cols)

                        listRow = []
                        for j in range(0, lenCol - 1):
                            listRow.append(cols[j].text)
                        writer.writerow(listRow)

                if(count < 90):
                    clickButton(driver.find_element(By.ID, 'linkNextB'))

    print("Archivo CSV creado exitosamente.")

def getMediaAge():
    nombre = "mediaAge.csv"
    driver.get(listWHODemoAndSocie[1])
    timeSleep(5)

    with open(nombre, "w", newline="",encoding='utf-8') as archivo_csv:
            writer = csv.writer(archivo_csv)

            for count in range(1,5):
                timeSleep(5)
                tableContent = driver.find_elements(By.TAG_NAME, 'tbody')[1]
                
                rows = tableContent.find_elements(By.TAG_NAME, 'tr')
                lenTable = len(rows)

                for i in range(0,lenTable):
                    if( i == 0 and count == 1):
                        cols = rows[i].find_elements(By.TAG_NAME, 'th')
                        lenCol = len(cols)

                        listRow = []
                        for j in range(0, lenCol - 1):
                            listRow.append(cols[j].text)
                        writer.writerow(listRow)
                    elif(i > 0):
                        cols = rows[i].find_elements(By.TAG_NAME, 'td')
                        lenCol = len(cols)

                        listRow = []
                        for j in range(0, lenCol - 1):
                            listRow.append(cols[j].text)
                        writer.writerow(listRow)

                if(count < 4):
                    clickButton(driver.find_element(By.ID, 'linkNextB'))

    print("Archivo CSV creado exitosamente.")

def getAdolescentFertility():
    nombre = "adolescentFertility.csv"
    driver.get(listWHOEquity[0])
    timeSleep(5)

    with open(nombre, "w", newline="",encoding='utf-8') as archivo_csv:
            writer = csv.writer(archivo_csv)

            for count in range(1,22):
                timeSleep(8)
                tableContent = driver.find_elements(By.TAG_NAME, 'tbody')[1]
                
                rows = tableContent.find_elements(By.TAG_NAME, 'tr')
                lenTable = len(rows)

                for i in range(0,lenTable):
                    if( i == 0 and count == 1):
                        cols = rows[i].find_elements(By.TAG_NAME, 'th')
                        lenCol = len(cols)

                        listRow = []
                        for j in range(0, lenCol - 1):
                            listRow.append(cols[j].text)
                        writer.writerow(listRow)
                    elif(i > 0):
                        cols = rows[i].find_elements(By.TAG_NAME, 'td')
                        lenCol = len(cols)

                        listRow = []
                        for j in range(0, lenCol - 1):
                            if (cols[j].text == "" or cols[j].text == " "):
                                listRow.append("(blank)")
                            else:
                                listRow.append(cols[j].text)
                        writer.writerow(listRow)

                if(count < 21):
                    clickButton(driver.find_element(By.ID, 'linkNextB'))

    print("Archivo CSV creado exitosamente.")

def getInfantMortality():
    nombre = "infantMortality.csv"
    driver.get(listWHOEquity[1])
    timeSleep(5)

    with open(nombre, "w", newline="",encoding='utf-8') as archivo_csv:
            writer = csv.writer(archivo_csv)

            for count in range(1,36):
                timeSleep(8)
                tableContent = driver.find_elements(By.TAG_NAME, 'tbody')[1]
                
                rows = tableContent.find_elements(By.TAG_NAME, 'tr')
                lenTable = len(rows)

                for i in range(0,lenTable):
                    if( i == 0 and count == 1):
                        cols = rows[i].find_elements(By.TAG_NAME, 'th')
                        lenCol = len(cols)

                        listRow = []
                        for j in range(0, lenCol - 1):
                            listRow.append(cols[j].text)
                        writer.writerow(listRow)
                    elif(i > 0):
                        cols = rows[i].find_elements(By.TAG_NAME, 'td')
                        lenCol = len(cols)

                        listRow = []
                        for j in range(0, lenCol - 1):
                            if (cols[j].text == "" or cols[j].text == " "):
                                listRow.append("(blank)")
                            else:
                                listRow.append(cols[j].text)
                        writer.writerow(listRow)

                if(count < 35):
                    clickButton(driver.find_element(By.ID, 'linkNextB'))

    print("Archivo CSV creado exitosamente.")

def getTotalFertility():
    nombre = "totalFertility.csv"
    driver.get(listWHOEquity[2])
    timeSleep(5)

    with open(nombre, "w", newline="",encoding='utf-8') as archivo_csv:
            writer = csv.writer(archivo_csv)

            for count in range(1,21):
                timeSleep(8)
                tableContent = driver.find_elements(By.TAG_NAME, 'tbody')[1]
                
                rows = tableContent.find_elements(By.TAG_NAME, 'tr')
                lenTable = len(rows)

                for i in range(0,lenTable):
                    if( i == 0 and count == 1):
                        cols = rows[i].find_elements(By.TAG_NAME, 'th')
                        lenCol = len(cols)

                        listRow = []
                        for j in range(0, lenCol - 1):
                            listRow.append(cols[j].text)
                        writer.writerow(listRow)
                    elif(i > 0):
                        cols = rows[i].find_elements(By.TAG_NAME, 'td')
                        lenCol = len(cols)

                        listRow = []
                        for j in range(0, lenCol - 1):
                            if (cols[j].text == "" or cols[j].text == " "):
                                listRow.append("(blank)")
                            else:
                                listRow.append(cols[j].text)
                        writer.writerow(listRow)

                if(count < 20):
                    clickButton(driver.find_element(By.ID, 'linkNextB'))

    print("Archivo CSV creado exitosamente.")

def getGeneralExpenditurePercentage():
    nombre = "generalExpenditurePercentage.csv"
    driver.get(listWHOHealthSystem[1])
    timeSleep(5)

    with open(nombre, "w", newline="",encoding='utf-8') as archivo_csv:
            writer = csv.writer(archivo_csv)

            for count in range(1,70):
                timeSleep(8)
                tableContent = driver.find_elements(By.TAG_NAME, 'tbody')[1]
                
                rows = tableContent.find_elements(By.TAG_NAME, 'tr')
                lenTable = len(rows)

                for i in range(0,lenTable):
                    if( i == 0 and count == 1):
                        cols = rows[i].find_elements(By.TAG_NAME, 'th')
                        lenCol = len(cols)

                        listRow = []
                        for j in range(0, lenCol - 1):
                            listRow.append(cols[j].text)
                        writer.writerow(listRow)
                    elif(i > 0):
                        cols = rows[i].find_elements(By.TAG_NAME, 'td')
                        lenCol = len(cols)

                        listRow = []
                        for j in range(0, lenCol - 1):
                            if (cols[j].text == "" or cols[j].text == " "):
                                listRow.append("(blank)")
                            else:
                                listRow.append(cols[j].text)
                        writer.writerow(listRow)

                if(count < 69):
                    clickButton(driver.find_element(By.ID, 'linkNextB'))

    print("Archivo CSV creado exitosamente.")

def getGeneralExpenditure():
    nombre = "generalExpenditure.csv"
    driver.get(listWHOHealthSystem[0])
    timeSleep(5)

    with open(nombre, "w", newline="",encoding='utf-8') as archivo_csv:
            writer = csv.writer(archivo_csv)

            for count in range(1,70):
                timeSleep(8)
                tableContent = driver.find_elements(By.TAG_NAME, 'tbody')[1]
                
                rows = tableContent.find_elements(By.TAG_NAME, 'tr')
                lenTable = len(rows)

                for i in range(0,lenTable):
                    if( i == 0 and count == 1):
                        cols = rows[i].find_elements(By.TAG_NAME, 'th')
                        lenCol = len(cols)

                        listRow = []
                        for j in range(0, lenCol - 1):
                            listRow.append(cols[j].text)
                        writer.writerow(listRow)
                    elif(i > 0):
                        cols = rows[i].find_elements(By.TAG_NAME, 'td')
                        lenCol = len(cols)

                        listRow = []
                        for j in range(0, lenCol - 1):
                            if (cols[j].text == "" or cols[j].text == " "):
                                listRow.append("(blank)")
                            else:
                                listRow.append(cols[j].text)
                        writer.writerow(listRow)

                if(count < 69):
                    clickButton(driver.find_element(By.ID, 'linkNextB'))

    print("Archivo CSV creado exitosamente.")

def getlifeExpectancy():
    nombre = "lifeExpectancy.csv"
    driver.get(listWHOMortaAndHealth[0])
    timeSleep(5)

    with open(nombre, "w", newline="",encoding='utf-8') as archivo_csv:
            writer = csv.writer(archivo_csv)

            for count in range(1,36):
                timeSleep(8)
                tableContent = driver.find_elements(By.TAG_NAME, 'tbody')[1]
                
                rows = tableContent.find_elements(By.TAG_NAME, 'tr')
                lenTable = len(rows)

                for i in range(0,lenTable):
                    if( i == 0 and count == 1):
                        cols = rows[i].find_elements(By.TAG_NAME, 'th')
                        lenCol = len(cols)

                        listRow = []
                        for j in range(0, lenCol - 1):
                            listRow.append(cols[j].text)
                        writer.writerow(listRow)
                    elif(i > 0):
                        cols = rows[i].find_elements(By.TAG_NAME, 'td')
                        lenCol = len(cols)

                        listRow = []
                        for j in range(0, lenCol - 1):
                            if (cols[j].text == "" or cols[j].text == " "):
                                listRow.append("(blank)")
                            else:
                                listRow.append(cols[j].text)
                        writer.writerow(listRow)

                if(count < 35):
                    clickButton(driver.find_element(By.ID, 'linkNextB'))

    print("Archivo CSV creado exitosamente.")

def getInboundTourism():
    nombre = "inboundTourism.csv"
    driver.get(listTurist[0])
    timeSleep(20)

    tableContent = driver.find_elements(By.TAG_NAME, 'tbody')[1]
    
    rows = tableContent.find_elements(By.TAG_NAME, 'tr')
    lenTable = len(rows)

    #print(tableContent.get_attribute('outerHTML'))
    with open(nombre, "w", newline="",encoding='utf-8') as archivo_csv:
        writer = csv.writer(archivo_csv)

        filaN = 0
        for i in range(0,lenTable - 11):#lenTable - 11
            if (i == 0):
                cols = rows[i].find_elements(By.TAG_NAME, 'td')
                lenCol = len(cols)

                listRow = []
                for j in range(0, lenCol - 1):
                    if (j != 1 and j != 2 and j != 3 and j != 4):
                        listRow.append(cols[j].text)
                    elif (j == 4):
                        listRow.append("Description")
                writer.writerow(listRow)
            else:
                filaN += 1
                cols = rows[i].find_elements(By.TAG_NAME, 'td')
                lenCol = len(cols)

                listRow = []
                for j in range(0, lenCol):
                    if(filaN == 1 or filaN == 3):
                        if (filaN == 1 and j != lenCol and j <= 31 + 3):
                            if ((j == 4 or j == 5 or j == 6 or j == 7) and cols[j].text == ""):
                                listRow.append("(blank)")
                            elif (j >= 8 and (cols[j].text == "" or cols[j].text == "..")):
                                listRow.append("0")
                            else:
                                listRow.append(cols[j].text)
                        elif (filaN == 3 and j != 1 and j <= 31 + 1):
                            if ((j==0 or j == 3 or j == 4 or j == 5 ) and cols[j].text == ""):
                                listRow.append("(blank)")
                            elif (j >= 6 and (cols[j].text == "" or cols[j].text == "..")):
                                listRow.append("0")
                            else:
                                listRow.append(cols[j].text.replace(",", "."))
                writer.writerow(listRow)
                if (filaN == 35):
                    filaN = 0
    print("Archivo CSV creado exitosamente.")

def getOutboundTourism():
    nombre = "outboundTourism.csv"
    driver.get(listTurist[1])
    timeSleep(20)

    tableContent = driver.find_elements(By.TAG_NAME, 'tbody')[1]
    
    rows = tableContent.find_elements(By.TAG_NAME, 'tr')
    lenTable = len(rows)

    #print(tableContent.get_attribute('outerHTML'))
    with open(nombre, "w", newline="",encoding='utf-8') as archivo_csv:
        writer = csv.writer(archivo_csv)

        filaN = 0
        for i in range(0,lenTable - 8): #lenTable - 8
            if (i == 0):
                cols = rows[i].find_elements(By.TAG_NAME, 'td')
                lenCol = len(cols)

                listRow = []
                for j in range(0, lenCol - 1):
                    if (j != 1 and j != 2 and j != 3 and j != 4):
                        listRow.append(cols[j].text)
                    elif (j == 4):
                        listRow.append("Description")
                writer.writerow(listRow)
            else:
                filaN += 1
                cols = rows[i].find_elements(By.TAG_NAME, 'td')
                lenCol = len(cols)

                listRow = []
                for j in range(0, lenCol):
                    if (filaN == 1 or filaN == 3):
                        if (filaN == 1 and j != lenCol and j <= 31 + 3):
                            if ((j == 4 or j == 5 or j == 6 or j == 7) and cols[j].text == ""):
                                listRow.append("(blank)")
                            elif (j >= 8 and (cols[j].text == "" or cols[j].text == "..")):
                                listRow.append("0")
                            else:
                                listRow.append(cols[j].text)
                        elif (filaN == 3  and j != 1 and j <= 31 + 1):
                            if ((j==0 or j == 3 or j == 4 or j == 5 ) and cols[j].text == ""):
                                listRow.append("(blank)")
                            elif (j >= 6 and (cols[j].text == "" or cols[j].text == "..")):
                                listRow.append("0")
                            else:
                                listRow.append(cols[j].text)
                writer.writerow(listRow)
                if (filaN == 8):
                    filaN = 0


    print("Archivo CSV creado exitosamente.")

def webCrawler():
    global listHomicideLinks 
    global listWHOMortality 
    global listWHODemoAndSocie 
    global listWHOEquity 
    global listWHOHealthSystem 
    global listWHOMortaAndHealth 
    global listTurist 

    listHomicideLinks = buttonsHomicide()
    listWHOMortality = buttonsWHOMortality()
    listWHODemoAndSocie = buttonsWHODemoAndSocie()
    listWHOEquity = buttonsWHOEquitity()
    listWHOHealthSystem = buttonsWHOHealthSystem()
    listWHOMortaAndHealth = buttonsWHOMortaLAndHealth()
    listTurist = buttonsTurist()

    print(listHomicideLinks)
    print(listWHOMortality)
    print(listWHODemoAndSocie)
    print(listWHOEquity)
    print(listWHOHealthSystem)
    print(listWHOMortaAndHealth)
    print(listTurist)

    timeSleep(10)

    links()

    driver.quit()

def HomicideLinks():
    global listHomicideLinks  

    for e in listHomicideLinks:
        driver.get(e)
        timeSleep(10)
        #file = requests.get(driver.find_element(By.ID , 'ctl00_main_actions_download').find_elements(By.TAG_NAME,'a')[1].get_attribute('onclick'))
        file = requests.get(driver.find_element(By.ID , 'ctl00_main_actions_download').click())
        
        print(file)
        timeSleep(3)
        

def returnPage():
    driver.back()

def clickButton(button):
    button.click()

def timeSleep(seconds):
    time.sleep(seconds)

def buttonsHomicide():
    timeSleep(10)

    clickButton(driver.find_element(By.ID,'ygtvt10').find_element(By.TAG_NAME, 'a'))

    timeSleep(10)

    buttons = driver.find_element(By.ID,'ygtv10').find_elements(By.TAG_NAME, 'a')[2::2]

    links = []

    i = 1
    for e in buttons:
        links.append(e.get_attribute('href'))
        i += 1

    return links


def buttonsWHOMortality():

    timeSleep(10)
    clickButton(driver.find_element(By.ID,'ygtvt25').find_element(By.TAG_NAME, 'a'))

    timeSleep(10)

    clickButton(driver.find_element(By.ID,'ygtvt166').find_element(By.TAG_NAME, 'a'))

    timeSleep(10)
    
    clickButton(driver.find_element(By.ID,'ygtvt167').find_element(By.TAG_NAME, 'a'))


    buttons = driver.find_element(By.ID,'ygtv167').find_elements(By.TAG_NAME,'a')[:23]

    buttons = buttons[3::3]

    links = [] 

    for e in buttons:
        print(e.get_attribute("outerHTML"))
        links.append(e.get_attribute('href'))

    print()
    return links

def buttonsWHODemoAndSocie():
    clickButton(driver.find_element(By.ID,'ygtvt183').find_element(By.TAG_NAME, 'a'))

    buttons = driver.find_element(By.ID,'ygtv183').find_elements(By.TAG_NAME,'a')
    buttons = buttons[3::3]

    links = [] 

    timeSleep(5)

    i = 1
    for e in buttons:
        if (i == 12 or i == 15):
            links.append(e.get_attribute('href'))
        i += 1

    return links

def buttonsWHOEquitity():
    clickButton(driver.find_element(By.ID,'ygtvt202').find_element(By.TAG_NAME, 'a'))

    timeSleep(3)

    buttons = driver.find_element(By.ID,'ygtv202').find_elements(By.TAG_NAME,'a')
    buttons = buttons[3::3]

    links = [] 

    i = 1
    for e in buttons:
        if (i == 1 or i == 29 or i == 34):
            links.append(e.get_attribute('href'))
        i += 1

    return links

def buttonsWHOHealthSystem():
    clickButton(driver.find_element(By.ID,'ygtvt262').find_element(By.TAG_NAME, 'a'))

    timeSleep(3)

    buttons = driver.find_element(By.ID,'ygtv262').find_elements(By.TAG_NAME,'a')
    buttons = buttons[3::3]

    links = [] 

    i = 0
    for e in buttons:
        if (i == 9 or i == 10):
            print(e.get_attribute("outerHTML"))
            links.append(e.get_attribute('href'))
        i += 1

    print()
    return links



def buttonsWHOMortaLAndHealth():
    clickButton(driver.find_element(By.ID,'ygtvt323').find_element(By.TAG_NAME, 'a'))

    timeSleep(3)

    buttons = driver.find_element(By.ID,'ygtv323').find_elements(By.TAG_NAME,'a')
    buttons = buttons[3::3]

    links = [] 

    i = 1
    for e in buttons:
        if (i == 4):
            links.append(e.get_attribute('href'))
        i += 1

    return links

def buttonsTurist():
    timeSleep(3)

    clickButton(driver.find_element(By.ID,'ygtvt34').find_element(By.TAG_NAME, 'a'))

    timeSleep(3)

    buttons = driver.find_element(By.ID,'ygtv34').find_elements(By.TAG_NAME, 'a')[2::2]


    links = [] 

    timeSleep(5)

    i = 1
    for e in buttons:
        if (i == 3 or i == 4):
            links.append(e.get_attribute('href'))
        i += 1

    return links


webCrawler()

