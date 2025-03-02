import { useDispatch, useSelector } from "react-redux"
import Songs from "../../../screens/Songs"
import { addSong, lessSong } from './SongSlice';

const ShowSong = ()=>{
    let song1=useSelector(state=>state.song1.Songs)

    let dispatch = useDispatch()
    return (<div> the song is: {Songs} now
        <input type="button" onClick={()=>{dispatch(addSong())}} value="הוסף פלייבק"/>
       
        <input type="button" onClick={()=>{dispatch(lessSong());}} value="מחק פלייבק"/>
    </div>);
}
export default ShowSong;