from flask import Flask, jsonify, request
from flask_cors import CORS
import os
import pickle
import pandas as pd
import numpy as np
from deep_clustering_model_data.model.model import VaDE
import torch

app = Flask(__name__)
CORS(app)

@app.route('/api/RetrieveHandcrafted', methods=['POST'])
def retrieve_handcrafted():
    try:
        data = request.json
        input_arousal, input_valence = float(data['arousal']), float(data['valence'])
        if abs(input_arousal) > 1 or abs(input_valence) > 1: raise ValueError('Arousal/Valence must be between -1 and +1')
        input_score = np.array([input_arousal, input_valence])

        data_root = os.path.join(os.getcwd(), 'handcrafted_model_data')
        cluster_scores = pd.read_csv(os.path.join(data_root, 'cluster_scores.csv'))
        centroids = cluster_scores[['arousal','valence']].to_numpy()
        clustered_tracks = pd.read_csv(os.path.join(data_root, 'tracks_clustered.csv'))
        
        dist = np.linalg.norm(centroids - input_score, axis=1)
        closest_centroid = cluster_scores.iloc[np.argmin(dist)]['label']
        retrieved_tracks = clustered_tracks.loc[clustered_tracks['label'] == closest_centroid].sort_values(by='dist_centroid', ignore_index=True).head(5)
        
        output = {i:{'audio':{'filename':row['file']},
                     'film_metadata':{'film_director':row['director'],
                                      'film_genre':row['genre'],
                                      'film_release_year':row['year'],
                                      'film_title':row['film'],
                                      'track_composer':row['composer'],
                                      'track_title':row['title']}} for i, row in retrieved_tracks.iterrows()}
        
        return jsonify({'status':'success', 'tracks':output})

    except Exception as e:
        return jsonify({'status':'error', 'message':str(e)}), 500

@app.route('/api/RetrieveDeepClustering', methods=['POST'])
def retrieve_deep_clustering():
    try:
        data = request.json
        input_arousal, input_valence = float(data['arousal']), float(data['valence'])
        if abs(input_arousal) > 1 or abs(input_valence) > 1: raise ValueError('Arousal/Valence must be between -1 and +1')
        input_score = np.array([[input_arousal, input_valence]])

        data_root = os.path.join(os.getcwd(), 'deep_clustering_model_data')

        audio_metadata = pd.read_csv(os.path.join(data_root, 'database', 'arousal_valence.csv'))

        model = VaDE(input_dim=640, hidden_dims=[512, 256, 128], latent_dim=32, n_clusters=6).to(torch.device('cpu'))
        model.load_state_dict(torch.load(os.path.join(data_root, 'model', 'model_weights.pt'), map_location=torch.device('cpu')))
        model.eval()

        with open(os.path.join(data_root, 'database', 'ids.pkl'), 'rb') as f:
            ids = pickle.load(f)
        with open(os.path.join(data_root, 'database', 'audio_dict.pkl'), 'rb') as f:
            audio_dict = pickle.load(f)
        with open(os.path.join(data_root, 'database', 'audio_projections.pkl'), 'rb') as f:
            projections = pickle.load(f)
            audio_projections = projections['projected_audio']

        with torch.no_grad():
            query_tensor = torch.tensor(input_score, dtype=torch.float32)
            query_projected = model.projector(model.av_encoder(query_tensor))

        similarities = torch.mm(query_projected, audio_projections.T)
        _, topk_indices = torch.topk(similarities.squeeze(), k=20)
        topk_ids = [ids[index] for index in topk_indices.tolist()]

        unique_ids = []
        for id in topk_ids:
            if id not in unique_ids:
                unique_ids.append(id)
                if len(unique_ids) == 5:
                    break
        unique_filenames = [audio_dict[id] for id in unique_ids]

        output = {}
        for i, filename in enumerate(unique_filenames):
            metadata = audio_metadata.loc[audio_metadata['file'] == filename].head(1)
            output[i] = {'audio':{'filename':filename},
                         'film_metadata':{'film_director':metadata['director'].values[0],
                                          'film_genre':metadata['genre'].values[0],
                                          'film_release_year':metadata['year'].values[0],
                                          'film_title':metadata['film'].values[0],
                                          'track_composer':metadata['composer'].values[0],
                                          'track_title':metadata['title'].values[0]}}

        return jsonify({'status':'success', 'tracks':output})

    except Exception as e:
        return jsonify({'status':'error', 'message':str(e)}), 500

if __name__ == "__main__":
    app.run(debug=True)