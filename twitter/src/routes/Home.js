import React, {useState, useEffect} from 'react'
import { dbService } from "firebasekeys";

function Home() {
    const [nweet, setNweet] = useState("");
    const [nweets, setNweets] = useState([]);
    // 컴포넌트가 mount 될 때, getNweets 실행 
    const getNweets = async() => {
        // dbService 가 nweets를 get 을 이용해 다 가져온다. 
        const dbnweets = await dbService.collection("nweets").get();
        // 각각의 document.data()를 가져오기
        dbnweets.forEach((document)=> {
            const nweetObject = {
                ...document.data(),
                id: document.id,
            };
            setNweets((prev) => [nweetObject, ...prev]);
        });
    };
    useEffect(() => {
        getNweets();
    }, []);
    const onSubmit = async (event) => {
        event.preventDefault();
        await dbService.collection("nweets").add({
            nweet,
            createAt: Date.now(),
        });
        setNweet("");
    };
    const onChange = (event) => {
        const {
            target: {value},
        } = event;
        setNweet(value);
    };
    console.log(nweets);
    return (
        <div>
            <form onSubmit={onSubmit}>
                <input value = {nweet} onChange ={onChange} type="text" placeholder="What's on your mind?" maxLength={120} />
                <input type="submit" value="Nweet" />
            </form>
            <div>
                {nweets.map((nweet) => (
                    <div key={nweet.id}>
                        <h4>{nweet.nweet}</h4>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Home
