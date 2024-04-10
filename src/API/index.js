const APIURL = process.env.APIURL || 'http://localhost:3000/api'


// get all inventory
export async function getAllInventory() {
    try {
        const response = await fetch(APIURL + "/inventory")
        const result = await response.json()
        console.log(result)
        return result

    } catch (error) {
        console.error(error)
    }
}

export async function registerNewUser(customer, address) {
    try {
        const response = await fetch(APIURL + '/customers/register', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: customer.userName,
                password: customer.password,
                email: customer.email,
                firstname: customer.firstName,
                lastname: customer.lastName,
                phone_number: customer.phone_number,
                role: customer.role,
                address: {
                    street_number: address.streetNumber,
                    street: address.street,
                    city: address.city,
                    state: address.state,
                    zip: address.zip,
                }
            })
        })

        const result = await response.json()
        return result
    } catch (error) {
        console.error(error);

    }
}

export async function loginCustomer(loginObj) {
    try {
        const response = await fetch(APIURL + '/customers/login', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: loginObj.username,
                password: loginObj.password
            })
        })

        const result = await response.json()
        return result
    } catch (error) {
        console.error(error);

    }
}