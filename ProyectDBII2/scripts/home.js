const comboSelect = document.getElementById('options1');
const comboSelect2 = document.getElementById('options2');
const comboSelect3 = document.getElementById('options3');

const ctx = document.getElementById('myChart').getContext('2d');
var myChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: [],
      datasets: []
    },
    options: {
        scales: {
            yAxes: [{
                ticks:{
                    beginAtZero: true, // Comenzar el eje y desde cero
                }
            }]
        }
    }
  });

async function getJob1(){

    const response = await fetch('/getJob1',{
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
    })
    let json = await response.json();
    let answer = json.answer;

    let paises = [];
    let promedioHomicidios = [];

    for (let i = 0; i < answer.length; i++) {
        paises.push(answer[i].País);
        promedioHomicidios.push(answer[i].PromedioHomicidios);
    }

    let listaCombinada = paises.map((pais, index) => ({ pais, promedioHomicidios: promedioHomicidios[index] }));

    listaCombinada.sort((a, b) => a.pais.localeCompare(b.pais));

    let paisesOrdenados = listaCombinada.map(item => item.pais);
    let promedioHomicidiosOrdenados = listaCombinada.map(item => item.promedioHomicidios);


    await onloadeddata(paisesOrdenados, promedioHomicidiosOrdenados, "Average Number of Homicide Victims by Country","bar");
    
}

async function getJob2(RegionSelected, data){

    const response = await fetch('/getJob2',{
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
    })
    let json = await response.json();
    let answer = json.answer;

    let dataList = [];
    let promedioHomicidios = [];

    for (let i = 0; i < answer.length; i++) {
        if (answer[i].Region == RegionSelected && data == "PromedioDeHomicidios" ){
            dataList.push(answer[i].Anio);
            promedioHomicidios.push(answer[i].PromedioDeHomicidios);
        }
        else if (answer[i].Region == RegionSelected && data == "Max" ){
            dataList.push(answer[i].Anio);
            promedioHomicidios.push(answer[i].Max);
        }
        else if (answer[i].Region == RegionSelected && data == "Min" ){
            dataList.push(answer[i].Anio);
            promedioHomicidios.push(answer[i].Min);
        }
    }

    if(data == "PromedioDeHomicidios"){
        await onloadeddata(dataList, promedioHomicidios, `Average Number of Homicides per Region of ${RegionSelected} and Year`,"bar");
    } else if(data == "Max"){
        await onloadeddata(dataList, promedioHomicidios, `Maximum Number of Homicides per Region of ${RegionSelected} and Year`,"bar");
    } else if(data == "Min"){
        await onloadeddata(dataList, promedioHomicidios, `Minimum Number of Homicides per Region of ${RegionSelected} and Year`,"bar");
    }
}

async function getJob3(name,SubRegionSelected, data){


    const response = await fetch('/getJob3',{
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
    })
    let json = await response.json();
    let answer = json.answer;

    let dataList = [];
    let promedioHomicidios = [];

    for (let i = 0; i < answer.length; i++) {
        if (answer[i].SubRegion == SubRegionSelected && data == "PromedioDeHomicidios" ){
            dataList.push(answer[i].Anio);
            promedioHomicidios.push(answer[i].PromedioDeHomicidios);
        }
        else if (answer[i].SubRegion == SubRegionSelected && data == "Max" ){
            dataList.push(answer[i].Anio);
            promedioHomicidios.push(answer[i].Max);
        }
        else if (answer[i].SubRegion == SubRegionSelected && data == "Min" ){
            dataList.push(answer[i].Anio);
            promedioHomicidios.push(answer[i].Min);
        }
    }

    if(data == "PromedioDeHomicidios"){
        await onloadeddata(dataList, promedioHomicidios, `Average Number of Homicides per Subregion of ${name} and Year`,"bar");
    } else if(data == "Max"){
        await onloadeddata(dataList, promedioHomicidios, `Maximum Number of Homicides per Subregion of ${name} and Year`,"bar");
    } else if(data == "Min"){
        await onloadeddata(dataList, promedioHomicidios, `Minimum Number of Homicides per Subregion of ${name} and Year`,"bar");
    }

}

async function getJob4( genre){

    const response = await fetch('/getJob4',{
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
    })
    let json = await response.json();
    let answer = json.answer;

    let paises = [];
    let promedioHomicidios = [];
    
    for (let i = 0; i < answer.length; i++) {
        if (answer[i].Genero == genre){
            paises.push(answer[i].Pais);
            promedioHomicidios.push(answer[i].Promedio);
        }
    }

    let listaCombinada = paises.map((pais, index) => ({ pais, promedioHomicidios: promedioHomicidios[index] }));

    listaCombinada.sort((a, b) => a.pais.localeCompare(b.pais));

    let paisesOrdenados = listaCombinada.map(item => item.pais);
    let promedioHomicidiosOrdenados = listaCombinada.map(item => item.promedioHomicidios);

    await onloadeddata(paisesOrdenados, promedioHomicidiosOrdenados, `Average Number of Homicide Victims per Country per Sex ${genre}`,"bar");
    
}

async function getJob5(RegionSelected, genre, data){

    const response = await fetch('/getJob5',{
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
    })
    let json = await response.json();
    let answer = json.answer;


    let dataList = [];
    let promedioHomicidios = [];
    
    for (let i = 0; i < answer.length; i++) {
        if (answer[i].Region == RegionSelected && data == "PromedioDeHomicidios" && answer[i].Genero == genre){
            dataList.push(answer[i].Anio);
            promedioHomicidios.push(answer[i].PromedioHomicidios);
        }
        else if (answer[i].Region == RegionSelected && data == "Max" && answer[i].Genero == genre){
            dataList.push(answer[i].Anio);
            promedioHomicidios.push(answer[i].Max);
        }
        else if (answer[i].Region == RegionSelected && data == "Min" && answer[i].Genero == genre){
            dataList.push(answer[i].Anio);
            promedioHomicidios.push(answer[i].Min);
        }
    }

    if(data == "PromedioDeHomicidios"){
        await onloadeddata(dataList, promedioHomicidios, `Average Number of Homicides per Region of ${RegionSelected} and Year per Sex ${genre}`,"bar");
    } else if(data == "Max"){
        await onloadeddata(dataList, promedioHomicidios, `Maximum Number of Homicides per Region of ${RegionSelected} and Year per Sex ${genre}`,"bar");
    } else if(data == "Min"){
        await onloadeddata(dataList, promedioHomicidios, `Minimum Number of Homicides per Region of ${RegionSelected} and Year per Sex ${genre}`,"bar");
    }
}

async function getJob6(SubRegionSelected, genre, data){

    const response = await fetch('/getJob6',{
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
    })
    let json = await response.json();
    let answer = json.answer;


    let dataList = [];
    let promedioHomicidios = [];
    
    for (let i = 0; i < answer.length; i++) {
        if (answer[i].SubRegion == SubRegionSelected && data == "PromedioDeHomicidios" && answer[i].Genero == genre){
            dataList.push(answer[i].Anio);
            promedioHomicidios.push(answer[i].PromedioHomicidios);
        }
        else if (answer[i].SubRegion == SubRegionSelected && data == "Max" && answer[i].Genero == genre){
            dataList.push(answer[i].Anio);
            promedioHomicidios.push(answer[i].Max);
        }
        else if (answer[i].SubRegion == SubRegionSelected && data == "Min" && answer[i].Genero == genre){
            dataList.push(answer[i].Anio);
            promedioHomicidios.push(answer[i].Min);
        }
    }

    if(data == "PromedioDeHomicidios"){
        await onloadeddata(dataList, promedioHomicidios, `Average Number of Homicides per Subregion of ${SubRegionSelected} and Year per Sex ${genre}`,"bar");
    } else if(data == "Max"){
        await onloadeddata(dataList, promedioHomicidios, `Maximum Number of Homicides per Subregion of ${SubRegionSelected} and Year per Sex ${genre}`,"bar");
    } else if(data == "Min"){
        await onloadeddata(dataList, promedioHomicidios, `Minimum Number of Homicides per Subregion of ${SubRegionSelected} and Year per Sex ${genre}`,"bar");
    }
}

