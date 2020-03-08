const mysql=require('mysql');
const inquirer= require('inquirer');

const connection=mysql.createConnection({
    host:'localhost',
    port:3306,

    user:'root',
    password:'rootpass',
    database:'office'
});

function start(){
    connection.connect((err)=>{
        if(err) throw err;
        console.log("Connected to the database!");
        inquirer.prompt([
            {
                name:'action',
                type:'list',
                message:'What would you like to do?',
                choices:[
                    'Add Employee',
                    'Remove Employee',
                    'View All Employees',
                    'Add Employee Role',
                    'Delete Employee Role',
                    'View Employee Role',
                    'Add Employee By Department',
                    'View Employee By Department',
                    'Delete Employee by Department',
                    'Update Employee Roles'
                ]
            }   

        ]).then(function(answer){
            switch(answer.action){
                case 'Add Employee':
                    addEmployee();
                    break;

                case 'Remove Employee':
                    removeEmployee();
                    break;

                case 'View All Employees':
                    viewAllEmployees();
                    break;

                case 'Add Employee Role':
                    addRole();
                    break;

                case 'View Employee Role':
                    viewRole();
                    break;

                case 'Add Employee By Department':
                    addDepartment();
                    break;
                
                case 'View Employee By Department':
                    viewDepartment();
                    break;
                
                case 'Update Employee Roles':
                    updateRoles();
                    break;
                
                case 'Delete Employee Role':
                    deleteRole();
                    break;

                case 'Delete Employee by Department':
                    deleteDepartment();
                    break;
            }
        })
    })

    function addEmployee(){
        let listNames=["None"];
        
        connection.query('select first_name from employee',function(err,data){
            if(err) throw err;
            for(let i=0;i<data.length;i++){
                listNames.push(data[i].first_name);
            }

        })
        inquirer.prompt([
            {
                name:'first',
                type:'input',
                message:'Enter the first name of the employee',
            },
            {
                name:'last',
                type:'input',
                message:'Enter the last name',

            },
            {
                name:'erole',
                type:'list',
                message:'What is employee role?',
                choices:[
                    'Software Engineer',
                    'Software Tester',
                    'Lead Engineer',
                    'Sales Lead',
                    'Sales Person',
                    'Lawyer'
                ]
            },
            {
                name:'managerName',
                type:'list',
                message:'Who is the employee manager?',
                choices:listNames
            }

        ]).then(function(response){
            connection.query(`insert into employee (first_name,last_name,role_id,manager_id) values (?,?,(select id from role where title=?),(select id from employee e where e.first_name=?))`,[response.first,response.last,response.erole,response.managerName],
            function(err,result){
                if(err) throw err;
                console.log(result);
            })
        })
    }

    function addRole(){
        let roles=[];
        connection.query('select title from role',function(err,data){
           if(err) throw err;
           for(let i=0;i<data.length;i++){
               roles.push(data[i].title);
           }

        inquirer.prompt([
            {
                name:'title',
                type:'list',
                message:'What is employee role?',
                choices: roles
            },

            {
                name:'salary',
                type:'input',
                message:'Enter the salary'

            },

            {
                    name:'deptName',
                    type:'input',
                    message:'Enter the department name'
                }

        ]).then(function(response){
            connection.query(`insert into role (title,salary,department_id) values(?,?,(select id from department where name =?))`,[response.title, response.salary,response.deptName],
            function(err,result){
                if(err) throw err;
                console.log(result);
            })
        })
    })
    }

    function addDepartment(){
        let deptNames=[];
        
        connection.query('select name from department',function(err,data){
            if(err) throw err;
            for(let i=0;i<data.length;i++){
                deptNames.push(data[i].name);
            }
        
        inquirer.prompt([
            {
                name:'deptName',
                type:'list',
                message:'What department does the employee belong to?',
                choices:deptNames
            }
        ]).then(function(response){
            connection.query('insert into department set ?',
            {
                name: response.deptName
                //role:response.erole
            }
            ,function(err,result){
                if(err) throw err;
                console.log(result);
            })
        })
    })

    }

    function viewDepartment(){
            connection.query('select * from department',function(err,result){
                if(err) throw err;
                console.table(result);
            })

    }

    function viewRole(){
        connection.query('select * from role',function(err,result){
            if(err) throw err;
            console.table(result);
        })


    }

    function viewAllEmployees(){
        connection.query('select e.id,e.first_name,e.last_name,r.title,r.salary,d.name from employee e join role r on e.role_id=r.id join department d on r.department_id=d.id',function(err,result){
            if(err) throw err;
            console.table(result);
        })

    }

    function updateRoles(){
        let updateNames=[];
         connection.query('select first_name from employee',function(err,data){
            if(err) throw err;
            for(let i=0;i<data.length;i++){
                updateNames.push(data[i].first_name);
            }
        

            let roles=[];
            connection.query('select title from role',function(err,data){
            if(err) throw err;
            for(let i=0;i<data.length;i++){
                roles.push(data[i].title);
            }

            inquirer.prompt([
            {
                name:'empUpdate',
                type:'list',
                message:'Which employee do you want to update?',
                choices: updateNames
            },
            
            {
                name:'title',
                type:'list',
                message:'What is the role to update with?',
                choices:roles
            }


        ]).then(function(response){
            connection.query(`update role set title=? where id= (select role_id from employee where first_name=?)`,[response.title, response.empUpdate],
            function(err,result){
                if(err) throw err;
                console.log(result);
            })
        })
    })

    })

    }

    function removeEmployee(){

        let deleteList=[];
         connection.query('select first_name from employee',function(err,data){
            if(err) throw err;
            for(let i=0;i<data.length;i++){
                deleteList.push(data[i].first_name);
            }
        

            inquirer.prompt([
            {
                name:'empDelete',
                type:'list',
                message:'Which employee do you want to remove?',
                choices: deleteList
            }

        ]).then(function(response){
            connection.query(`delete from employee where first_name=?`,[response.empDelete],
            function(err,result){
                if(err) throw err;
                console.table(result);
            })
        })
    })


    }


    function deleteRole(){
        let deleteRo=[];
         connection.query('select title from role',function(err,data){
            if(err) throw err;
            for(let i=0;i<data.length;i++){
                deleteRo.push(data[i].title);
            }

            inquirer.prompt([
            {
                name:'delRole',
                type:'list',
                message:'Which employee role do you want to remove?',
                choices: deleteRo
            }

        ]).then(function(response){
            connection.query(`delete from role where title=?`,[response.delRole],
            function(err,result){
                if(err) throw err;
                console.table(result);
            })
        })
    })


}

function deleteDepartment(){
    let deleteDept=[];
         connection.query('select name from department',function(err,data){
            if(err) throw err;
            for(let i=0;i<data.length;i++){
                deleteDept.push(data[i].name);
            }

            inquirer.prompt([
            {
                name:'dep',
                type:'list',
                message:'Which department do you want to remove?',
                choices: deleteDept
            }

        ]).then(function(response){
            connection.query(`delete from department where name=?`,[response.delRole],
            function(err,result){
                if(err) throw err;
                console.table(result);
            })
        })
    })



}

//connection.end();

}

start();