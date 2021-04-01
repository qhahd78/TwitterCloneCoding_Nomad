import { dbService } from "firebasekeys";
import React, {useState} from "react";

const Nweet = ({ nweetObj, isOwner }) => {
    // nweet 를 수정하고 있는지 아닌지 확인 
    const [editing, setEditing] = useState(false);
    // input 의 값을 수정할 수 있음
    const [newNweet, setNewNweet] = useState(nweetObj.text);
    const onDeleteClick = async () => {
        // user 를 확인하고 트윗을 지운다. 
         
        const ok = window.confirm("Are you sure you want to delete this nweet?");
        console.log(ok);
        if(ok){
            // ok 면 true. true 면 dbService.doc 를 실행한다.
            // 트윗 지우기  document 의 id 를 알아야 함 .
            await dbService.doc(`nweets/${nweetObj.id}`).delete();
        }
    };
    const toggleEditing = () => setEditing((prev) => !prev);
    
    // 트윗 수정시 아래의 함수 실행. 
    const onSubmit = async (event) => {
        event.preventDefault();
        // submit 클릭시 dbService.doc 호출 및 update 실행됨.
        await dbService.doc(`nweets/${nweetObj.id}`).update({
            text:newNweet
        });
        setEditing(false);
    }
    const onChange = (event) => {
        const {
            target: {value},
        } = event;
        setNewNweet(value);

    };
    return (
        <div>
            {editing ? (
                <>
                {isOwner && (
                    <>
                        <form onSubmit={onSubmit}>
                        <input 
                            type="text" 
                            placeholder="Edit your nweet"
                            value={newNweet}
                            required
                            onChange={onChange}
                        />
                        <input type="submit" value="Update Nweet" />
                    </form> 
                    <button onClick={toggleEditing}>Cancel</button>
                </>
                )}
            
                </>
            ) : ( 
                <>
                    <h4>{nweetObj.text}</h4>
                    {isOwner && (
                        <>
                            <button onClick={onDeleteClick}>Delete Nweet</button>
                            <button onClick={toggleEditing}>Edit Nweet</button>
                        </>
                    )}
                </>
            )}
        </div>
    );
};

export default Nweet;