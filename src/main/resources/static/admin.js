document.getElementById("newUser").addEventListener("submit", addNewUser);
document.getElementById("deleteUserModal").addEventListener("submit", deletePost)
document.getElementById("updateUserModal").addEventListener("submit", editPost)


function addNewUser(e) {
    e.preventDefault();

    let name = document.getElementById("name").value;
    let lastName = document.getElementById("lastName").value;
    let password = document.getElementById("password").value;
    let roles = setRoles(Array.from(document.getElementById("roles").selectedOptions).map(option => option.value));

    fetch("addUser", {
        method: 'POST',
        headers: {
            "Accept": "application/json, text/plain, */*",
            "Content-type": "application/json"
        },
        body: JSON.stringify({
            id: null,
            name: name,
            lastName: lastName,
            password: password,
            roles: roles
        })
    })
        .finally(() => {
            inputUserAfterAdd(name);
            document.getElementById("allUsersTable").click();
            document.getElementById("addUser").reset();
        })

}

function inputRolesIntoAdd() {
    fetch("allRoles").then((res) => res.json())
        .then((data) => {
            let output = "";
            data.forEach(function (role) {
                output += `<option id="${role.role}">${role.role}</option>`;
            });
            document.getElementById("roles").innerHTML = output;
        })
}

inputRolesIntoAdd()



function deletePost(e) {
    e.preventDefault();

    let id = document.getElementById("idDelete").value;
    let name = document.getElementById("nameDelete").value;
    let lastName = document.getElementById("lastNameDelete").value;
    let password = document.getElementById("passwordDelete").value;
    let roles = setRoles(Array.from(document.getElementById("roleDelete").selectedOptions)
        .map(option => option.value));

    fetch("deleteUser", {
        method: "DELETE",
        headers: {
            "Accept": "application/json, text/plain, */*",
            "Content-type": "application/json"
        },
        body: JSON.stringify({
            id: id,
            name: name,
            lastName: lastName,
            password: password

        })
    })
        .finally(() => {
            document.getElementById(id).remove()
            $('#deleteUser').modal("hide")
            getHeader()
        });

    function setRoles(someRoles) {
        let roles = [];
        if (someRoles.indexOf("ROLE_USER") >= 0) {
            roles.push({"role": "ROLE_USER"});
        }
        if (someRoles.indexOf("ROLE_ADMIN") >= 0) {
            roles.push({"role": "ROLE_ADMIN"});
        }
        return roles;
    }
}

function inputRolesIntoDelete() {
    fetch("allRoles").then((res) => res.json())
        .then((data) => {
            let output = "";
            data.forEach(function (role) {
                output += `<option id="delete${role.role}">${role.role}</option>`;
            });
            document.getElementById("roleDelete").innerHTML = output;
        })
}

inputRolesIntoDelete()

function modalWindowDelete(id) {
    document.getElementById("idDelete").value = id;
    document.getElementById("nameDelete").value = $("#name" + id).text();
    document.getElementById("lastNameDelete").value = $("#lastName" + id).text();
    document.getElementById("passwordDelete").value = $("#password" + id).text();
}


function editPost(e) {
    e.preventDefault();

    let id = document.getElementById("idEdit").value;
    let name = document.getElementById("nameEdit").value;
    let lastName = document.getElementById("lastNameEdit").value;
    let password = document.getElementById("passwordEdit").value;
    let roles = setRoles(Array.from(document.getElementById("roleEdit").selectedOptions).map(option => option.value));

    fetch("editUser", {
        method: "PUT",
        headers: {
            "Accept": "application/json, text/plain, */*",
            "Content-type": "application/json"
        },
        body: JSON.stringify({
            id: id,
            name: name,
            lastName: lastName,
            password: password,
            roles: roles
        })
    }).finally(() => {
        inputUserAfterEdit(name);
        $('#editUser').modal("hide");
        getUser();
    })

}

function inputRolesIntoEdit() {
    fetch("/allRoles").then((res) => res.json())
        .then((data) => {
            let output = "";
            data.forEach(function (role) {
                output += `<option id="edit${role.role}">${role.role}</option>`;
            });
            document.getElementById("roleEdit").innerHTML = output;
        })
}

inputRolesIntoEdit()

function modalWindowEdit(id) {
    document.getElementById("idEdit").value = id;
    document.getElementById("nameEdit").value = $("#name" + id).text();
    document.getElementById("lastNameEdit").value = $("#lastName" + id).text();
    document.getElementById("passwordEdit").value = "";
}