async function getJob7(RegionSelected, genre, data){

    const response = await fetch('/getJob7',{
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
    })
    let json = await response.json();
    let answer = json.answer;


    let dataList = [];
    let promedioHomicidios = [];
    
    for (let i = 0; i < answer.length; i++) {
        if (answer[i].Region == RegionSelected && data == "PromedioDeHomicidios" && answer[i].Genero == genre){
            dataList.push(answer[i].Decada);
            promedioHomicidios.push(answer[i].PromedioHomicidios);
        }
        else if (answer[i].Region == RegionSelected && data == "Max" && answer[i].Genero == genre){
            dataList.push(answer[i].Decada);
            promedioHomicidios.push(answer[i].Max);
        }
        else if (answer[i].Region == RegionSelected && data == "Min" && answer[i].Genero == genre){
            dataList.push(answer[i].Decada);
            promedioHomicidios.push(answer[i].Min);
        }
    }

    if(data == "PromedioDeHomicidios"){
        await onloadeddata(dataList, promedioHomicidios, `Average Number of Homicides per Region of ${RegionSelected} and Year per Sex ${genre} per Decade `,"bar");
    } else if(data == "Max"){
        await onloadeddata(dataList, promedioHomicidios, `Maximum Number of Homicides per Region of ${RegionSelected} and Year per Sex ${genre} per Decade`,"bar");
    } else if(data == "Min"){
        await onloadeddata(dataList, promedioHomicidios, `Minimum Number of Homicides per Region of ${RegionSelected} and Year per Sex ${genre} per Decade`,"bar");
    }
}

async function getJob8(SubRegionSelected, genre, data){

    const response = await fetch('/getJob8',{
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
    })
    let json = await response.json();
    let answer = json.answer;


    let dataList = [];
    let promedioHomicidios = [];
    
    for (let i = 0; i < answer.length; i++) {
        if (answer[i].SubRegion == SubRegionSelected && data == "PromedioDeHomicidios" && answer[i].Genero == genre){
            dataList.push(answer[i].Decada);
            promedioHomicidios.push(answer[i].PromedioHomicidios);
        }
        else if (answer[i].SubRegion == SubRegionSelected && data == "Max" && answer[i].Genero == genre){
            dataList.push(answer[i].Decada);
            promedioHomicidios.push(answer[i].Max);
        }
        else if (answer[i].SubRegion == SubRegionSelected && data == "Min" && answer[i].Genero == genre){
            dataList.push(answer[i].Decada);
            promedioHomicidios.push(answer[i].Min);
        }
    }

    if(data == "PromedioDeHomicidios"){
        await onloadeddata(dataList, promedioHomicidios, `Average Number of Homicides per Subregion of ${SubRegionSelected} and Year per Sex ${genre} per Decade`,"bar");
    } else if(data == "Max"){
        await onloadeddata(dataList, promedioHomicidios, `Maximum Number of Homicides per Subregion of ${SubRegionSelected} and Year per Sex ${genre} per Decade`,"bar");
    } else if(data == "Min"){
        await onloadeddata(dataList, promedioHomicidios, `Minimum Number of Homicides per Subregion of ${SubRegionSelected} and Year per Sex ${genre} per Decade`,"bar");
    }
}

async function getJob9A(data){
    const response = await fetch('/getJob',{
        method: "POST",
        body: JSON.stringify({name: "Job9A"}),
        headers: {
            "Content-Type": "application/json",
        },
    })
    let json = await response.json();
    let answer = json.answer;


    let paises = [];
    let porcentajeMuertes = [];
    
    for (let i = 0; i < answer.length; i++) {
        if (data == "2008" ){
            paises.push(answer[i].Pais);
            porcentajeMuertes.push(answer[i].Porcentaje);
        }
    }

    let listaCombinada = paises.map((pais, index) => ({ pais, porcentajeMuertes: porcentajeMuertes[index] }));

    listaCombinada.sort((a, b) => a.pais.localeCompare(b.pais));

    let paisesOrdenados = listaCombinada.map(item => item.pais);
    let porcentajeMuertesOrdenados = listaCombinada.map(item => item.porcentajeMuertes);

    if(data == "2008"){
        await onloadeddata(paisesOrdenados, porcentajeMuertesOrdenados, `Percentage of deaths in ${data} of people between 30 and 70 for Cancer compared to the total.`,"bar");
    }
}

async function getJob9B(data){
    const response = await fetch('/getJob',{
        method: "POST",
        body: JSON.stringify({name: "Job9B"}),
        headers: {
            "Content-Type": "application/json",
        },
    })
    let json = await response.json();
    let answer = json.answer;

    let paises = [];
    let porcentajeMuertes = [];
    
    for (let i = 0; i < answer.length; i++) {
        if (data == "2008" ){
            paises.push(answer[i].Pais);
            porcentajeMuertes.push(answer[i].Porcentaje);
        }
    }

    let listaCombinada = paises.map((pais, index) => ({ pais, porcentajeMuertes: porcentajeMuertes[index] }));

    listaCombinada.sort((a, b) => a.pais.localeCompare(b.pais));

    let paisesOrdenados = listaCombinada.map(item => item.pais);
    let porcentajeMuertesOrdenados = listaCombinada.map(item => item.porcentajeMuertes);

    if(data == "2008"){
        await onloadeddata(paisesOrdenados, porcentajeMuertesOrdenados, `Percentage of deaths in ${data} of people between 30 and 70 for Cardiovasular disease and diabetes compared to the total.`,"bar");
    }
}

async function getJob9C(data){
    const response = await fetch('/getJob',{
        method: "POST",
        body: JSON.stringify({name: "Job9C"}),
        headers: {
            "Content-Type": "application/json",
        },
    })
    let json = await response.json();
    let answer = json.answer;

    let paises = [];
    let porcentajeMuertes = [];
    
    for (let i = 0; i < answer.length; i++) {
        if (data == "2008" ){
            paises.push(answer[i].Pais);
            porcentajeMuertes.push(answer[i].Porcentaje);
        }
    }

    let listaCombinada = paises.map((pais, index) => ({ pais, porcentajeMuertes: porcentajeMuertes[index] }));

    listaCombinada.sort((a, b) => a.pais.localeCompare(b.pais));

    let paisesOrdenados = listaCombinada.map(item => item.pais);
    let porcentajeMuertesOrdenados = listaCombinada.map(item => item.porcentajeMuertes);


    if(data == "2008"){
        await onloadeddata(paisesOrdenados, porcentajeMuertesOrdenados, `Percentage of deaths in ${data} of people between 30 and 70 for Chronic respiratory conditions compared to the total.`,"bar");
    }
}

