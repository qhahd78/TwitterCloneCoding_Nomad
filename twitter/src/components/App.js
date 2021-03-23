import React, { useState } from 'react';
import AppRouter from 'components/Router';
import { authService } from '../firebasekeys';

function App() {
  const [init, setInit] = useState(false);
  // state 에 현재 유저 정보를 저장. 현재 로그인/로그아웃 상태를 알 수 있다. 
  const [isLoggedIn, setIsLoggedIn] = useState(authService.currentUser);
  // Router 에 props 형태로 state를 전달
  // useEffect(() => {
    console.log(authService.currentUser)
    setInterval(() => {
    console.log(authService.currentUser)
  }, 2000);

  // }, [])
  
  return (
    <>
      <AppRouter isLoggedIn={isLoggedIn} />
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