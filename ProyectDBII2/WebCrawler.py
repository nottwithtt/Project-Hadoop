from bs4 import BeautifulSoup
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support import expected_conditions as EC
import requests
import time
import csv

driver = webdriver.Chrome()
#driver.get("http://data.un.org/Explorer.aspx")

time.sleep(10)

listHomicideLinks = []
listWHOMortality = []
listWHODemoAndSocie = []
listWHOEquity = []
listWHOHealthSystem = []
listWHOMortaAndHealth = []
listTurist = []

optionsWHO =[]


'''
['http://data.un.org/DocumentData.aspx?id=443', 'http://data.un.org/DocumentData.aspx?id=444']
['http://data.un.org/Data.aspx?d=WHO&f=MEASURE_CODE%3aWHS2_3070_cancer', 'http://data.un.org/Data.aspx?d=WHO&f=MEASURE_CODE%3aWHS2_3070_cdd', 'http://data.un.org/Data.aspx?d=WHO&f=MEASURE_CODE%3aWHS2_3070_chronic', 'http://data.un.org/Data.aspx?d=WHO&f=MEASURE_CODE%3aWHS2_513', 'http://data.un.org/Data.aspx?d=WHO&f=MEASURE_CODE%3aWHS2_162', 'http://data.un.org/Data.aspx?d=WHO&f=MEASURE_CODE%3aWHS2_163']
['http://data.un.org/Data.aspx?d=WHO&f=MEASURE_CODE%3aWHS9_86', 'http://data.un.org/Data.aspx?d=WHO&f=MEASURE_CODE%3aWHS9_88']
['http://data.un.org/Data.aspx?d=WHO&f=MEASURE_CODE%3aasfr1', 'http://data.un.org/Data.aspx?d=WHO&f=MEASURE_CODE%3aimr', 'http://data.un.org/Data.aspx?d=WHO&f=MEASURE_CODE%3atfr']
['http://data.un.org/Data.aspx?d=WHO&f=MEASURE_CODE%3aWHS7_120', 'http://data.un.org/Data.aspx?d=WHO&f=MEASURE_CODE%3aWHS7_149']
['http://data.un.org/Data.aspx?d=WHO&f=MEASURE_CODE%3aWHOSIS_000001']
['http://data.un.org/DocumentData.aspx?id=481', 'http://data.un.org/DocumentData.aspx?id=458']
'''

def links():
    #getTableHomicide1()
    getTableHomicide2()

def getTableHomicide1():
    nombre = "homicide1.csv"
    driver.get('http://data.un.org/DocumentData.aspx?id=443')
    timeSleep(5)

    tableContent = driver.find_elements(By.TAG_NAME, 'tbody')[1]
    
    rows = tableContent.find_elements(By.TAG_NAME, 'tr')
    lenTable = len(rows)

    #print(tableContent.get_attribute('outerHTML'))
    with open(nombre, "w", newline="") as archivo_csv:
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
    driver.get('http://data.un.org/DocumentData.aspx?id=444')
    timeSleep(5)

    tableContent = driver.find_elements(By.TAG_NAME, 'tbody')[1]
    
    rows = tableContent.find_elements(By.TAG_NAME, 'tr')
    lenTable = len(rows)


    #print(tableContent.get_attribute('outerHTML'))
    with open(nombre, "w", newline="") as archivo_csv:
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

    HomicideLinks()

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


#ygtvt164
def buttonsWHOMortality():

    timeSleep(10)
    clickButton(driver.find_element(By.ID,'ygtvt25').find_element(By.TAG_NAME, 'a'))

    timeSleep(10)

    clickButton(driver.find_element(By.ID,'ygtvt166').find_element(By.TAG_NAME, 'a'))

    timeSleep(10)
    
    clickButton(driver.find_element(By.ID,'ygtvt167').find_element(By.TAG_NAME, 'a'))


    buttons = driver.find_element(By.ID,'ygtv167').find_elements(By.TAG_NAME,'a')[6:23]

    buttons = buttons[::3]

    links = [] 

    for e in buttons:
        links.append(e.get_attribute('href'))

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

    i = 1
    for e in buttons:
        if (i == 9 or i == 10):
            links.append(e.get_attribute('href'))
        i += 1

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


#webCrawler()
links()

