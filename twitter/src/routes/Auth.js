import { authService, firebaseInstance } from 'firebasekeys';
import React, {useState} from 'react'

function Auth() {
        // state 값 선언 
        const [email, setEmail] = useState("");
        const [password, setPassword ] = useState("");
        const [newAccount, setNewAccount] = useState(true);
        const [error, setError] = useState("");

        // onChange 함수 정의 
        const onChange = (event) => {
            // event 가 일어나고 있는 target의 name 과 value 를 가져온다. 
            const {target: {name, value}} = event;
            // console.log(event.target)
            // 만약 name = email 이면 state 값에 value 값을 저장한다. 
            if(name === "email"){
                setEmail(value);

            // 만약 name = password 이면 state 값에 value 값을 저장한다. 
            } else if (name === "password") {
                setPassword(value);
            }
        };

        // onSubmit 함수 정의 
        const onSubmit = async(event) => {
            event.preventDefault();
            try{
                let data;
                if (newAccount) {
                    // create new account
                    data = await authService.createUserWithEmailAndPassword(
                        email, password
                    )
                } else {
                    // login
                    data = await authService.signInWithEmailAndPassword(
                        email, password
                    )
                }
                console.log(data)
            } catch(error){
                setError(error.message)
            }
        };
        const toggleAccount = () => setNewAccount((prev) => !prev);
        const onSocialClick = async (event) => {
            const {
                target:{ name },
        } = event;
        let provider
        if (name === "google") {
            provider = new firebaseInstance.auth.GoogleAuthProvider();
        } else if (name === "github") {
            provider = new firebaseInstance.auth.GithubAuthProvider();
        }
        const data = await authService.signInWithPopup(provider);
        console.log(data);
        };
        return (
        <div>
            <form onSubmit={onSubmit}>
                {/* onChange 속성 ? input 안에 값이 들어오면 실행되게 함. 여기서는 onChange 함수가 실행되게 했음.  */}
                <input name="email" type="email" placeholder="Email" required value={email} onChange={onChange}/>
                <input name="password" type="password" placeholder="Password" required value={password} onChange={onChange}/>
                {/* state 가 newAccount 면 CreateAccount 출력 아니면 LogIn 출력   */}
                <input type="submit" value={newAccount ? "CreateAccount" : "LogIn" }/>
                {error}
            </form>
            <span onClick={toggleAccount}>{newAccount ? "Sign in": "Create Account"}</span>
            <div>
                <button onClick = {onSocialClick} name="google">Google LogIn</button>
                <button onClick = {onSocialClick} name="github">Github LogIn</button>
            </div>
        </div>
    )
}

export default Auth
