import React, {useState, useEffect} from 'react'
import { dbService } from "firebasekeys";
import Nweet from 'components/Nweet';


// Home 의 props 로부터 useruid 를 가져온다. (Router로부터 전달받음. )
function Home({ userObj }) {
    // console.log(userObj.email);
    const [nweet, setNweet] = useState("");
    
    const [nweets, setNweets] = useState([]);
    // 컴포넌트가 mount 될 때, getNweets 실행 
    // const getNweets = async() => {
    //     // dbService 가 nweets를 get 을 이용해 다 가져온다. 
    //     const dbnweets = await dbService.collection("nweets").get();
    //     // 각각의 document.data()를 가져오기
    //     dbnweets.forEach((document)=> {
    //         const nweetObject = {
    //             ...document.data(),
    //             id: document.id,
    //         };
    //         setNweets((prev) => [nweetObject, ...prev]);
    //     });
    // };

    useEffect(() => {
        // getNweets();
        // snapshot : DB 에 무언가 일이 일어날 때마다 알림. 
         
        dbService.collection("nweets").onSnapshot((snapshot) => {
            // 새로운 스냅샷을 받을 때마다 배열을 만든다.
            const nweetArray = snapshot.docs.map(doc => ({
                id:doc.id,
                ...doc.data(),
            }));
            // state 에 배열을 넣는다. 
            setNweets(nweetArray);
        })
    }, []);

    const onSubmit = async (event) => {
        event.preventDefault();
        await dbService.collection("nweets").add({
            // nweet 는 state 인 nweet 의 value 값 
            text : nweet,
            createAt: Date.now(),
            // 작성자 가져오기
            creatorId: userObj.uid,

        });
        setNweet("");
    };

    const onChange = (event) => {
        const {
            target: {value},
        } = event;
        setNweet(value);
    };

    const onFileChange = (event) => {
        // event 안의 target 안에서 파일을 받는다. 
        const {
            target: {files},
        } = event;
        // 파일은 하나니까 files 리스트에서 제일 첫 번째 거
        const theFile = files[0];
        // reader 생성
        const reader = new FileReader();
        reader.onloadend = (finishedEvent) => {
            console.log(finishedEvent);
        };
        // readAsDataURL 을 이용해 파일을 읽는다. 읽는 게 끝나면
        // finishedEvent 를 받는다. 
        reader.readAsDataURL(theFile);
    };
    return (
        <div>
            <form onSubmit={onSubmit}>
                <input value = {nweet} onChange ={onChange} type="text" placeholder="What's on your mind?" maxLength={120} />
                {/* accept 설정 해놓으면 image 만 첨부할 수 있게 됨  */}
                <input type="file" accept="image/*" onChange={onFileChange} />
                <input type="submit" value="Nweet" />
            </form>
            <div>
                {/* map 을 통해 nweet 을 하나씩 풀어주어 Nweet Component 를 만든다 */}
                {nweets.map((nweet) => (
                    // Nweet에 props 형태로 전달해준다. 
                   <Nweet 
                    key={nweet.id} 
                    /* Nweet component 는 2개의 props. nweetObj 와 isOwner */
                    /* nweet 의 모든 데이터 */
                    nweetObj={nweet} 
                    /* nweet 을 만든사람과 userObj.uid 가 같다면 true, 아니면 false */
                    isOwner={nweet.creatorId === userObj.uid} 
                    />
                ))}
            </div>
        </div>
    )
}

export default Home
