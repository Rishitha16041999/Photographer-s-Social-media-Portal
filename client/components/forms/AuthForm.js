import { SyncOutlined } from '@ant-design/icons';
import useState from 'react';





const AuthForm = ({




    handleSubmit,
    fname, setFName, lname, setLName, email, setEmail, password, setPassword, gender,
    setGender, number, setNumber, citystate, setCitystate, country, setCountry, interest,
    setInterest, freelance, setFreelance, about, setAbout, loading
}

) =>{
    const [gender, setGender] = useState('');
    const [freelance, setFreelance] = useState('');
    const handleChange = (e) => {
        setGender(e.target.value);
    }
    const handleChangeFreelancing = (e) => {
        setFreelance(e.target.value);
    }

    

 }

export default AuthForm;