async function getJob10A(data){
    const response = await fetch('/getJob',{
        method: "POST",
        body: JSON.stringify({name: "Job10A"}),
        headers: {
            "Content-Type": "application/json",
        },
    })
    let json = await response.json();
    let answer = json.answer;

    let paises = [];
    let porcentajeMuertes = [];
    
    for (let i = 0; i < answer.length; i++) {
        if (data == "PromedioMuertes"){
            paises.push(answer[i].Pais);
            porcentajeMuertes.push(answer[i].PromedioDeMuertes);
        }
        else if (data == "Max"){
            paises.push(answer[i].Pais);
            porcentajeMuertes.push(answer[i].Max);
        }
        else if (data == "Min"){
            paises.push(answer[i].Pais);
            porcentajeMuertes.push(answer[i].Min);
        }
        
    }

    let listaCombinada = paises.map((pais, index) => ({ pais, porcentajeMuertes: porcentajeMuertes[index] }));

    listaCombinada.sort((a, b) => a.pais.localeCompare(b.pais));

    let paisesOrdenados = listaCombinada.map(item => item.pais);
    let porcentajeMuertesOrdenados = listaCombinada.map(item => item.porcentajeMuertes);


    if(data == "PromedioMuertes"){
        await onloadeddata(paisesOrdenados, porcentajeMuertesOrdenados, `Average number of deaths per country per reported causes.`,"bar");
    }
    else if(data == "Max"){
        await onloadeddata(paisesOrdenados, porcentajeMuertesOrdenados, `Maximum number of deaths per country per reported causes.`,"bar");
    }
    else if(data == "Min"){
        await onloadeddata(paisesOrdenados, porcentajeMuertesOrdenados, `Minimum number of deaths per country per reported causes.`,"bar");
    }
}

async function getJob10B(data){
    const response = await fetch('/getJob',{
        method: "POST",
        body: JSON.stringify({name: "Job10B"}),
        headers: {
            "Content-Type": "application/json",
        },
    })
    let json = await response.json();
    let answer = json.answer;

    let paises = [];
    let porcentajeMuertes = [];
    
    for (let i = 0; i < answer.length; i++) {
        if (data == "PromedioMuertes"){
            paises.push(answer[i].Pais);
            porcentajeMuertes.push(answer[i].PromedioDeMuertes);
        }
        else if (data == "Max"){
            paises.push(answer[i].Pais);
            porcentajeMuertes.push(answer[i].Max);
        }
        else if (data == "Min"){
            paises.push(answer[i].Pais);
            porcentajeMuertes.push(answer[i].Min);
        }
    }

    let listaCombinada = paises.map((pais, index) => ({ pais, porcentajeMuertes: porcentajeMuertes[index] }));

    listaCombinada.sort((a, b) => a.pais.localeCompare(b.pais));

    let paisesOrdenados = listaCombinada.map(item => item.pais);
    let porcentajeMuertesOrdenados = listaCombinada.map(item => item.porcentajeMuertes);


    if(data == "PromedioMuertes"){
        await onloadeddata(paisesOrdenados, porcentajeMuertesOrdenados, `Average number of deaths per country per non-communication causes.`,"bar");
    }
    else if(data == "Max"){
        await onloadeddata(paisesOrdenados, porcentajeMuertesOrdenados, `Maximum number of deaths per country per non-communication causes.`,"bar");
    }
    else if(data == "Min"){
        await onloadeddata(paisesOrdenados, porcentajeMuertesOrdenados, `Minimum number of deaths per country per non-communication causes.`,"bar");
    }
}

async function getJob10C(data){
    const response = await fetch('/getJob',{
        method: "POST",
        body: JSON.stringify({name: "Job10C"}),
        headers: {
            "Content-Type": "application/json",
        },
    })
    let json = await response.json();
    let answer = json.answer;

    let paises = [];
    let porcentajeMuertes = [];
    
    for (let i = 0; i < answer.length; i++) {
        if (data == "PromedioMuertes"){
            paises.push(answer[i].Pais);
            porcentajeMuertes.push(answer[i].PromedioDeMuertes);
        }
        else if (data == "Max"){
            paises.push(answer[i].Pais);
            porcentajeMuertes.push(answer[i].Max);
        }
        else if (data == "Min"){
            paises.push(answer[i].Pais);
            porcentajeMuertes.push(answer[i].Min);
        }
    }

    let listaCombinada = paises.map((pais, index) => ({ pais, porcentajeMuertes: porcentajeMuertes[index] }));

    listaCombinada.sort((a, b) => a.pais.localeCompare(b.pais));

    let paisesOrdenados = listaCombinada.map(item => item.pais);
    let porcentajeMuertesOrdenados = listaCombinada.map(item => item.porcentajeMuertes);

    if(data == "PromedioMuertes"){
        await onloadeddata(paisesOrdenados, porcentajeMuertesOrdenados, `Average number of deaths per country per injuries.`,"bar");
    }
    else if(data == "Max"){
        await onloadeddata(paisesOrdenados, porcentajeMuertesOrdenados, `Maximum number of deaths per country per injuries.`,"bar");
    }
    else if(data == "Min"){
        await onloadeddata(paisesOrdenados, porcentajeMuertesOrdenados, `Minimum number of deaths per country per injuries.`,"bar");
    }
}

async function getJob11(){
    const response = await fetch('/getJob',{
        method: "POST",
        body: JSON.stringify({name: "Job11"}),
        headers: {
            "Content-Type": "application/json",
        },
    })
    let json = await response.json();
    let answer = json.answer;

    let paises = [];
    let diferenciaEdad = [];
    
    for (let i = 0; i < answer.length; i++){
        paises.push(answer[i].Pais);
        diferenciaEdad.push(answer[i].DiferenciaEdades);
    }

    let listaCombinada = paises.map((pais, index) => ({ pais, diferenciaEdad: diferenciaEdad[index] }));

    listaCombinada.sort((a, b) => a.pais.localeCompare(b.pais));

    let paisesOrdenados = listaCombinada.map(item => item.pais);
    let porcentajeMuertesOrdenados = listaCombinada.map(item => item.diferenciaEdad);

    await onloadeddata(paisesOrdenados, porcentajeMuertesOrdenados, `The difference between the first year of measured average age by country and the last year measured by country.`,"bar");
    
}

async function getJob12(data){
    const response = await fetch('/getJob',{
        method: "POST",
        body: JSON.stringify({name: "Job12"}),
        headers: {
            "Content-Type": "application/json",
        },
    })
    let json = await response.json();
    let answer = json.answer;

    let paises = [];
    let porcentajeEdad = [];
    
    for (let i = 0; i < answer.length; i++){
        if (data == "2010s"){
            paises.push(answer[i].Pais);
            porcentajeEdad.push(answer[i].EdadPromedio);
        }
    }

    let listaCombinada = paises.map((pais, index) => ({ pais, porcentajeEdad: porcentajeEdad[index] }));

    listaCombinada.sort((a, b) => a.pais.localeCompare(b.pais));

    let paisesOrdenados = listaCombinada.map(item => item.pais);
    let porcentajeMuertesOrdenados = listaCombinada.map(item => item.porcentajeEdad);


    if (data == "2010s"){
        await onloadeddata(paisesOrdenados, porcentajeMuertesOrdenados, `Average age by country by decade of 2010s.`,"bar");
    }
}

