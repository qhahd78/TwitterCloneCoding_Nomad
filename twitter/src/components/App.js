import React, { useState, useEffect } from 'react';
import AppRouter from 'components/Router';
import { authService } from '../firebasekeys';

function App() {
  // 3개의 state 를 저장한다. 

  const [init, setInit] = useState(false);
  // state 에 현재 유저 정보를 저장. 현재 로그인/로그아웃 상태를 알 수 있다. 
  // const [isLoggedIn, setIsLoggedIn] = useState(authService.currentUser);
  // Router 에 props 형태로 state를 전달
  // userObj 는 다른 곳에서 쓸 수 있으니 최상위 컴포넌트에서 정의해준다. 
  const [userObj, setUserObj] = useState(null);

  // 로그인 시 호출
  useEffect(() => {
    // 로그아웃시, 어플리케이션이 초기화 될 시.
    authService.onAuthStateChanged((user) => {
      if(user){
        // 로그인 한 user 받으면 로그인 o
        // setIsLoggedIn(true);
        // user 를 받으면 setUserObj 또한 실행 
        setUserObj(user);
      } //else {
        // user를 받지 못하면 로그인 x 
        //setIsLoggedIn(false);
      //}
      // init 을 true 로 설정하여 어플리케이션이 
      // 언제 시작해도 onAuthSTateChanged 가 실행되게 한다. 
      setInit(true);
    });
  }, []);
  
  return (
    <>
    {/* 초기화 중에는 Initializing 출력 하다가 로그인 되면 home 보이기 */}
      {init ? <AppRouter isLoggedIn={Boolean(userObj)} userObj={userObj} /> : "Initializing...."}
      <footer>&copy; TwitterApp {new Date().getFullYear()}</footer>
    </>
    );
}

export default App;

// state - 컴포넌트 내에서 수정 가능. 
// props - 부모에서 자식으로 한방향으로 전달 가능. 
// 따라서 state를 부모 컴포넌트에서 정해주고, props 형태로 자식 컴포넌트로 전해준다. 
// 이렇게 하면 한 방향으로 밖에 못 전달하기 때문에 redux를 사용하는 것. 
// redux는 다음에 다시 공부를 합시다. 