import React, {useState, useEffect} from 'react'
import { dbService } from "firebasekeys";
import Nweet from 'components/Nweet';

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
        dbService.collection("nweets").onSnapshot((snapshot) => {
            const nweetArray = snapshot.docs.map(doc => ({
                id:doc.id,
                ...doc.data(),
            }));
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

    // console.log(nweets);
    return (
        <div>
            <form onSubmit={onSubmit}>
                <input value = {nweet} onChange ={onChange} type="text" placeholder="What's on your mind?" maxLength={120} />
                <input type="submit" value="Nweet" />
            </form>
            <div>
                {nweets.map((nweet) => (
                    // Nweet에 props 형태로 전달해준다. 
                   <Nweet 
                    key={nweet.id} 
                    nweetObj={nweet} 
                    isOwner={nweet.creatorId === userObj.uid} 
                    />
                ))}
            </div>
        </div>
    )
}

export default Home
