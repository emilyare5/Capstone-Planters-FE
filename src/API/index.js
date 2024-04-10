const APIURL = process.env.APIURL||'http://localhost:3000/api'


// get all inventory
export async function getAllInventory(){
    try {
        const response = await fetch(APIURL+"/inventory")
        const result = await response.json()
        console.log(result)
        return result
        
    } catch (error) {
        console.error(error)
    }
}