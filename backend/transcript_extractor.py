from flask import Flask, request, send_file, jsonify
from flask_cors import CORS  # Import CORS
from youtube_transcript_api import YouTubeTranscriptApi
import os

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

@app.route('/api/extract-transcript', methods=['POST'])
def extract_transcript():
    try:
        # Get the YouTube URL from the request
        data = request.json
        youtube_url = data.get("url")
        if not youtube_url:
            return jsonify({"error": "YouTube URL is required"}), 400

        # Extract the video ID from the URL
        video_id = youtube_url.split("v=")[-1]

        # Get the transcript
        transcript = YouTubeTranscriptApi.get_transcript(video_id)
        transcript_text = "\n".join([f"{entry['start']}: {entry['text']}" for entry in transcript])

        # Save the transcript to a file
        file_path = f"transcript_{video_id}.txt"
        with open(file_path, "w") as file:
            file.write(transcript_text)

        # Return the file to the client
        return send_file(file_path, as_attachment=True)

    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(debug=True)
