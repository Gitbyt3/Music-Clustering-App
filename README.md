# Clustering Film Music for Arousal-Valence Retrieval
**Name**: Lucas Ong  
**Student Number**: 240846541

<br/>

## Instructions for Model Testing
### 1. Pre-Requisites
- Make sure Python is installed
- The applications were developed using Python version 3.13.4, you can find the links to download at the bottom of [**this**](https://www.python.org/downloads/release/python-3134/) page.
<br/>

### 2. Downloading Relevant Files
- This necessary files can be downloaded as a zip from the *Code* tab of this Github repository
- Simply press the green *Code* button and press *Download ZIP*

**IMPORTANT**: The Clustering-App.exe file is too large to be stored on Github. Please download [**here**](https://qmulprod-my.sharepoint.com/:u:/g/personal/ec24959_qmul_ac_uk/EXo5tJobFCJPvJbWA_MPVv8B6CNZQ_g2u46Eg1s7V_fmww?e=p2AJOJ) and replace the Clustering-App.exe downloaded in the ZIP file. Access was given to all Queen Mary email addresses.

<br/>

### 3.1 Python Virtual Environment Set-up for Back-End
- Create a Python virtual environment in the *flask-app-backend* folder.
- Instructions for creating a virtual environment can be found [**here**](https://packaging.python.org/en/latest/guides/installing-using-pip-and-virtual-environments/#create-and-use-virtual-environments).
- This generally involves navigating to the *flask-app-backend* directory using commmand prompt (Windows) or terminal (Mac) and running the command *python -m venv .venv*
- While still in the *flask-app-backend* directory, activate the virtual environment using *.venv\Scripts\activate* (Windows) or *source .venv/bin/activate* (Mac). The environment is active if (.venv) appears on the line of the terminal.
- The image below shows the relevant commands to set-up the Python virtual environment
<img width="1379" height="207" alt="Screenshot 2025-08-20 102351" src="https://github.com/user-attachments/assets/67822b3d-2000-4a9c-85cf-1a3cc6392aa9" />

<br/>

### 3.2 Install Python Libraries and Activate Back-End
- With the virtual environment activated, run the following command to install all the relevant libraries: *pip install Flask==3.1.1 flask-cors==6.0.1 pandas==2.3.1 numpy==2.1.3 torch==2.7.1*
- These installs may take a few minutes
- Once installed, run the command *python app.py* to activate the server

**IMPORTANT**: Keep the command prompt or terminal open during testing

<br/>

### 4. Application testing
- Now you can open the Clustering-App.exe application to test both models

<br/>

## Directory Explanation
### 1. clustering-app-frontend
- This contains the code used for designing the front-end of the application
- React + Vite is the front-end software combination used for development and Tauri is used for packaging the front-end software into an application
- *src* contains the all the individual components making up the application such as the music player, Arousal-Valence grid, and page set-up
- *src-tauri* contains the code for converting the react code to a single application
- *public/audios* contains the actual audio files for the film music for the FME-24 dataset

<br/>

### 2. flask-app-backend
- Flask was used as the Python back-end framework and can be found in the app.py file
- This back-end was mainly used for retrieval and projecting the input queries using the deep clustering model
- Relevant data files for each of the models can be found within the corresponding folders

<br/>

### 3. model-training
- This folder contains the Jupyter notebooks used during model development as well as the original csv provided with the Arousal-Valence annotations