async function getJob13(data){
    const response = await fetch('/getJob',{
        method: "POST",
        body: JSON.stringify({name: "Job13"}),
        headers: {
            "Content-Type": "application/json",
        },
    })
    let json = await response.json();
    let answer = json.answer;

    let paises = [];
    let poblacion = [];
    
    for (let i = 0; i < answer.length; i++){
        if (data == "1990s" && answer[i].Decada == "1990s"){
            paises.push(answer[i].Pais);
            poblacion.push(answer[i].Poblacion);
        }
        else if (data == "2000s" && answer[i].Decada == "2000s"){
            paises.push(answer[i].Pais);
            poblacion.push(answer[i].Poblacion);
        }
        else if (data == "2010s" && answer[i].Decada == "2010s"){
            paises.push(answer[i].Pais);
            poblacion.push(answer[i].Poblacion);
        }
    }

    let listaCombinada = paises.map((pais, index) => ({ pais, poblacion: poblacion[index] }));

    listaCombinada.sort((a, b) => a.pais.localeCompare(b.pais));

    let paisesOrdenados = listaCombinada.map(item => item.pais);
    let porcentajePoblacionOrdenados = listaCombinada.map(item => item.poblacion);


    await onloadeddata(paisesOrdenados, porcentajePoblacionOrdenados, `The amount of population per decade of the ${data}.`,"bar");
}

async function getJob14(data){
    const response = await fetch('/getJob',{
        method: "POST",
        body: JSON.stringify({name: "Job14"}),
        headers: {
            "Content-Type": "application/json",
        },
    })
    let json = await response.json();
    let answer = json.answer;

    let paises = [];
    let porcentajeFertilidad = [];
    
    for (let i = 0; i < answer.length; i++){
        if (data == "1990s"){
            paises.push(answer[i].Pais);
            porcentajeFertilidad.push(answer[i]["1990s"]);
        }
        else if (data == "2000s"){
            paises.push(answer[i].Pais);
            porcentajeFertilidad.push(answer[i]["2000s"]);
        }
        else if (data == "2010s"){
            paises.push(answer[i].Pais);
            porcentajeFertilidad.push(answer[i]["2010s"]);
        }
    }

    let listaCombinada = paises.map((pais, index) => ({ pais, porcentajeFertilidad: porcentajeFertilidad[index] }));

    listaCombinada.sort((a, b) => a.pais.localeCompare(b.pais));

    let paisesOrdenados = listaCombinada.map(item => item.pais);
    let porcentajePoblacionOrdenados = listaCombinada.map(item => item.porcentajeFertilidad);
    

    await onloadeddata(paisesOrdenados, porcentajePoblacionOrdenados, `Adolescent fertility rate per 1000, by decade of the ${data} and country.`,"bar");
}

async function getJob15(quintil,decada){
    const response = await fetch('/getJob',{
        method: "POST",
        body: JSON.stringify({name: "Job15"}),
        headers: {
            "Content-Type": "application/json",
        },
    })

    
    let json = await response.json();
    let answer = json.answer;

    let paises = [];
    let porcentajeFertilidad = [];

    for (let i = 0; i < answer.length; i++){
        if (answer[i].Quintil == quintil){
            paises.push(answer[i].Pais);
            porcentajeFertilidad.push(answer[i][decada]);
        }
    }

    let listaCombinada = paises.map((pais, index) => ({ pais, porcentajeFertilidad: porcentajeFertilidad[index] }));

    listaCombinada.sort((a, b) => a.pais.localeCompare(b.pais));

    let paisesOrdenados = listaCombinada.map(item => item.pais);
    let porcentajeFertilidadOrdenados = listaCombinada.map(item => item.porcentajeFertilidad);


    await onloadeddata(paisesOrdenados,porcentajeFertilidadOrdenados, `Adolescent fertility rate per 1000, per economic quintile ${quintil} and per decade of ${decada}.`,"bar");
}

async function getJob16(data){
    const response = await fetch('/getJob',{
        method: "POST",
        body: JSON.stringify({name: "Job16"}),
        headers: {
            "Content-Type": "application/json",
        },
    })
    let json = await response.json();
    let answer = json.answer;
    let porcentajeFatalidad = [];
    let paises = [];

    
    for (let i = 0; i < answer.length; i++){
        if (data == "1990s"){
            porcentajeFatalidad.push(answer[i]["1990s"]);
            paises.push(answer[i].Pais);
        }
        else if (data == "2000s"){
            porcentajeFatalidad.push(answer[i]["2000s"]);
            paises.push(answer[i].Pais);
        }
        else if (data == "2010s"){
            porcentajeFatalidad.push(answer[i]["2010s"]);
            paises.push(answer[i].Pais);
        }
    }

    let listaCombinada = paises.map((pais, index) => ({ pais, porcentajeFatalidad: porcentajeFatalidad[index] }));

    listaCombinada.sort((a, b) => a.pais.localeCompare(b.pais));

    let paisesOrdenados = listaCombinada.map(item => item.pais);
    let porcentajeFatalidadOrdenados = listaCombinada.map(item => item.porcentajeFatalidad);


    await onloadeddata(paisesOrdenados,porcentajeFatalidadOrdenados, `The percentage of child fatalities before the first year of life per 1000, by decade of ${data} and country.`,"bar");
}

async function getJob17(quintil,decada){
    const response = await fetch('/getJob',{
        method: "POST",
        body: JSON.stringify({name: "Job17"}),
        headers: {
            "Content-Type": "application/json",
        },
    })

    
    let json = await response.json();
    let answer = json.answer;

    let paises = [];
    let porcentajeFatalidad = [];

    for (let i = 0; i < answer.length; i++){
        if (answer[i].Quintil == quintil){
            paises.push(answer[i].Pais);
            porcentajeFatalidad.push(answer[i][decada]);
        }
    }

    let listaCombinada = paises.map((pais, index) => ({ pais, porcentajeFatalidad: porcentajeFatalidad[index] }));

    listaCombinada.sort((a, b) => a.pais.localeCompare(b.pais));

    let paisesOrdenados = listaCombinada.map(item => item.pais);
    let porcentajeFatalidadOrdenados = listaCombinada.map(item => item.porcentajeFatalidad);


    await onloadeddata(paisesOrdenados,porcentajeFatalidadOrdenados, `The percentage of infant fatalities before the first year of life per 1000, per economic quintile ${quintil}, country and decade of ${decada}`,"bar");
}

async function getJob18(data){
    const response = await fetch('/getJob',{
        method: "POST",
        body: JSON.stringify({name: "Job18"}),
        headers: {
            "Content-Type": "application/json",
        },
    })
    let json = await response.json();
    let answer = json.answer;

    let paises = [];
    let porcentajeFertilidad = [];

    
    for (let i = 0; i < answer.length; i++){
        porcentajeFertilidad.push(answer[i][data]);
        paises.push(answer[i].Pais);
    }

    let listaCombinada = paises.map((pais, index) => ({ pais, porcentajeFertilidad: porcentajeFertilidad[index] }));

    listaCombinada.sort((a, b) => a.pais.localeCompare(b.pais));

    let paisesOrdenados = listaCombinada.map(item => item.pais);
    let porcentajeFertilidadOrdenados = listaCombinada.map(item => item.porcentajeFertilidad);



    await onloadeddata(paisesOrdenados,porcentajeFertilidadOrdenados, `Fertility rate per decade of ${data} by country.`,"bar");
}

