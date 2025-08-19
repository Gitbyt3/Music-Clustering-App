import React from "react"
import NavButton from "../components/NavButton"

const Intro = () => {
    return (
        <div style={{padding:'20px', textAlign:'center'}}>
            <h1>Project Outline</h1>
            <h3>
                Name: <span style={{fontWeight:'normal'}}>Lucas Ong</span>
                <br />
                Student Number: <span style={{fontWeight:'normal'}}>240846541</span>
            </h3>
            <p>
                This project clusters film music tracks from the FME-24 dataset using audio features.<br/>
                The two approaches described below and in the project paper can be tested on the next page of this application.
            </p>
            <br/>
            <p style={{fontWeight:'bold'}}>1. Handcrafted Features</p>
            <p>
                Music tracks were clustered using k-Means on manually extracted audio features.<br/>The features cover timbre, harmony, rhythm, and loudness.
                A full breakdown of the features used can be found on the dissertation paper.<br/>
                Each cluster is assigned the median Arousal and Valence score of all music tracks in the cluster.<br/>
                Retrieval is then completed by finding the nearest cluster according to the Arousal-Valence input and assigned cluster medians.
            </p>
            <br/>
            <p style={{fontWeight:'bold'}}>2. Deep Generative Clustering with Contrastive Learning</p>
            <p>
                Audio embeddings were extracted using the pre-trained VGGish and OpenL3 models.
                <br/>
                These embeddings, along with each sample's Arousal-Valence score, were used as input to a neural network based off the Variational Deep Embedding architecture.
                <br/>
                Both the audio embeddings and Arousal-Valence scores were projected into the same dimensional space using a projection head.
                <br/>
                Contrastive learning was then used to pull similar Arousal-Valence & audio embeddings together and push dissimilar pairs apart.
                <br/>
                Retrieval is done by projecting the input Arousal-Valence query into the same space and finding the nearest audio embeddings in the projected dimensional space.
            </p>
            <br/>

            <NavButton currentPage="Intro" />
        </div>
    )
}

export default Intro