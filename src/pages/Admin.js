import { useNavigate } from "react-router-dom";

function Admin(props){

    const {properties, setProperties} = useState([]);

    const navigator = useNavigate();

    const changeHandler = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        const tempUser = { ...props.user };
        tempUser[name] = value;
        props.setUser(tempUser);
    };

    const addPropertiesSubmitHander = () => {
        navigator('/AddProperty');
    }

    const findPropertiesSubmitHandler = () => {
        axios.get("http://localhost:8080/user/${props.user.id}/properties")
    .then((response) => {
        setProperties(response.data)
    })
    .catch((e) => {
        console.log(e)
    })

}, [])
    }
 }