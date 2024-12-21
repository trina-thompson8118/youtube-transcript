# YouTube Transcript Extractor

A React-based web application that allows users to extract and download transcripts from YouTube videos with ease. This app features a modern UI and provides a smooth experience for generating transcripts with error handling and toast notifications.

For a demo of this please visit [DEMO]().

## Features

*   Transcript Extraction: Extract transcripts from any YouTube video.
*   File Download: Downloads the transcript directly as a `.txt` file.
*   Error Handling: Notifies users if the video lacks a transcript or if an invalid URL is provided.

## Technologies Used

### Frontend

*   React: For building a fast and dynamic user interface.
*   Tailwind CSS: For responsive and modern styling.
*   React Toastify: For user notifications.
*   Axios: For handling HTTP requests.

### Backend

*   Flask: Lightweight backend framework for handling API requests.
*   Flask-CORS: To enable cross-origin requests.
*   YouTube Transcript API: For fetching YouTube video transcripts.

## Installation

### Backend Setup

1.  **Clone the repository:**

    ```bash
    git clone <repository-url>
    cd <repository-directory>
    ```

2.  **Create a virtual environment and activate it:**

    ```bash
    python -m venv .venv source .venv\Scripts\activate
    ```

3.  **Install dependencies:**

    ```bash
    pip install flask flask-cors youtube-transcript-api
    ```

4.  Start the backend server:

    ```bash
    python <app_name>.py
    ```
    The backend runs on 'http://localhost:5000'.

### Frontend Setup

1.  **Navigate to the frontend directory:**

    ```bash
    cd ../frontend
    ```

2.  **Install dependencies:**

    ```bash
    npm install
    ```

3.  **Create a `.env` file in the `frontend` directory with the following content:**

    ```bash
    NEXT_PUBLIC_API_URL=http://localhost:5000
    ```

4.  **Start the development server:**

    ```bash
    npm run dev
    ```

## Usage

1.  **Open the App:**  
    Navigate to `http://localhost:3000` in your browser.

2.  **Input URL:** 
    Enter a valid YouTube video URL into the input field.

3.  **Download Transcript:**  
    Click the Extract Transcript button to extract and download the transcript.

4.  **Error Handling:**
    If the URL is invalid or the video lacks a transcript, an error toast notification is displayed.

## Future Enhancements

*   Ability to edit and preview transcripts in the UI.
*   Dark mode for improved usability.

## License

This project is licensed under the MIT License.

## Acknowledgments

*   YouTube Transcript API: For transcript extraction functionality.
*   React-Toastify: For user-friendly notifications.
*   Flask: For providing a lightweight backend framework.