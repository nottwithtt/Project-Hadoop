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
    
}

function onloadOptions(){
    console.log(comboSelect.value);
    if(comboSelect.value == "1"){

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
    }
    else if(comboSelect.value == "3"){
        comboSelect2.innerHTML=``;
    }
    else if(comboSelect.value == "4"){
        comboSelect2.innerHTML=``;
    }
    else if(comboSelect.value == "5"){
        comboSelect2.innerHTML=``;
    }
    else if(comboSelect.value == "6"){
        comboSelect2.innerHTML=``;
    }
    else if(comboSelect.value == "7"){
        comboSelect2.innerHTML=``;
    }
    else if(comboSelect.value == "8"){
        comboSelect2.innerHTML=``;
    }
}