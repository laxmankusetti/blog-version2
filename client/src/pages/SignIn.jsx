import { Alert, Button, Label, Spinner, TextInput } from "flowbite-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signInStart, signInSuccess, signInFailure } from "../redux/user/user.slice";
import { useDispatch, useSelector } from "react-redux";
import OAuth from "../components/OAuth";

const SignIn = () => {
  const [formData, setFormData] = useState({});

  const navigate = useNavigate();

  const dispatch = useDispatch();
  const { loading, error } = useSelector(state => state.user);

  const handleChange = (e) => {
    setFormData({...formData, [e.target.id] : e.target.value.trim()})
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(signInStart())
    try {
      if(!formData.email || !formData.password){
        return dispatch(signInFailure('Please provide all the required fileds'))
      }
      const res = await fetch('/api/auth/signin', {
        method : 'POST',
        headers : {
          'Content-Type' : 'application/json'
        },
        body : JSON.stringify(formData)
      });
  
      const data = await res.json();
      if(data.success === false){
        return dispatch(signInFailure(data.message))
      }
      if(res.ok){
        navigate('/')
        dispatch(signInSuccess(data))
      }
    } catch (error) {
      dispatch(signInFailure(error))
    }
  }
  return (
    <div className="min-h-screen mt-20">
      <h1 className="text-2xl sm:text-3xl text-center text-green-500 my-2 font-bold sm:my-5">Sign In</h1>
      <div className="flex p-5 max-w-4xl mx-auto flex-col md:flex-row md:items-center gap-5">
        <div className="flex-1 flex flex-col items-center gap-3 sm:block justify-center">
          <Link
            to={"/"}
            className="text-4xl font-semibold dark:text-white bg-gradient-to-r from-green-500 to-blue-500 text-white p-3 rounded-lg"
          >
            l.a.x.m.a.n
          </Link>
          <p className="text-sm mt-5 sm:mt-10 font-normal">
          If you are already signed up then sign in and unlock more features.
          Or click on the Google icon shown below and directly sign in with the Google account.
          </p>
        </div>
        <div className="flex-1">
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <div>
              <Label value="Your email"/>
              <TextInput type="email" placeholder="Email" id="email" onChange={handleChange} />
            </div>
            <div>
              <Label value="Your password"/>
              <TextInput type="password" placeholder="Password" id="password" onChange={handleChange} />
            </div>
            <Button type="submit" gradientDuoTone={'greenToBlue'}>
              {loading ? <><Spinner size={20}/> <span className="pl-3">Loading...</span></> : 'Sign In'}
            </Button>
            <OAuth />
          </form>
          <div className="flex gap-2 items-center mt-5">
            <span>Don&apos;t have an account ?</span>
            <Link to={'/signup'} className="text-green-500 font-semibold">Sign Up</Link>
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

export default SignIn;
