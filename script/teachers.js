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
                fetch('https://mokhir.herokuapp.com/teachers', {
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
       
       let CoursName = teacherItem.querySelector('.oursName')
       let Courscost = teacherItem.querySelector('.cost')
       let mony = teacherItem.querySelector('.mony')
       CoursName.textContent = tracher.teacher_name
       Courscost.textContent = 'Age '+ tracher.teacher_age
       mony.textContent = '$' + '1000'
       let teachers = teacherItem.querySelector('.teachers')
       let groups = teacherItem.querySelector('.groups')
       list.appendChild(teacherItem)
       let modal1 = document.querySelector('.modal1')
        let modal = document.querySelector('.modal')
        let header = document.querySelector('.teachersNameHeader')
        
       
        teachers.addEventListener("click" , (evt)=>{
            evt.preventDefault()
             modal.classList.add('active')
             let teacherlist = document.querySelector('.teachersname')
             header.textContent = 'Courses'
             teacherlist.innerHTML = null
             
             console.log(tracher.course_name)
        
             outbtn.addEventListener('click' , (evt)=>{
                 evt.preventDefault();
                 modal.classList.remove("active")
             })
             
             tracher.course_name.forEach(ism=>{
                const newHeader = document.createElement('li')
                newHeader.setAttribute('class', 'names')
                

                 newHeader.textContent = ism
                 console.log(ism)
                 teacherlist.appendChild(newHeader)
                
            })
            
        })
        groups.addEventListener("click" , (evt)=>{
            evt.preventDefault()
             modal.classList.add('active')
             let teacherlist = document.querySelector('.teachersname')
             header.textContent = 'Groups name'
             teacherlist.innerHTML = null
             outbtn.addEventListener('click' , (evt)=>{
                 evt.preventDefault();
                 modal.classList.remove("active")
             })
             
             tracher.group_name.forEach(ism=>{
                const newHeader = document.createElement('li')
                newHeader.setAttribute('class', 'names')
                 newHeader.textContent = ism
                 console.log(ism)
                 teacherlist.appendChild(newHeader)
                  
            })  
        })
    }); 
}
