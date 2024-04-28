const APIURL = process.env.APIURL || 'http://localhost:3000/api'

// Get all inventory
export async function getAllInventory() {
    try {
        const response = await fetch(APIURL + "/inventory", {
            credentials: 'include'
        });

        const result = await response.json();
        return result;

    } catch (error) {
        console.error(error);
    }
}

// Get all inventory type
export async function getAllInvTypes() {
    try {
        const response = await fetch(APIURL + "/inventory/types", {
            credentials: 'include'
        });

        const result = await response.json();
        return result;

    } catch (error) {
        console.error(error);
    }
}

// Get single inventory item
export async function getSingleInventory(itemID) {
    try {
        const response = await fetch(APIURL + "/inventory/" + itemID);
        const result = await response.json();
        return result;

    } catch (error) {
        console.error(error);
    }
}


// Update the amount of item in user cart 
export async function updateCartItem(itemID, quantity) {
    try {
        const response = await fetch(APIURL + "/carts/mycart/update",
            {
                credentials: 'include',
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    inventory_id: itemID,
                    quantity: quantity,
                })

            });

        const result = await response.json();
        return result;

    } catch (error) {
        console.error(error);
    }
}

// Add inventory item
export async function addInventoryItem(invObj) {
    try {
        const response = await fetch(APIURL + '/inventory', {
            method: "POST",
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(invObj)
        });

        const result = await response.json();
        return result;

    } catch (error) {
        console.error(error);

    }
}

// Update inventory item
export async function updateInventoryItem(invObj, invId) {
    try {
        const response = await fetch(APIURL + '/inventory/' + invId, {
            method: "PUT",
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(invObj)
        });

        const result = await response.json();
        return result;

    } catch (error) {
        console.error(error);

    }
}

// Get all customers
export async function getAllCustomers() {
    try {
        const response = await fetch(APIURL + "/customers", {
            credentials: 'include'
        });

        const result = await response.json();
        return result;

    } catch (error) {
        console.error(error);
    }
}

// Get customer by id
export async function getCustomerById(custId) {
    try {
        const response = await fetch(APIURL + "/customers/" + custId, {
            headers: {
                credentials: 'include'
            }
        });

        const result = await response.json();
        return result;

    } catch (error) {
        console.error(error);
    }
}

// Get cart by customer id
export async function getCartByCustId(custId) {
    try {
        const response = await fetch(APIURL + "/carts/customer/" + custId, {
            credentials: 'include',
        });

        const result = await response.json();
        return result;

    } catch (error) {
        console.error(error);
    }
}

// Register new user
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
        });

        const result = await response.json();
        return result;

    } catch (error) {
        console.error(error);

    }
}

// Update Customer
export async function updateCustomer(customer, custId) {
    try {
        const response = await fetch(APIURL + '/customers/' + custId, {
            method: "PATCH",
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(customer)
        });

        const result = await response.json();
        return result;

    } catch (error) {
        console.error(error);

    }
}

// Update address
export async function updateAddress(address, custId) {
    try {
        const response = await fetch(APIURL + '/customers/' + custId + '/address', {
            method: "PATCH",
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                street_number: address.street_number,
                street: address.street,
                city: address.city,
                state: address.state,
                zip: address.zip,
            })
        });

        const result = await response.json();
        return result;

    } catch (error) {
        console.error(error);

    }
}

// Login
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
            }),
            credentials: 'include'
        });

        const result = await response.json();
        return result;

    } catch (error) {
        console.error(error);

    }
}

// logout
export async function logoutCustomer() {
    try {
        const response = await fetch(APIURL + '/customers/logout', {
            method: "POST",
            credentials: 'include'
        });
       
        const result = await response.json();
        return result;

    } catch (error) {
        console.error(error);

    }
}

// Get user access
export async function getUserAccess() {
    try {
        const response = await fetch(APIURL + "/auth", {
            credentials: 'include'
        });

        const result = await response.json();
        return result;

    } catch (error) {
        console.error(error);
    }
}

// Checkout cart
export const CheckoutCart = async () => {
    try {
        const response = await fetch(APIURL + "/carts/mycart/checkout", {
            method: "PATCH",
            credentials: 'include',
        });

        const result = await response.json();
         
    } catch (err) {
        console.error(err);
    }
}

// Get cart products
export async function getCartItems() {
    try {
        const response = await fetch(APIURL + "/carts/mycart/", {
            credentials: 'include',
        });

        const result = await response.json();
        return result;
        
    } catch (err) {
        console.error(err);
    }
}

// Delete inventory by id
export async function destroyInventory(id) {
    try {
        const response = await fetch(APIURL + '/inventory/' + id, {
            method: "DELETE",
            credentials: 'include'
        });

        const result = await response.json();
        return result;

    } catch (error) {
        console.error(error);

    }
}