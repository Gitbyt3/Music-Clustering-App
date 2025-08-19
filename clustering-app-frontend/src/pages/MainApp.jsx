import React, { useState } from "react"
import NavButton from "../components/NavButton"
import Axis2D from "../components/ArousalValenceGrid"
import TrackResults from "../components/MusicPlayer"

const MainApp = () => {
    const [selectedModel, setSelectedModel] = useState('handcrafted')
    const [formData, setFormData] = useState({arousal:0, valence:0})
    const [trackData, setTrackData] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(null)
    const handlePointSelect = (point) => {setFormData({...point, arousal:point.arousal, valence:point.valence})}
    const handleSubmit = async () => {

        if (formData.arousal == null || formData.valence == null) {
            setError("Please select a point on the grid")
            return}

        setIsLoading(true)
        setError(null)

        try {
            const endpoint = selectedModel === 'handcrafted' ? 'http://127.0.0.1:5000/api/RetrieveHandcrafted' : 'http://127.0.0.1:5000/api/RetrieveDeepClustering'
            const response = await fetch(endpoint, {method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify({arousal:formData.arousal, valence:formData.valence})})
            const data = await response.json()
            console.log("API response:", data)

            if (data.status === 'success') {
                setTrackData(data)}
            else {
                setError(data.message || "An error occurred")}}

        catch (err) {
            console.error("Fetch error:", err)
            setError(err.message)}
            
        finally {
            setIsLoading(false)}}

    return (
        <div>
            <div style={{textAlign:'center'}}>
                <h1>Film Track Clustering: Can Arousal-Valence be used to find songs of similar emotionality? </h1>
                <h3>Model Selection</h3>
                <button
                    onClick={() => setSelectedModel('handcrafted')}
                    style={{
                        padding: '10px 15px', backgroundColor: selectedModel === 'handcrafted' ? '#4CAF50' : '#e7e7e7', color: selectedModel === 'handcrafted' ? 'white' : 'black',
                        border: 'none', borderRadius: '4px', cursor: 'pointer', marginRight:'5px'}}>
                    Handcrafted Feature Model
                </button>
                
                <button 
                    onClick={() => setSelectedModel('deepClustering')}
                    style={{
                        padding: '10px 15px', backgroundColor: selectedModel === 'deepClustering' ? '#4CAF50' : '#e7e7e7', color: selectedModel === 'deepClustering' ? 'white' : 'black',
                        border: 'none', borderRadius: '4px', cursor: 'pointer', marginLeft:'5px'}}>
                    Deep Clustering Model
                </button>
                <br/>
                <br/>
                <h3>Arousal-Valence Input Selection</h3>
                <Axis2D onSelectPoint={handlePointSelect} width={500} height={500} initialPoint={{formData}}/>
                <br/>
                <h3>Track Retrieval</h3>
                <button 
                    onClick={handleSubmit}
                    disabled={isLoading}
                    style={{padding: '10px 20px', backgroundColor: '#0d53bcff', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '16px'}}>
                    {isLoading ? 'Loading...' : 'Find Similar Tracks'}
                </button>
                <br/>
                <TrackResults data={trackData} />
            </div>
            
            <NavButton currentPage="MainApp" />

        </div>
    );
};

export default MainApp;