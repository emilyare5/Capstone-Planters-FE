import { Link} from 'react-router-dom'
import Cookies from 'universal-cookie';

export default function AdminNav() {

    const cookies = new Cookies();

    return (

        <div id="navBar">

            <div>
                <button><Link to="./inventory">All Inventory</Link></button>
                <button><Link to="./customers">Customers</Link></button>
            </div>

        </div>
    );
};