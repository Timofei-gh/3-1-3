document.getElementById("newUser").addEventListener("submit", addNewUser);

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

