from flask import Flask, request, jsonify, send_file
from flask_cors import CORS
from youtube_transcript_api import YouTubeTranscriptApi
import io

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

        # Create an in-memory file-like object
        transcript_file = io.BytesIO()
        transcript_file.write(transcript_text.encode('utf-8'))
        transcript_file.seek(0)  # Rewind the file pointer to the beginning

        # Send the file to the client as an attachment
        return send_file(
            transcript_file,
            as_attachment=True,
            download_name=f"transcript_{video_id}.txt",
            mimetype='text/plain'
        )

    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(debug=True)
