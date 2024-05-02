import React from 'react'
import { useRef, useState, useEffect } from 'react'
import {faCheck, faTimes, faInfoCircle } from '@fortawesome/free-solid-svg-icons'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'


const USER_REGEX = /^[a-zA-Z][ a-zA-Z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;


const Form = () => {
    const userRef = useRef(); 
    const errRef = useRef();

    const [user, setUser] = useState('');
    const [validName, setValidName] = useState(false);
    const [userFocus, setUserFocus] = useState(false);

    const [pwd, setPwd] = useState('');
    const [validPwd, setValidPwd] = useState(false);
    const [pwdFocus, setPwdFocus] = useState(false); 

    const[matchPwd, setMatchPwd] = useState('');
    const[validMatch, setValidMatch] = useState(false);
    const[matchFocus, setMatchFocus] = useState(false);

    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false); 

    useEffect(()=>{
        userRef.current.focus();
    }, [])

    useEffect(()=>{
        const result = USER_REGEX.test(user);
        console.log(result);
        console.log(user);
        setValidName(result);
    }, [user])

    useEffect(()=>{
      const result = PWD_REGEX.test(pwd);
      console.log(result)
      console.log(pwd)
      setValidPwd(result)
      const match = pwd === matchPwd;
      setValidMatch(match)
    }, [pwd, matchPwd])

    useEffect(()=>{
      setErrMsg('');
    },[user, pwd, matchPwd])


    useEffect (()=>{
      
    },[])


 
  return ( 
    <>
    {success ? (
      <section>
        <h1>success!</h1>
        <p>
          <a href='/app.js'> Sign In</a>
        </p>
      </section>
    ) : (
    <section>
      <p ref={errRef} className={errMsg ? 'errmsg' : 'offscreen'} aria-live='assertive'>
        {errMsg}
      </p>
      <h1 className='register'>Register</h1>
      <form >
        <label htmlFor="username">
          Username:
          <span className={validName ? 'valid' : 'hide'}>
            <FontAwesomeIcon icon = {faCheck} />
          </span>
          <span className= {validName || !user ? 'hide' : 'invalid'}>
            <FontAwesomeIcon icon = {faTimes} />
          </span>
        </label>
        <input 
          type="text" 
          placeholder='e.g: chris math'
          id='username'
          ref={userRef}
          autoComplete='off'
          onChange={(e)=>setUser(e.target.value)}
          required
          aria-invalid ={validName ? 'false' : 'true'}
          aria-describedby='useridnote'
          onFocus={()=>setUserFocus(true)}
          onBlur={()=> setUserFocus(false)}
        />
        <p id='useridnote' className={userFocus && user && !validName ? 'instruction' : 'offscreen' }>
          <FontAwesomeIcon style={{marginRight:'10px'}} icon = {faInfoCircle} />
          4-24 characters. 
          Must start with a letter. <br />
           space, Letters, num, underscore hyphens are allowed
        </p>

          <br />

        <label htmlFor="password">Password:</label>
        <span className={validPwd ? 'valid' : 'hide'}>
          <FontAwesomeIcon icon={faCheck} />
        </span>
        <span className={validPwd || !pwd ? 'hide' : 'invalid'}>
          <FontAwesomeIcon icon={faTimes} />
        </span>
        <input 
        style={{marginBottom:'10px', marginLeft:'7px', }}
          type="password"
          id='password'
          onChange={(e)=>setPwd(e.target.value)}
          aria-invalid ={validPwd ? "false" : "true"}
          aria-describedby='passnote'
          required
          onFocus={()=>setPwdFocus(true)}
          onBlur={()=>setPwdFocus(false)}
        />
        <p id='passnote' className={pwdFocus && !validPwd ? 'instructions' : 'offscreen'}>
          <FontAwesomeIcon style={{marginRight:'10px'}} icon={faInfoCircle} />
            8-24 characters. <br />
            Must include Uppercase and lowercase letters, a number and a special character. <br />
            Allowed special character: 
          <span aria-label='exclamation mark'>!</span>
          <span aria-label='at symbol'>@</span>
          <span aria-label='hashtag'>#</span>
          <span aria-label='dollar sign'>$</span>
          <span aria-label='percent'>%</span>
        </p>

          <br />

        <label htmlFor="confirm_pwd">Confirm <br /> Password:
          <span className={validMatch && matchPwd ? 'valid' : 'hide'}>
            <FontAwesomeIcon icon={faCheck} />
          </span>
          <span className={validMatch || !matchPwd ? 'hide' : 'invalid'}>
            <FontAwesomeIcon icon={faTimes} />
          </span>
        </label>
        <input 
          type="password"
          id='confirm_pwd'
          onChange={(e)=>setMatchPwd(e.target.value)}
          required
          aria-invalid = {validMatch ? 'false' : 'true'}
          aria-describedby='confirmpassnote'
          onFocus={()=>setMatchFocus(true)}
          onBlur={()=>setMatchFocus(false)} 
        />
        <p id='confirmpassnote' className={matchFocus && !validMatch ? 'instructions' : 'offscreen'}>
          <FontAwesomeIcon style={{marginRight:'10px'}} icon={faInfoCircle} />
          Must match the Password above
        </p>

          <br />

        <button disabled={!validName || !validPwd ||!validMatch ? true : false}>
          Sign Up
        </button>
      </form>
      
      
      <p>
        <br/>
          Already registered? 
        <br />
        <span className='line'>
          {/* put router link here */}
          <a style={{color:'white', textDecoration:'none'} } href="./app">Sign In</a>
        </span>
      </p>
    </section>
    )} 
    </>
  )
}
 
export default Form