async function getJob19(data){
    const response = await fetch('/getJob',{
        method: "POST",
        body: JSON.stringify({name: "Job19"}),
        headers: {
            "Content-Type": "application/json",
        },
    })
    let json = await response.json();
    let answer = json.answer;
    let gastosTotales = [];
    let paises = [];
    
    console.log(data);
    for (let i = 0; i < answer.length; i++){
        if(answer[i].Decada == data){
            gastosTotales.push(answer[i].GastoEnSaludTotal);
            paises.push(answer[i].Pais);
        }
    }

    let listaCombinada = paises.map((pais, index) => ({ pais, gastosTotales: gastosTotales[index] }));

    listaCombinada.sort((a, b) => a.pais.localeCompare(b.pais));

    let paisesOrdenados = listaCombinada.map(item => item.pais);
    let gastosTotalesOrdenados = listaCombinada.map(item => item.gastosTotales);


    await onloadeddata(paisesOrdenados,gastosTotalesOrdenados, `Total, spent on health care by country and decade of ${data}`,"bar");
}

async function getJob20(data){
    const response = await fetch('/getJob',{
        method: "POST",
        body: JSON.stringify({name: "Job20"}),
        headers: {
            "Content-Type": "application/json",
        },
    })
    let json = await response.json();
    let answer = json.answer;
    let gastosTotales = [];
    let paises = [];

    
    for (let i = 0; i < answer.length; i++){
        if(answer[i].Decada == data){
            gastosTotales.push(answer[i].PorcentajeGastadoEnSalud);
            paises.push(answer[i].Pais);
        }
    }

    let listaCombinada = paises.map((pais, index) => ({ pais, gastosTotales: gastosTotales[index] }));

    listaCombinada.sort((a, b) => a.pais.localeCompare(b.pais));

    let paisesOrdenados = listaCombinada.map(item => item.pais);
    let gastosTotalesOrdenados = listaCombinada.map(item => item.gastosTotales);


    await onloadeddata(paisesOrdenados,gastosTotalesOrdenados, `Percentage spent on health by country and decade of ${data} of total government budget.`,"bar");
}

async function getJob21(data){
    const response = await fetch('/getJob',{
        method: "POST",
        body: JSON.stringify({name: "Job21"}),
        headers: {
            "Content-Type": "application/json",
        },
    })
    let json = await response.json();
    let answer = json.answer;
    let expectativasDeVida = [];
    let paises = [];

    
    for (let i = 0; i < answer.length; i++){
        if(answer[i].Decada == data){
            expectativasDeVida.push(answer[i].ExpectativaDeVidaTotal);
            paises.push(answer[i].Pais);
        }
    }

    let listaCombinada = paises.map((pais, index) => ({ pais, expectativasDeVida: expectativasDeVida[index] }));

    listaCombinada.sort((a, b) => a.pais.localeCompare(b.pais));

    let paisesOrdenados = listaCombinada.map(item => item.pais);
    let porcentajePoblacionOrdenados = listaCombinada.map(item => item.expectativasDeVida);

    await onloadeddata(paisesOrdenados,porcentajePoblacionOrdenados, `Life expectancy at birth by country and decade of ${data + 's'}.`,"bar");
}

async function getJob22(data){
    const response = await fetch('/getJob',{
        method: "POST",
        body: JSON.stringify({name: "Job22"}),
        headers: {
            "Content-Type": "application/json",
        },
    })
    let json = await response.json();
    let answer = json.answer;
    let turistasTotal = [];
    let paises = [];

    
    for (let i = 0; i < answer.length; i++){
        turistasTotal.push(answer[i][data]);
        paises.push(answer[i].Pais);
    }

    let listaCombinada = paises.map((pais, index) => ({ pais, turistasTotal: turistasTotal[index] }));

    listaCombinada.sort((a, b) => a.pais.localeCompare(b.pais));

    let paisesOrdenados = listaCombinada.map(item => item.pais);
    let porcentajeTuristasOrdenados = listaCombinada.map(item => item.turistasTotal);


    await onloadeddata(paisesOrdenados,porcentajeTuristasOrdenados, `Total inbound tourists per country per decade of ${data}.`,"bar");
}

async function getJob23(data){
    const response = await fetch('/getJob',{
        method: "POST",
        body: JSON.stringify({name: "Job23"}),
        headers: {
            "Content-Type": "application/json",
        },
    })
    let json = await response.json();
    let answer = json.answer;
    let turistasTotal = [];
    let paises = [];

    
    for (let i = 0; i < answer.length; i++){
        turistasTotal.push(answer[i][data]);
        paises.push(answer[i].Pais);
    }

    let listaCombinada = paises.map((pais, index) => ({ pais, turistasTotal: turistasTotal[index] }));

    listaCombinada.sort((a, b) => a.pais.localeCompare(b.pais));

    let paisesOrdenados = listaCombinada.map(item => item.pais);
    let porcentajeTuristasOrdenados = listaCombinada.map(item => item.turistasTotal);


    await onloadeddata(paisesOrdenados,porcentajeTuristasOrdenados, `Total number of outbound tourists per decade of ${data}`,"bar");
}

function onloadeddata(list1, list2, name, typeChart){
    myChart.data.labels = [];
    myChart.data.datasets = [];

    myChart.data.labels = list1;
    myChart.data.datasets = [{label: name,
        data: list2,
        backgroundColor: "rgba(75, 192, 192, 0.6)", // Color de fondo de las barras
        borderColor: "rgba(75, 192, 192, 1)", // Color del borde de las barras
        borderWidth: 1, // Ancho del borde de las barras}];
    }];
    
    myChart.update();
}

