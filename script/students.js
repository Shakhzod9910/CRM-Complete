let token = window.localStorage.getItem('token')
if (!token) {
    window.location.replace("login.html");
} else {
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
            if (json == 'ok') {
                fetch('https://mokhir.herokuapp.com/students', {
                        method: 'GET',
                        headers: {
                            'Content-type': 'application/json; charset=UTF-8'
                        }
                    })
                    .then(response => response.json())
                    .then(json2 => {
                        Render(json2, lists)
                    })
                    .catch(err => console.log(err));
            } else {
                window.location.replace("login.html");
            }
        })
        .catch(err => console.log(err));
}

let coursesList = document.querySelector('.coursesList')
let coursesTemplate = document.querySelector('#coursesTemplate').content
let lists = document.querySelector('.coursesList')
let outbtn = document.querySelector(".out")


const Render = (array, list) => {
    array.forEach(tracher => {
        let teacherItem = coursesTemplate.cloneNode(true)

        let CoursName = teacherItem.querySelector('.CoursName')
        let Courscost = teacherItem.querySelector('.cost')
        let teachers = teacherItem.querySelector('.teachers')
        let mony = teacherItem.querySelector('.mony')
        CoursName.textContent = tracher.student_name
        Courscost.textContent = tracher.teacher_name
        teachers.textContent = tracher.group_name
        if (tracher.salary_amount == null) {
            mony.textContent = '$' + '0'
        }else{
            mony.textContent = '$' + tracher.salary_amount
        }

        list.appendChild(teacherItem)
        let modal = document.querySelector('.modal')
    });
}