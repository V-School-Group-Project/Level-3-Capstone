import React, {useEffect} from "react"

export default function MemeList() {
    const [memes, setMemes] = React.useState({
        topText: "",
        bottomText: "",
        randomImage: "http://i.imgflip.com/1bij.jpg" 
    })
    const [allMemes, setAllMemes] = React.useState([])

    useEffect(() => {
        fetch("https://api.imgflip.com/get_memes")
            .then(res => res.json())
            .then(data => {
                const memes = data.data.memes
                setAllMemes(memes)
            })
        }, []);

    function getMemeImage() {
        const randomNumber = Math.floor(Math.random() * allMemes.length)
        const url = allMemes[randomNumber].url
        setMemes(prevMeme => ({
            ...prevMeme,
            randomImage: url
        }))
        
    }

    function handleChange(e) {
        const {name, value} = e.target
        setMemes(prevMeme => ({
            ...prevMeme,
            [name]: value
        }))
    }

    return ( 
        <main>
            <div className="form">
                <input type="text" placeholder="TOP TEXT" className="form--input" name="topText" value={memes.topText} onChange={handleChange}/>
                <input type="text" placeholder="BOTTOM TEXT" className="form--input" name="bottomText" value={memes.bottomText} onChange={handleChange}/>
                <button className="form-button" onClick={getMemeImage}>Refresh Meme Image</button>
                <img alt= "memeIMG" src={memes.randomImage}/>
                <h2>{memes.topText}</h2>
                <h2>{memes.bottomText}</h2>
            </div>
        </main>
    )   
}