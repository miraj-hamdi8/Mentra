from flask import Flask, request, jsonify  
import openai

app = Flask(__name__)  
@app.route('/')
def home():
    return "Mentrabot is running!"

openai.api_key = "your-api-key-here"

@app.route('/chat', methods=['POST'])
def chat():
    data = request.get_json()
    if not data or "message" not in data:
        return jsonify({"error": "No message provided"}), 400  
    
    user_input = data["message"]

    response = openai.ChatCompletion.create(
        model="gpt-3.5-turbo",
        messages=[{"role": "user", "content": user_input}]
    )

    return jsonify({"response": response["choices"][0]["message"]["content"]})

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=10000) 
