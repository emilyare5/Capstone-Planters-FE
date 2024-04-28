import { Link} from 'react-router-dom'

export default function Navigations({ name, token, role, setUser }) {

    function logOut() {

        localStorage.removeItem("username");
        localStorage.removeItem("role");
        localStorage.removeItem("token");

        setUser({
            name: null,
            token: null,
            role: null
        });

    };

    function handleClick(event) {

        event.preventDefault();
        window.location.reload();

    };

    return (
        <div id="navBar">

            <div>
                {
                    name &&
                    <div id="userName">
                        <p>Logged in as: {name}</p>
                    </div>
                }

                <div id="links">
                    {
                        token ? <button onClick={logOut}>Log Out</button>
                            : <button><Link to="/login">Login</Link></button>
                    }

                    {
                        token ? null
                            : <button><Link to="/register">Register New User</Link></button>
                    }

                    <button onClick={handleClick}><Link to="/">Home (All Posts)</Link></button>

                </div>

            </div>

        </div>
    );
};