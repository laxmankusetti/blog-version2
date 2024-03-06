import { Alert, Button, Label, Spinner, TextInput } from "flowbite-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import OAuth from "../components/OAuth";

const SignUp = () => {
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({...formData, [e.target.id] : e.target.value.trim()})
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true)
    setError(null)
    try {
      if(!formData.username || !formData.email || !formData.password){
        return setError('Please provide all the details')
      }
      const res = await fetch('/api/auth/signup', {
        method : 'POST',
        headers : {
          'Content-Type' : 'application/json'
        },
        body : JSON.stringify(formData)
      });
  
      const data = await res.json();
      if(data.success === false){
        return setError(data.error)
      }
      if(res.ok){
        navigate('/signin')
      }
    } catch (error) {
      setError(error.message)  
    }finally{
      setLoading(false)
    }
  }
  return (
    <div className="min-h-screen mt-20">
      <h1 className="text-2xl sm:text-3xl text-center text-green-500 my-2 font-bold sm:my-5">Sign Up</h1>
      <div className="flex p-5 max-w-4xl mx-auto flex-col md:flex-row md:items-center gap-5">
        <div className="flex-1 flex flex-col items-center gap-3 sm:block justify-center">
          <Link
            to={"/"}
            className="text-4xl font-semibold dark:text-white bg-gradient-to-r from-green-500 to-blue-500 text-white p-3 rounded-lg"
          >
            l.a.x.m.a.n
          </Link>
          <p className="text-sm mt-5 sm:mt-10 font-normal">
            If you sign up, you will be able to unlock more features on this
            blog. You can sign up with your Email address and password. If 
            you like you can also sign up using your Google account also.
          </p>
        </div>
        <div className="flex-1">
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <div>
              <Label value="Your username"/>
              <TextInput type="text" placeholder="Username" id="username" onChange={handleChange} />
            </div>
            <div>
              <Label value="Your email"/>
              <TextInput type="email" placeholder="Email" id="email" onChange={handleChange} />
            </div>
            <div>
              <Label value="Your password"/>
              <TextInput type="password" placeholder="Password" id="password" onChange={handleChange} />
            </div>
            <Button type="submit" gradientDuoTone={'greenToBlue'}>
              {loading ? <><Spinner size={20}/> <span className="pl-3">Loading...</span></> : 'Sign Up'}
            </Button>
            <OAuth />
          </form>
          <div className="flex gap-2 items-center mt-5">
            <span>Have an account ?</span>
            <Link to={'/signin'} className="text-green-500 font-semibold">Sign In</Link>
          </div>
          {error && (<Alert color='failure'>
              {error}
            </Alert>)
          }
        </div>
      </div>
    </div>
  );
};

export default SignUp;