function clickFilter(){
   
    if(comboSelect.value == "1" && comboSelect2.value == "1"){
        getJob1();
    }
    else if (comboSelect.value == "1" && comboSelect2.value == "2" && comboSelect3.value != "0"){
        getJob2(comboSelect3.options[comboSelect3.value].text, "PromedioDeHomicidios");
    }
    else if (comboSelect.value == "1" && comboSelect2.value == "3" && comboSelect3.value != "0"){
        getJob2(comboSelect3.options[comboSelect3.value].text, "Max");
    }
    else if (comboSelect.value == "1" && comboSelect2.value == "4" && comboSelect3.value != "0"){
        getJob2(comboSelect3.options[comboSelect3.value].text, "Min");
    }
    else if (comboSelect.value == "1" && comboSelect2.value == "5" && comboSelect3.value != "0"){
        getJob3(comboSelect3.options[comboSelect3.value].text,comboSelect3.options[comboSelect3.value].text.replace(/\s/g, ""), "PromedioDeHomicidios");
    }
    else if (comboSelect.value == "1" && comboSelect2.value == "6" && comboSelect3.value != "0"){
        getJob3(comboSelect3.options[comboSelect3.value].text,comboSelect3.options[comboSelect3.value].text.replace(/\s/g, ""), "Max");
    }
    else if (comboSelect.value == "1" && comboSelect2.value == "7" && comboSelect3.value != "0"){
        getJob3(comboSelect3.options[comboSelect3.value].text,comboSelect3.options[comboSelect3.value].text.replace(/\s/g, ""), "Min");
    }
    else if (comboSelect.value == "1" && comboSelect2.value == "8" && comboSelect3.value != "0"){
        getJob4(comboSelect3.options[comboSelect3.value].text);
    }
    else if (comboSelect.value == "1" && comboSelect2.value == "9" && comboSelect3.value != "0"){
        getJob5(comboSelect3.options[comboSelect3.value].text.split(" - ")[0],comboSelect3.options[comboSelect3.value].text.split(" - ")[1], "PromedioDeHomicidios");
    }
    else if (comboSelect.value == "1" && comboSelect2.value == "10" && comboSelect3.value != "0"){
        getJob5(comboSelect3.options[comboSelect3.value].text.split(" - ")[0],comboSelect3.options[comboSelect3.value].text.split(" - ")[1], "Max");
    }
    else if (comboSelect.value == "1" && comboSelect2.value == "11" && comboSelect3.value != "0"){
        getJob5(comboSelect3.options[comboSelect3.value].text.split(" - ")[0],comboSelect3.options[comboSelect3.value].text.split(" - ")[1], "Min");
    }
    else if (comboSelect.value == "1" && comboSelect2.value == "12" && comboSelect3.value != "0"){
        getJob6(comboSelect3.options[comboSelect3.value].text.split(" - ")[0].replace(/\s/g, ""),comboSelect3.options[comboSelect3.value].text.split(" - ")[1].replace(/\s/g, ""), "PromedioDeHomicidios");
    }
    else if (comboSelect.value == "1" && comboSelect2.value == "13" && comboSelect3.value != "0"){
        getJob6(comboSelect3.options[comboSelect3.value].text.split(" - ")[0].replace(/\s/g, ""),comboSelect3.options[comboSelect3.value].text.split(" - ")[1].replace(/\s/g, ""), "Max");
    }
    else if (comboSelect.value == "1" && comboSelect2.value == "14" && comboSelect3.value != "0"){
        getJob6(comboSelect3.options[comboSelect3.value].text.split(" - ")[0].replace(/\s/g, ""),comboSelect3.options[comboSelect3.value].text.split(" - ")[1].replace(/\s/g, ""), "Min");
    }
    else if (comboSelect.value == "1" && comboSelect2.value == "15" && comboSelect3.value != "0"){
        getJob7(comboSelect3.options[comboSelect3.value].text.split(" - ")[0],comboSelect3.options[comboSelect3.value].text.split(" - ")[1], "PromedioDeHomicidios");
    }
    else if (comboSelect.value == "1" && comboSelect2.value == "16" && comboSelect3.value != "0"){
        getJob7(comboSelect3.options[comboSelect3.value].text.split(" - ")[0],comboSelect3.options[comboSelect3.value].text.split(" - ")[1], "Max");
    }
    else if (comboSelect.value == "1" && comboSelect2.value == "17" && comboSelect3.value != "0"){
        getJob7(comboSelect3.options[comboSelect3.value].text.split(" - ")[0],comboSelect3.options[comboSelect3.value].text.split(" - ")[1], "Min");
    }
    else if (comboSelect.value == "1" && comboSelect2.value == "18" && comboSelect3.value != "0"){
        getJob8(comboSelect3.options[comboSelect3.value].text.split(" - ")[0].replace(/\s/g, ""),comboSelect3.options[comboSelect3.value].text.split(" - ")[1].replace(/\s/g, ""), "PromedioDeHomicidios");
    }
    else if (comboSelect.value == "1" && comboSelect2.value == "19" && comboSelect3.value != "0"){
        getJob8(comboSelect3.options[comboSelect3.value].text.split(" - ")[0].replace(/\s/g, ""),comboSelect3.options[comboSelect3.value].text.split(" - ")[1].replace(/\s/g, ""), "Max");
    }
    else if (comboSelect.value == "1" && comboSelect2.value == "20" && comboSelect3.value != "0"){
        getJob8(comboSelect3.options[comboSelect3.value].text.split(" - ")[0].replace(/\s/g, ""),comboSelect3.options[comboSelect3.value].text.split(" - ")[1].replace(/\s/g, ""), "Min");
    }
    else if (comboSelect.value == "2" && comboSelect2.value == "1"){
        getJob9A("2008");
    }
    else if (comboSelect.value == "2" && comboSelect2.value == "2"){
        getJob9B("2008");
    }
    else if (comboSelect.value == "2" && comboSelect2.value == "3"){
        getJob9C("2008");
    }
    else if (comboSelect.value == "2" && comboSelect2.value == "4"){
        getJob10A("PromedioMuertes");
    }
    else if (comboSelect.value == "2" && comboSelect2.value == "5"){
        getJob10A("Max");
    }
    else if (comboSelect.value == "2" && comboSelect2.value == "6"){
        getJob10A("Min");
    }
    else if (comboSelect.value == "2" && comboSelect2.value == "7"){
        getJob10B("PromedioMuertes");
    }
    else if (comboSelect.value == "2" && comboSelect2.value == "8"){
        getJob10B("Max");
    }
    else if (comboSelect.value == "2" && comboSelect2.value == "9"){
        getJob10B("Min");
    }
    else if (comboSelect.value == "2" && comboSelect2.value == "10"){
        getJob10C("PromedioMuertes");
    }
    else if (comboSelect.value == "2" && comboSelect2.value == "11"){
        getJob10C("Max");
    }
    else if (comboSelect.value == "2" && comboSelect2.value == "12"){
        getJob10C("Min");
    }
    else if (comboSelect.value == "2" && comboSelect2.value == "12"){
        getJob10C("Min");
    }
    else if (comboSelect.value == "3" && comboSelect2.value == "1"){
        getJob11();
    }
    else if (comboSelect.value == "3" && comboSelect2.value == "2" && comboSelect3.value == "1"){
        getJob12("2010s");
    }
    else if (comboSelect.value == "4" && comboSelect2.value == "1" && comboSelect3.value != "0"){
        getJob13((comboSelect3.options[comboSelect3.value].text));
    }
    else if (comboSelect.value == "5" && comboSelect2.value == "1" && comboSelect3.value != "0"){
        getJob14((comboSelect3.options[comboSelect3.value].text));
    }
    else if (comboSelect.value == "5" && comboSelect2.value == "2" && comboSelect3.value != "0"){
        getJob15(comboSelect3.options[comboSelect3.value].text.split(" - ")[0],comboSelect3.options[comboSelect3.value].text.split(" - ")[1]);
    }
    else if (comboSelect.value == "5" && comboSelect2.value == "3" && comboSelect3.value != "0"){
        getJob18(comboSelect3.options[comboSelect3.value].text);
    }    
    else if (comboSelect.value == "6" && comboSelect2.value == "1" && comboSelect3.value != "0"){
        getJob16(comboSelect3.options[comboSelect3.value].text);
    }
    else if (comboSelect.value == "6" && comboSelect2.value == "2" && comboSelect3.value != "0"){
        getJob17(comboSelect3.options[comboSelect3.value].text.split(" - ")[0],comboSelect3.options[comboSelect3.value].text.split(" - ")[1]);
    }
    else if (comboSelect.value == "7" && comboSelect2.value == "1" && comboSelect3.value != "0"){
        getJob19(comboSelect3.options[comboSelect3.value].text.slice(0,-1));
    }
    else if (comboSelect.value == "7" && comboSelect2.value == "2" && comboSelect3.value != "0"){
        getJob20(comboSelect3.options[comboSelect3.value].text);
    }
    else if (comboSelect.value == "8" && comboSelect2.value == "1" && comboSelect3.value != "0"){
        getJob21(comboSelect3.options[comboSelect3.value].text.slice(0,-1));
    }
    else if (comboSelect.value == "9" && comboSelect2.value == "1" && comboSelect3.value != "0"){
        getJob22(comboSelect3.options[comboSelect3.value].text);
    }
    else if (comboSelect.value == "9" && comboSelect2.value == "2" && comboSelect3.value != "0"){
        getJob23(comboSelect3.options[comboSelect3.value].text);
    }


    
}