function getUsers() {
    fetch("allUsers")
        .then((res) => res.json())
        .then((data) => {
            let output = "";
            data.forEach(function (user) {

                let userRoles = "";
                for (let i = 0; i < user.rolesSet.length; i++) {
                    userRoles += `${user.rolesSet[i].role} `
                }

                output += `
                <tr id="${user.id}">
                <td class="p-2" id="id${user.id}">${user.id}</td>
                <td class="p-2" id="name${user.id}">${user.name}</td> 
                <td class="p-2" id="lastName${user.id}">${user.lastName}</td> 
                <td class="p-2" id="password${user.id}">${user.password}</td> 
                <td class="p-2" id="roles${user.id}">${userRoles}</td>
               
                               <!--Кнопки EDIT DELETE-->
                <td class="p-2" style="width: 9%">
                <a class="btn btn-primary text-white"
                data-toggle="modal" data-target="#editUser" id="callModalEdit"
                onclick="modalWindowEdit(${user.id})">Edit</a>
                </td>
                
                <td class="p-2" style="width: 9%">
                <a class="btn btn-danger text-white" role="button"
                data-toggle="modal" data-target="#deleteUser" id="delete-post"
                onclick="modalWindowDelete(${user.id})">Delete</a>
                </td>
              </tr>
          `;
            });
            document.getElementById("allUsers").innerHTML = output;
        })
}

getUser()
getUsers()


function setRoles(someRoles) {
    let roles = [];
    if (someRoles.indexOf("ROLE_ADMIN") >= 0) {
        roles.push({"id": 1});
    }
    if (someRoles.indexOf("ROLE_USER") >= 0) {
        roles.push({"id": 2});
    }
    return roles;
}

function inputUserAfterAdd(name) {
    fetch(url + "/" + name).then((res) => res.json())
        .then((user) => {
            let userRoles = "";
            for (let i = 0; i < user.rolesSet.length; i++) {
                userRoles += `${user.rolesSet[i].role} `
            }

            let output = `<tr id="${user.id}">`;
            output +=
                `<td class="p-2" id="id${user.id}">${user.id}</td>
                    <td class="p-2" id="name${user.id}">${user.name}</td> 
                    <td class="p-2" id="lastName${user.id}">${user.lastName}</td> 
                    <td class="p-2" id="password${user.id}">${user.password}</td> 
                    <td class="p-2" id="roles${user.id}">${userRoles}</td>
                    <td class="p-2" style="width: 9%">
                            <a class="btn btn-primary text-white"
                        data-toggle="modal" data-target="#editUser" id="callModalEdit"
                        onclick="modalWindowEdit(${user.id})">Edit
                        </a>
                    </td>
                    <td class="p-2" style="width: 9%">
                        <a class="btn btn-danger text-white" role="button"
                        data-toggle="modal" data-target="#deleteUser" id="delete-post"
                        onclick="modalWindowDelete(${user.id})">Delete
                        </a>
                    </td>
                </tr>`
            ;
            $('#allUsers').append(output);
        })
}

function inputUserAfterEdit(name) {
    fetch(url + "/" + name).then((res) => res.json())
        .then((user) => {
            let userRoles = "";
            for (let i = 0; i < user.rolesSet.length; i++) {
                userRoles += `${user.rolesSet[i].role} `
            }

            let output = ``;
            output +=
                `<td class="p-2" id="id${user.id}">${user.id}</td>
                <td class="p-2" id="name${user.id}">${user.name}</td>
                <td class="p-2" id="lastName${user.id}">${user.lastName}</td> 
                <td class="p-2" id="password${user.id}">${user.password}</td> 
                <td class="p-2" id="roles${user.id}">${userRoles}</td>
                <td class="p-2" style="width: 9%">
                        <a class="btn btn-primary text-white"
                    data-toggle="modal" data-target="#editUser" id="callModalEdit"
                    onclick="modalWindowEdit(${user.id})">Edit
                    </a>
                </td>
                <td class="p-2" style="width: 9%">
                    <a class="btn btn-danger text-white" role="button"
                    data-toggle="modal" data-target="#deleteUser" id="delete-post"
                    onclick="modalWindowDelete(${user.id})">Delete
                    </a>
                </td>`
            ;
            document.getElementById(user.id).innerHTML = output;
        })
}