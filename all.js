const btn = document.querySelector(".btn")
const cmInput = document.querySelector(".cm")
const kgInput = document.querySelector(".kg")
const bmilist = document.querySelector(".bmi-list")
const result = document.querySelector(".see-btn")

btn.addEventListener('click',bmiinput)

const data = [] || JSON.parse(localStorage.getItem("data"));

function bmiinput(e){
    let str = {};
    const cm = cmInput.value;
    const kg = kgInput.value;
    if (!kg||!cm){
        alert("請輸入數值");
        return
    }
    const bmi = Math.round((kg/((cm/100)*(cm/100))*100))/100;
    const today = new Date();
    const date = today.getFullYear()+ "-" + (today.getMonth()+1) + "-" + (today.getDate());
    if (bmi < 18.5) {
        judge = '體重過輕';
        color = '#31BAF9';
      } else if (bmi >= 18.5 && bmi < 25) {
        judge = '理想';
        color = '#86D73F';
      } else if (bmi >= 25 && bmi < 30) {
        judge = '體重過重';
        color = '#FF982D';
      } else if (bmi >= 30 && bmi < 35) {
        judge = '輕度肥胖';
        color = '#FF6C03';
      } else if (bmi >= 35 && bmi < 40) {
        judge = '中度肥胖';
        color = '#FF6C03';
      } else {
        judge = '重度肥胖';
        color = '#FF1200';
      }
    data.unshift({
      color : color ,
      judge : judge ,
      bmi : bmi ,
      weight : kg ,
      height : cm ,
      date : date 
    })
    localStorage.setItem('bmilist',JSON.stringify(data));
    console.log(data)
    showlist(data);
    showresult(data);
}

function showlist(data){
    let str = ''
    for (let i = 0 ; data.length > i ; i++){
        str += `
        <li style="border-left: 7px solid ${data[i].color}">
            <h3>${data[i].judge}</h3>
            <p class="mr42"><span>BMI</span>${data[i].bmi}</p>
            <p class="mr42"><span>weight</span>${data[i].weight}kg</p>
            <p class="mr52"><span>height</span>${data[i].height}cm</p>
            <span>${data[i].date}</span>
        </li>
        `
    };
    bmilist.innerHTML = str ;
}

function showresult(data){
    let str = '';
    str = `
    <div class="result-btn">
        <div class="bmi-value" style=" border: 6px solid ${data[0].color}">
            <p style="color: ${data[0].color}">${data[0].bmi}</p>
            <em style="color: ${data[0].color}">BMI</em>
        </div>
        <h3 style="color: ${data[0].color}">${data[0].judge}</h3>
        <input type="button" style="background-image: url(https://hexschool.github.io/JavaScript_HomeWork/assets/icons_loop.png); background-color: ${data[0].color};" class="reset">
    </div>
    `
    result.innerHTML = str;
    document.querySelector(".reset").addEventListener('click',() => {
        cmInput.value = ''
        kgInput.value = ''
        result.innerHTML = '<input type="button" value="看結果" class="btn">';
        document.querySelector(".btn").addEventListener('click',bmiinput)
    })
}