function onloadOptionsFilter(){
    if(comboSelect.value == "1" && comboSelect2.value == "1"){
        comboSelect3.innerHTML=``;
    }
    else if(comboSelect.value == "1" && (comboSelect2.value == "2" || comboSelect2.value == "3" || comboSelect2.value == "4" )){
        comboSelect3.innerHTML=``;
        comboSelect3.innerHTML=`<option selected value ="0">Select</option>
        <option value="1">Africa</option>
        <option value="2">Americas</option>
        <option value="3">Asia</option>
        <option value="4">Europe</option>
        <option value="5">Oceania</option>`;
    }
    else if(comboSelect.value == "1" && (comboSelect2.value == "5" || comboSelect2.value == "6" || comboSelect2.value == "7")){
        comboSelect3.innerHTML=``;
        comboSelect3.innerHTML=`<option selected value ="0">Select</option>
        <option value="1">Australia and NewZealand</option>
        <option value="2">Central Asia</option>
        <option value="3">Eastern Asia</option>
        <option value="4">Eastern Europe</option>
        <option value="5">Latin America and the Caribbean</option>
        <option value="6">Melanesia</option>
        <option value="7">Micronesia</option>
        <option value="8">Northern Africa</option>
        <option value="9">Northern America</option>
        <option value="10">Northern Europe</option>
        <option value="11">Polynesia</option>
        <option value="12">South-easternAsia</option>
        <option value="13">Southern Asia</option>
        <option value="14">Southern Europe</option>
        <option value="15">Sub-SaharanAfrica</option>
        <option value="16">WesternAsia</option>
        <option value="17">WesternEurope</option>
        `;
    }
    else if(comboSelect.value == "1" && (comboSelect2.value == "8")){
        comboSelect3.innerHTML=``;
        comboSelect3.innerHTML=`<option selected value ="0">Select</option>
        <option value="1">Female</option>
        <option value="2">Male</option>
        `;
    }
    else if(comboSelect.value == "1" && (comboSelect2.value == "9" || comboSelect2.value == "10" ||
                comboSelect2.value == "11" || comboSelect2.value == "15" || comboSelect2.value == "16" ||
                    comboSelect2.value == "17")){
        comboSelect3.innerHTML=``;
        comboSelect3.innerHTML=`<option selected value ="0">Select</option>
        <option value="1">Africa - Female</option>
        <option value="2">Africa - Male</option>
        <option value="3">Americas - Female</option>
        <option value="4">Americas - Male</option>
        <option value="5">Asia - Female</option>
        <option value="6">Asia - Male</option>
        <option value="7">Europe - Female</option>
        <option value="8">Europe - Male</option>
        <option value="9">Oceania - Female</option>
        <option value="10">Oceania - Male</option>`;
    }
    else if(comboSelect.value == "1" && (comboSelect2.value == "12" || comboSelect2.value == "13" ||
             comboSelect2.value == "14" || comboSelect2.value == "18" || comboSelect2.value == "19" ||
             comboSelect2.value == "20")){
        comboSelect3.innerHTML=``;
        comboSelect3.innerHTML=`<option selected value ="0">Select</option>
        <option value="1">Australia and NewZealand - Female</option>
        <option value="2">Australia and NewZealand - Male</option>
        <option value="3">Central Asia - Female</option>
        <option value="4">Central Asia - Male</option>
        <option value="5">Eastern Asia - Female</option>
        <option value="6">Eastern Asia - Male</option>
        <option value="7">Eastern Europe - Female</option>
        <option value="8">Eastern Europe - Male</option>
        <option value="9">Latin America and the Caribbean - Female</option>
        <option value="10">Latin America and the Caribbean - Male</option>
        <option value="11">Melanesia - Female</option>
        <option value="12">Melanesia - Male</option>
        <option value="13">Micronesia - Female</option>
        <option value="14">Micronesia - Male</option>
        <option value="15">Northern Africa - Female</option>
        <option value="16">Northern Africa - Male</option>
        <option value="17">Northern America - Female</option>
        <option value="18">Northern America - Male</option>
        <option value="19">Northern Europe - Female</option>
        <option value="20">Northern Europe - Male</option>
        <option value="21">Polynesia - Female</option>
        <option value="22">Polynesia - Male</option>
        <option value="23">South-easternAsia - Female</option>
        <option value="24">South-easternAsia - Male</option>
        <option value="25">Southern Asia - Female</option>
        <option value="26">Southern Asia - Male</option>
        <option value="27">Southern Europe - Female</option>
        <option value="28">Southern Europe - Male</option>
        <option value="29">Sub-SaharanAfrica - Female</option>
        <option value="30">Sub-SaharanAfrica - Male</option>
        <option value="31">WesternAsia - Female</option>
        <option value="32">WesternAsia - Male</option>
        <option value="33">WesternEurope - Female</option>
        <option value="34">WesternEurope - Male</option>
        `;
    }
    else if(comboSelect.value == "2" && (comboSelect2.value == "1" || comboSelect2.value == "2" ||
     comboSelect2.value == "3" || comboSelect2.value == "4" || comboSelect2.value == "5" ||
     comboSelect2.value == "6" || comboSelect2.value == "7" || comboSelect2.value == "8" ||
     comboSelect2.value == "9" || comboSelect2.value == "10" || comboSelect2.value == "11" ||
     comboSelect2.value == "12")){
        comboSelect3.innerHTML=``;
    }
    else if(comboSelect.value == "3" && (comboSelect2.value == "1")){
        comboSelect3.innerHTML=``;
    }
    else if(comboSelect.value == "3" && (comboSelect2.value == "2")){
        comboSelect3.innerHTML=``;
        comboSelect3.innerHTML=`<option selected value ="0">Select</option>
        <option value="1">2010s</option>]
        `
    }
    else if(comboSelect.value == "4" && (comboSelect2.value == "1")){
        comboSelect3.innerHTML=``;
        comboSelect3.innerHTML=`<option selected value ="0">Select</option>
        <option value="1">1990s</option>
        <option value="2">2000s</option>
        <option value="3">2010s</option>
        `
    }
    else if(comboSelect.value == "5" && (comboSelect2.value == "1")){
        comboSelect3.innerHTML=``;
        comboSelect3.innerHTML=`<option selected value ="0">Select</option>
        <option value="1">1990s</option>
        <option value="2">2000s</option>
        <option value="3">2010s</option>
        `
    }
    else if(comboSelect.value == "5" && (comboSelect2.value == "2")){
        comboSelect3.innerHTML=``;
        comboSelect3.innerHTML= `<option selected value ="0">Select</option>
        <option value="1">Q1(Poorest) - 1990s</option>
        <option value="2">Q1(Poorest) - 2000s</option>
        <option value="3">Q1(Poorest) - 2010s</option>
        <option value="4">Q2 - 1990s</option>
        <option value="5">Q2 - 2000s</option>
        <option value="6">Q2 - 2010s</option>
        <option value="7">Q3 - 1990s</option>
        <option value="8">Q3 - 2000s</option>
        <option value="9">Q3 - 2010s</option>
        <option value="10">Q4 - 1990s</option>
        <option value="11">Q4 - 2000s</option>
        <option value="12">Q4 - 2010s</option>
        <option value="13">Q5(Richest) - 1990s</option>
        <option value="14">Q5(Richest) - 2000s</option>
        <option value="15">Q5(Richest) - 2010s</option>
        `
    }
    else if(comboSelect.value == "5" && (comboSelect2.value == "3")){
        comboSelect3.innerHTML=``
        comboSelect3.innerHTML=`<option selected value ="0">Select</option>
        <option value="1">1990s</option>
        <option value="2">2000s</option>
        <option value="3">2010s</option>
        `
    }
    else if(comboSelect.value == "6" && (comboSelect2.value == "1")){
        comboSelect3.innerHTML=``
        comboSelect3.innerHTML=`<option selected value ="0">Select</option>
        <option value="1">1990s</option>
        <option value="2">2000s</option>
        <option value="3">2010s</option>
        `
    }
    else if(comboSelect.value == "6" && (comboSelect2.value == "2")){
        comboSelect3.innerHTML=``;
        comboSelect3.innerHTML= `<option selected value ="0">Select</option>
        <option value="1">Q1(Poorest) - 1990s</option>
        <option value="2">Q1(Poorest) - 2000s</option>
        <option value="3">Q1(Poorest) - 2010s</option>
        <option value="4">Q2 - 1990s</option>
        <option value="5">Q2 - 2000s</option>
        <option value="6">Q2 - 2010s</option>
        <option value="7">Q3 - 1990s</option>
        <option value="8">Q3 - 2000s</option>
        <option value="9">Q3 - 2010s</option>
        <option value="10">Q4 - 1990s</option>
        <option value="11">Q4 - 2000s</option>
        <option value="12">Q4 - 2010s</option>
        <option value="13">Q5(Richest) - 1990s</option>
        <option value="14">Q5(Richest) - 2000s</option>
        <option value="15">Q5(Richest) - 2010s</option>
        `
    }
    else if(comboSelect.value == "7" && (comboSelect2.value == "1" || comboSelect2.value == "2")){
        comboSelect3.innerHTML=``
        comboSelect3.innerHTML=`<option selected value ="0">Select</option>
        <option value="1">1990s</option>
        <option value="2">2000s</option>
        <option value="3">2010s</option>
        `
    }
    else if(comboSelect.value == "8" && (comboSelect2.value == "1" )){
        comboSelect3.innerHTML=``
        comboSelect3.innerHTML=`<option selected value ="0">Select</option>
        <option value="1">1990s</option>
        <option value="2">2000s</option>
        <option value="3">2010s</option>
        `
    }
    else if(comboSelect.value == "9" && (comboSelect2.value == "1" || comboSelect2.value == "2")){
        comboSelect3.innerHTML=``
        comboSelect3.innerHTML=`<option selected value ="0">Select</option>
        <option value="1">1990s</option>
        <option value="2">2000s</option>
        <option value="3">2010s</option>
        `
    }
    
}

