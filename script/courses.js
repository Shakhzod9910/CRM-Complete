let token = window.localStorage.getItem('token')
if(!token){
    window.location.replace("login.html");
}else{
    let checker = {
        token: token
    }
    fetch('https://mokhir.herokuapp.com/', {
            method: 'POST',
            body: JSON.stringify(checker),
            headers: {
                'Content-type': 'application/json; charset=UTF-8'
            }
        })
        .then(response => response.json())
        .then(json => {
            if(json == 'ok'){
                fetch('https://mokhir.herokuapp.com/', {
                method: 'GET',
                headers: {
                    'Content-type': 'application/json; charset=UTF-8'
                }
            })
            .then(response => response.json())
            .then(json2 => {
                Render(json2,lists)
            })
            .catch(err => console.log(err));
            }else{
                window.location.replace("login.html");
            }
        })
        .catch(err => console.log(err));
}

let coursesList = document.querySelector('.coursesList')
let coursesTemplate = document.querySelector('#coursesTemplate').content
let lists = document.querySelector('.coursesList')
let outbtn = document.querySelector(".out")


const Render = (array,list)=>{
    array.forEach(tracher => {
       let teacherItem = coursesTemplate.cloneNode(true)
       
       let CoursName = teacherItem.querySelector('.CoursName')
       let Courscost = teacherItem.querySelector('.cost')
       CoursName.textContent = tracher.course_name
       Courscost.textContent = '$'+ tracher.course_cost
       let teachers = teacherItem.querySelector('.teachers')
       list.appendChild(teacherItem)
        let modal = document.querySelector('.modal')
       
        teachers.addEventListener("click" , (evt)=>{
            evt.preventDefault()
             modal.classList.add('active')
             let teacherlist = document.querySelector('.teachersname')
             teacherlist.innerHTML = null
             
             console.log(tracher.course_name)
        
             outbtn.addEventListener('click' , (evt)=>{
                 evt.preventDefault();
                 modal.classList.remove("active")
             })
             tracher.teacher_name.forEach(ism=>{
                const newHeader = document.createElement('li')
                newHeader.setAttribute('class', 'names')
                 newHeader.textContent = ism
                 console.log(ism)
                 teacherlist.appendChild(newHeader)
                //  console.log(ism)  
            })  
        })
    });
}