function onloadOptions(){
    if(comboSelect.value == "1"){
        comboSelect2.innerHTML=``; 
        comboSelect2.innerHTML = `<option selected value ="0">Select</option>
        <option value="1">Average Number of Homicide Victims per Country</option>
        <option value="2">Average Number of Homicides per Region per Year</option>
        <option value="3">Maximum Number of Homicides per Region per Year</option>
        <option value="4">Minimum Number of Homicides per Region per Year</option>
        <option value="5">Average Number of Homicides per Subregion per Year</option>
        <option value="6">Maximum Number of Homicides per Subregion per Year</option>
        <option value="7">Minimum Number of Homicides per Subregion per Year</option>
        <option value="8">Average Number of Homicide Victims per Country per Sex</option>
        <option value="9">Average Number of Homicides per Region and Sex per Year</option>
        <option value="10">Maximum Number of Homicides per Region and Sex per Year</option>
        <option value="11">Minimum Number of Homicides per Region and Sex per Year</option>
        <option value="12">Average Number of Homicides per Subregion and sex per year</option>
        <option value="13">Maximum Number of Homicides per Subregion and sex per year</option>
        <option value="14">Minimum Number of Homicides per Subregion and Sex per Year</option>
        <option value="15">Average Number of Homicides per Region and Sex per Decade</option>
        <option value="16">Maximum Number of Homicides per Region and Sex per Decade</option>
        <option value="17">Minimum Number of Homicides per Region and Sex per Decade</option>
        <option value="18">Average Number of Homicides per Subregion and Sex per Decade</option>
        <option value="19">Maximum Number of Homicides per Subregion and Sex per Decade</option>
        <option value="20">Minimum Number of Homicides per Subregion and Sex per Decade</option>`;
    }
    else if(comboSelect.value == "2"){
        comboSelect2.innerHTML=``; 
        comboSelect2.innerHTML = `<option selected value ="0">Select</option>
        <option value="1">Percentage of deaths of people between 30 and 70 for Cancer compared to the total</option>
        <option value="2">Percentage of deaths of people between 30 and 70 for Cardiovasular disease and diabetes compared to the total</option>
        <option value="3">Percentage of deaths of people between 30 and 70 for Chronic respiratory conditions compared to the total</option>
        <option value="4">Average number of deaths per country per reported causes</option>
        <option value="5">Maximum number of deaths per country per reported causes</option>
        <option value="6">Minimum number of deaths per country per reported causes</option>
        <option value="7">Average number of deaths per country per non-communication causes</option>
        <option value="8">Maximum number of deaths per country per non-communication causes</option>
        <option value="9">Minimum number of deaths per country per non-communication causes</option>
        <option value="10">Average number of deaths per country per injuries</option>
        <option value="11">Maximum number of deaths per country per injuries</option>
        <option value="12">Minimum number of deaths per country per injuries</option>
        `
    }
    else if(comboSelect.value == "3"){
        comboSelect2.innerHTML=``;
        comboSelect2.innerHTML = `<option selected value ="0">Select</option>
        <option value="1">The difference between the first year of measured average age by country and the last year measured by country</option>
        <option value="2">Average age by country by decade</option>`;

    }
    else if(comboSelect.value == "4"){
        comboSelect2.innerHTML=``;
        comboSelect2.innerHTML = `<option selected value ="0">Select</option>
        <option value="1">The amount of population per decade</option>`;
    }
    else if(comboSelect.value == "5"){
        comboSelect2.innerHTML=``;
        comboSelect2.innerHTML = `<option selected value ="0">Select</option>
        <option value="1">Adolescent fertility rate per 1000, per decade of and country</option>
        <option value="2">Adolescent fertility rate per 1,000, per economic quintile, country and decade</option>
        <option value="3">Fertility rate per decade per country</option>
        `;
    }
    else if(comboSelect.value == "6"){
        comboSelect2.innerHTML=``;
        comboSelect2.innerHTML = `<option selected value ="0">Select</option>
        <option value="1">The percentage of infant fatalities before the first year of life per 1000, per decade and country</option>
        <option value="2">The percentage of infant fatalities before the first year of life per 1000, per economic quintile, country and decade</option>`;
    }
    else if(comboSelect.value == "7"){
        comboSelect2.innerHTML=``;
        comboSelect2.innerHTML = `<option selected value ="0">Select</option>
        <option value="1">Total, spent on health care by country and decade</option>
        <option value="2">Percentage spent on health by country and decade of total government budget</option>
        `;
    }
    else if(comboSelect.value == "8"){
        comboSelect2.innerHTML=``;
        comboSelect2.innerHTML =`<option selected value ="0">Select</option>
        <option value="1">Life expectancy at birth by country and decade</option>`;
    }
    else if(comboSelect.value == "9"){
        comboSelect2.innerHTML=``;
        comboSelect2.innerHTML=`<option selected value ="0">Select</option>
        <option value="1">Total inbound tourists per country per decade</option>
        <option value="2">Total number of outbound tourists per decade</option>
        `;
    }
}